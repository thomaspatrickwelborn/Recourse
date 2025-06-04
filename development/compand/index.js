import Accessors from '../accessors/index.js'
import entries from '../entries/index.js'
const Options = {
  accessors: [Accessors.default],
  ancestors: [],
  depth: 0,
  maxDepth: 10,
  nonenumerable: false, 
  values: false,
}
export default function compand($target, $options) {
  const compandTree = []
  const options = Object.assign({}, Options, $options, {
    ancestors: [].concat($options.ancestors)
  })
  const { accessors, ancestors, nonenumerable, values } = options
  options.depth++
  if(options.depth > options.maxDepth) { return compandTree }
  iterateAccessors: 
  for(const $accessor of accessors) {
    const target = $accessor($target)
    if(!target) { continue iterateAccessors }
    if(!ancestors.includes(target)) { ancestors.unshift(target) }
    const objectProperties = entries(target, { nonenumerable, recurse: false })  
    iterateObjectProperties: 
    for(const [$key, $value] of objectProperties) {
      if(!values) { compandTree.push($key) }
      else if(values) { compandTree.push([$key, $value]) }
      if(
        typeof $value === 'object' &&
        $value !== null &&
        !Object.is($value, target) && 
        !ancestors.includes($value)
      ) {
        const subtargets = compand($value, options)
        if(!values) {
          for(const $subtarget of subtargets) {
            const path = [$key, $subtarget].join('.')
            compandTree.push(path)
          }
        }
        else if(values) {
          for(const [$subtargetKey, $subtarget] of subtargets) {
            const path = [$key, $subtargetKey].join('.')
            compandTree.push([path, $subtarget])
          }
        }
      }
    }
  }
  return compandTree
}