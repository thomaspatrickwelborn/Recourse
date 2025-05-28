import Accessors from '../accessors/index.js'
const Options = {
  depth: 0,
  maxDepth: 10,
  accessors: [Accessors.default],
  ancestors: [],
}
export default function propertyDirectory($object, $options) {
  const _propertyDirectory = []
  const options = Object.assign({}, Options, $options, {
    ancestors: [].concat($options.ancestors)
  })
  options.depth++
  if(options.depth > options.maxDepth) { return _propertyDirectory }
  iterateAccessors: 
  for(const $accessor of options.accessors) {
    const accessor = $accessor.bind($object)
    const object = accessor($object)
    if(!object) { continue iterateAccessors }
    if(!options.ancestors.includes(object)) { options.ancestors.unshift(object) }
    iterateObjectProperties: 
    for(const [$key, $value] of Object.entries(object)) {
      if(!options.values) { _propertyDirectory.push($key) }
      else if(options.values) { _propertyDirectory.push([$key, $value]) }
      if(
        typeof $value === 'object' &&
        $value !== null &&
        !Object.is($value, object) && 
        !options.ancestors.includes($value)
      ) {
        const subtargets = propertyDirectory($value, options)
        if(!options.values) {
          for(const $subtarget of subtargets) {
            const path = [$key, $subtarget].join('.')
            _propertyDirectory.push(path)
          }
        }
        else if(options.values) {
          for(const [$subtargetKey, $subtarget] of subtargets) {
            const path = [$key, $subtargetKey].join('.')
            _propertyDirectory.push([path, $subtarget])
          }
        }
      }
    }
  }
  return _propertyDirectory
}