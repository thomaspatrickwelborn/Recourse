import { Tensors, Getters } from '../tensors/index.js'
import typeOf from '../type-of/index.js'
import { ObjectKeys } from '../variables/index.js'
import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
const Options = {
  getters: [Getters.Object, Getters.Map],
  ancestors: [],
  depth: 0, maxDepth: 10,
  enumerable: true, nonenumerable: false,
  recurse: true,
  returnValue: 'target',
}
export default function entities($source, $type, $options = {}) {
  const typeOfSource = typeOf($source)
  const sourceEntities = []
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const { ancestors, maxDepth, enumerable, nonenumerable, recurse } = options
  if(options.depth >= maxDepth) { return }
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  options.depth++
  const propertyDescriptorKeys = (['array', 'object'].includes(typeOf($source)))
    ? Object.keys(Object.getOwnPropertyDescriptors($source))
    : Array.from($source.keys())
  iterateSourcePropertyDescriptors: 
  for(const $propertyKey of propertyDescriptorKeys) {
    // const propertyValue = new Tensors(options.getters).cess($source, $propertyKey, options)
    const propertyDescriptor = (typeOf($source) !== 'map')
      ? Object.getOwnPropertyDescriptor($source, $propertyKey)
      : {
        configurable: false,
        enumerable: true,
        value: new Tensors(options.getters).cess($source, $propertyKey, options),
        writable: true,
      }
    if(!propertyDescriptor) { continue iterateSourcePropertyDescriptors }
    if(
      enumerable && propertyDescriptor.enumerable ||
      nonenumerable && !propertyDescriptor.enumerable
    ) {
      const $value = propertyDescriptor.value
      const typeOfValue = typeOf($value)
      if(
        recurse && 
        ObjectKeys.includes(typeOfValue) && 
        !ancestors.includes($value)
      ) {
        ancestors.unshift($value)
        const subentities = entities($value, $type, options)
        if(subentities.length) {
          if($type === 'entries') { sourceEntities.push([$propertyKey, subentities]) }
          else if($type === 'values') { sourceEntities.push(subentities) }
          else if($type === 'keys') { sourceEntities.push($propertyKey, subentities) }
        }
        else {
          if($type === 'entries') { sourceEntities.push([$propertyKey, $value]) }
          else if($type === 'values') { sourceEntities.push($value) }
          else if($type === 'keys') { sourceEntities.push($propertyKey) }
        }
      }
      else {
        if($type === 'entries') { sourceEntities.push([$propertyKey, $value]) }
        else if($type === 'values') { sourceEntities.push($value) }
        else if($type === 'keys') { sourceEntities.push($propertyKey) }
      }
    }
  }
  return sourceEntities
}