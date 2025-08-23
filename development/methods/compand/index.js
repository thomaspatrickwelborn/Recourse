import { TypeValidators, TensorProxy, Getters } from '../../tensors/index.js'
import { ObjectKeys } from '../../variables/index.js'
import entities from '../entities/index.js'
import Options from '../../options/index.js'
export default function compand($source, $options = {}) {
  const compandEntries = []
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const { ancestors, maxDepth, values } = options
  options.depth++
  if(options.depth > maxDepth) { return compandEntries }
  const source = new TensorProxy(options).get($source)
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  const sourceEntries = entities($source, 'entries', Object.assign({}, options, {
    recurse: false
  }))
  iterateSourceProperties: 
  for(const [$key, $value] of sourceEntries) {
    if(!values) { compandEntries.push($key) }
    else if(values) { compandEntries.push([$key, $value]) }
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
          compandEntries.push(path)
        }
      }
      else if(values) {
        for(const [$subsourceKey, $subsource] of subsources) {
          const path = [$key, $subsourceKey].join('.')
          compandEntries.push([path, $subsource])
        }
      }
    }
  }
  return compandEntries
}