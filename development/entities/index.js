import { Tensors, Getters } from '../tensors/index.js'
import typeOf from '../type-of/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  getters: [Getters.Object, Getters.Map],
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
  const { ancestors, maxDepth, enumerable, nonenumerable, recurse } = options
  if(options.depth >= maxDepth) { return }
  if(!ancestors.includes($source)) { ancestors.push($source) }
  const source = new Tensors(options.getters).cess($source)
  options.depth++
  for(const [$key, $propertyDescriptor] of Object.entries(
    Object.getOwnPropertyDescriptors(source)
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