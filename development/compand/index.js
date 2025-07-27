import { TypeValidators, Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
import entities from '../entities/index.js'
const Options = {
  depth: 0, 
  getters: [Getters.Object, Getters.Map],
  typeValidators: [TypeValidators.Object, TypeValidators.Map],
  maxDepth: 10,
  values: false,
  returnValue: 'receiver',
}
export default function compand($source, $options = {}) {
  const compandEntries = []
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  const { ancestors, values } = options
  options.depth++
  if(options.depth > options.maxDepth) { return compandEntries }
  const source = new Tensors(options.getters, options.typeValidators).cess($source)
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  const sourceEntries = entities($source, 'entries', Object.assign({}, options, {
    recurse: false
  }))
  iterateObjectProperties: 
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