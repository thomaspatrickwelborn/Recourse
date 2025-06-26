import { Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
import entities from '../entities/index.js'
const Options = {
  depth: 0, 
  getters: [Getters.Object, Getters.Map],
  maxDepth: 10,
  values: false,
}
export default function compand($source, $options) {
  const target = []
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const { ancestors, values } = options
  options.depth++
  if(options.depth > options.maxDepth) { return target }
  const source = new Tensors(options.getters).cess($source, options)
if(!ancestors.includes($source)) { ancestors.unshift($source) }
  const objectProperties = entities($source, 'entries', Object.assign(options, {
    recurse: false// , returnValue: 'receiver'
  }))
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
  return target
}