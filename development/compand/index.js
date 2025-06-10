import { Cessors, Accessors } from '../cessors/index.js'
import entities from '../entities/index.js'
const Options = {
  accessors: [Accessors.default],
  ancestors: [],
  depth: 0, maxDepth: 10,
  enumerable: true, nonenumerable: false, 
  values: false,
}
export default function compand($source, $options) {
  const target = []
  const options = Object.assign({}, Options, $options, {
    ancestors: [].concat($options.ancestors || [])
  })
  const { ancestors, nonenumerable, values } = options
  options.depth++
  if(options.depth > options.maxDepth) { return target }
  const source = new Cessors(options.accessors).cess($source)
  if(!ancestors.includes(source)) { ancestors.unshift(source) }
  const objectProperties = entities(source, 'entries', { nonenumerable, recurse: false })  
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