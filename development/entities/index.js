import { Cessors, Accessors } from '../cessors/index.js'
import typeOf from '../type-of/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  accessors: [Accessors.default],
  ancestors: [],
  depth: 0, maxDepth: 10,
  enumerable: true, nonenumerable: false,
  recurse: true,
}
export default function entities($source, $type, $options) {
  const sourceEntities = []
  const options = Object.assign({}, Options, $options, {
    ancestors: [].concat($options.ancestors || [])
  })
  const source = new Cessors([Accessors.default]).cess($source)
  const { ancestors, maxDepth, enumerable, nonenumerable, recurse } = options
  if(options.depth >= maxDepth) { return sourceEntities }
  options.depth++
  if(!ancestors.includes($source)) { ancestors.push($source) }
  for(const [$key, $propertyDescriptor] of Object.entries(
    Object.getOwnPropertyDescriptors($source)
  )) {
    if(
      enumerable && $propertyDescriptor.enumerable ||
      nonenumerable && !$propertyDescriptor.enumerable
    ) {
      const $value = $propertyDescriptor.value
      const typeOfValue = typeOf($value)
      if(
        recurse && 
        ObjectKeys.includes(typeOfValue) && 
        !ancestors.includes($value)
      ) {
        if($type === 'entries') { sourceEntities.push([$key, entities($value, $type, options)]) }
        else if($type === 'values') { sourceEntities.push(entities($value, $type, options)) }
        else if($type === 'keys') { sourceEntities.push($key, entities($value, $type, options)) }
      }
      else {
        if($type === 'entries') { sourceEntities.push([$key, $value]) }
        else if($type === 'values') { sourceEntities.push($value) }
        else if($type === 'keys') { sourceEntities.push($key) }
      }
    }
  }
  return sourceEntities
}