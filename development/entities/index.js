import { TypeValidators, Tensors, Getters } from '../tensors/index.js'
import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'
import typeOf from '../type-of/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  pathParseInteger: false,
  getters: [Getters.Object, Getters.Map],
  typeValidators: [TypeValidators.Object, TypeValidators.Map],
  ancestors: [],
  depth: 0, maxDepth: 10,
  enumerable: true, nonenumerable: false,
  recurse: true,
}
export default function entities($source, $type, $options = {}) {
  const sourceEntities = []
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const { ancestors, maxDepth, enumerable, nonenumerable, recurse } = options
  if(options.depth >= maxDepth) { return sourceEntities }
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  options.depth++
  const getters = new Tensors(options.getters, options.typeValidators)
  const source = getters.cess($source)
  if(!source) { return sourceEntities }
  // NONENUMERABLE
  const propertyDescriptorKeys = (typeOf(source) === 'map')
    ? source.keys()
    : Object.keys(source)
    // : Object.keys(Object.getOwnPropertyDescriptors(source))
  iterateSourcePropertyDescriptors: 
  for(let $propertyKey of propertyDescriptorKeys) {
    if(!isNaN($propertyKey) && options.pathParseInteger) {
      $propertyKey = parseInt($propertyKey, 10)
    }
    const value = getters.cess($source, $propertyKey)
    const propertyDescriptor = getOwnPropertyDescriptor(
      $source, $propertyKey, Object.assign(
        {}, options, { recurse: false }
    ))
    if(!propertyDescriptor) { continue iterateSourcePropertyDescriptors }
    if(
      (enumerable && propertyDescriptor.enumerable) ||
      (nonenumerable && !propertyDescriptor.enumerable)
    ) {
      const typeOfValue = typeOf(value)
      if(
        recurse && 
        ObjectKeys.includes(typeOfValue) && 
        !ancestors.includes(value)
      ) {
        ancestors.unshift(value)
        const subentities = entities(value, $type, options)
        if(subentities.length) {
          if($type === 'entries') { sourceEntities.push([$propertyKey, subentities]) }
          else if($type === 'values') { sourceEntities.push(subentities) }
          else if($type === 'keys') { sourceEntities.push($propertyKey, subentities) }
        }
        else {
          if($type === 'entries') { sourceEntities.push([$propertyKey, value]) }
          else if($type === 'values') { sourceEntities.push(value) }
          else if($type === 'keys') { sourceEntities.push($propertyKey) }
        }
      }
      else {
        if($type === 'entries') { sourceEntities.push([$propertyKey, value]) }
        else if($type === 'values') { sourceEntities.push(value) }
        else if($type === 'keys') { sourceEntities.push($propertyKey) }
      }
    }
  }
  return sourceEntities
}