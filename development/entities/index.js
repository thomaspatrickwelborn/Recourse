import { Tensors, Getters } from '../tensors/index.js'
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js'
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
  const propertyDescriptors = getOwnPropertyDescriptors($source, {
    returnValue: 'entries', recurse: false
  })
  iterateSourcePropertyDescriptors: 
  for(const [$propertyKey, $propertyDescriptor] of propertyDescriptors) {
    console.log($propertyKey, $propertyDescriptor)
    const propertyDescriptor = $propertyDescriptor
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