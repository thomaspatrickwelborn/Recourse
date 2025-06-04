import Accessors from '../accessors/index.js'
import entries from '../entries/index.js'
import Options from './options.js'
export default function compand($source, $options) {
  const target = []
  const options = Object.assign({}, Options, $options, {
    ancestors: [].concat($options.ancestors)
  })
  const { accessors, ancestors, nonenumerable, values } = options
  options.depth++
  if(options.depth > options.maxDepth) { return target }
  iterateAccessors: 
  for(const $accessor of accessors) {
    const source = $accessor($source)
    if(!source) { continue iterateAccessors }
    if(!ancestors.includes(source)) { ancestors.unshift(source) }
    const objectProperties = entries(source, { nonenumerable, recurse: false })  
    iterateObjectProperties: 
    for(const [$key, $value] of objectProperties) {
      if(!values) { target.push($key) }
      else if(values) { target.push([$key, $value]) }
      if(
        typeof $value === 'object' &&
        $value !== null &&
        !Object.is($value, source) && 
        !ancestors.includes($value)
      ) {
        const subsources = compand($value, options)
        if(!values) {
          for(const $subsource of subsources) {
            const path = [$key, $subsource].join('.')
            target.push(path)
          }
        }
        else if(values) {
          for(const [$subsourceKey, $subsource] of subsources) {
            const path = [$key, $subsourceKey].join('.')
            target.push([path, $subsource])
          }
        }
      }
    }
  }
  return target
}