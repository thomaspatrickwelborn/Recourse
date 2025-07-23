import typeOf from '../type-of/index.js'
import entities from '../entities/index.js'
import { Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  getters: [Getters.Object, Getters.Map],
  ancestors: [], 
  depth: 0, maxDepth: 10,
}
export default function seal($target, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: $options.ancestors ? [...$options.ancestors] : []
  })
  const { ancestors, values } = options
  if(options.depth > options.maxDepth) { return $target } else { options.depth++ }
  const target = new Tensors(options.getters).cess($target, options)
  if(!ancestors.includes(target)) { ancestors.unshift(target) }
  const targetEntities = entities($target, 'entries', Object.assign(options, {
    recurse: false
  }))
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    if(ancestors.includes($propertyValue)) { continue iterateTargetEntities }
    else if(ObjectKeys.includes(typeOf($propertyValue))) {
      seal($propertyValue, options)
    }
  }
  return Object.seal($target)
}