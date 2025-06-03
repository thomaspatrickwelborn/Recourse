import numerableEntries from '../numerable-entries/index.js'
import typeOf from '../type-of/index.js'
const Options = {
  depth: 0,
  maxDepth: 10,
  enumerable: true,
  nonenumerable: false,
}
export default function entities($target, $type, $options) {
  const _entities = []
  const options = Object.assign({}, Options, $options, {
    ancestors: [].concat($options.ancestors)
  })
  const { ancestors, maxDepth, nonenumerable } = options
  if(options.depth >= maxDepth) { return _entities }
  options.depth++
  if(!ancestors.includes($target)) { ancestors.push($target) }
  iterateObjectEntries: 
  for(const [$key, $value] of numerableEntries($target, {
    enumerable: true, nonenumerable
  })) {
    const typeOfValue = typeOf($value)
    if(
      ['array', 'object'].includes(typeOfValue) && 
      !ancestors.includes($value)
    ) {
      if($type === 'entries') { _entities.push([$key, entities($value, $type, options)]) }
      else if($type === 'values') { _entities.push(entities($value, $type, options)) }
      else if($type === 'keys') { _entities.push($key, entities($value, $type, options)) }
    }
    else {
      if($type === 'entries') { _entities.push([$key, $value]) }
      else if($type === 'values') { _entities.push($value) }
      else if($type === 'keys') { _entities.push($key) }
    }
  }
  return _entities
}