import Accessors from '../accessors/index.js'
const Options = {
  depth: 0,
  maxDepth: 10,
  accessors: [Accessors.default],
  ancestors: [],
  values: false,
}
export default function compandTree($target, $options) {
  const target = []
  const options = Object.assign({}, Options, $options, {
    ancestors: [].concat($options.ancestors)
  })
  options.depth++
  if(options.depth > options.maxDepth) { return target }
  iterateAccessors: 
  for(const $accessor of options.accessors) {
    const accessor = $accessor.bind($target)
    const target = accessor($target)
    if(!target) { continue iterateAccessors }
    if(!options.ancestors.includes(target)) { options.ancestors.unshift(target) }
    iterateObjectProperties: 
    for(const [$key, $value] of Object.entries(target)) {
      if(!options.values) { target.push($key) }
      else if(options.values) { target.push([$key, $value]) }
      if(
        typeof $value === 'target' &&
        $value !== null &&
        !Object.is($value, target) && 
        !options.ancestors.includes($value)
      ) {
        const subtargets = compandTree($value, options)
        if(!options.values) {
          for(const $subtarget of subtargets) {
            const path = [$key, $subtarget].join('.')
            target.push(path)
          }
        }
        else if(options.values) {
          for(const [$subtargetKey, $subtarget] of subtargets) {
            const path = [$key, $subtargetKey].join('.')
            target.push([path, $subtarget])
          }
        }
      }
    }
  }
  return target
}