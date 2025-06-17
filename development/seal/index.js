import typeOf from '../type-of/index.js'
import entities from '../entities/index.js'
import { Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  // ancestors: [],
  // getters: [Getters.Object, Getters.Map], 
}
export default function seal($target, $options) {
  const options = Object.assign({}, Options, $options, {
    // ancestors: Object.assign([], $options.ancestors)
  })
  // const target = new Tensors(options.getters).cess($target)
  // if(!options.ancestors.includes(target)) { options.ancestors.unshift(target) }
  throw entities($target, 'entries', options)
  const targetEntities = entities($target, 'entries', Object.assign(options, {
    recurse: false
  }))
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntries) {
    // const typeOfPropertyValue = typeOf($propertyValue)
    // if(options.ancestors.includes($propertyValue)) { continue iterateTargetEntities }
    if(ObjectKeys.includes(typeOf($propertyValue)/*typeOfPropertyValue*/)) {
      seal($propertyValue, options)
    }
  }
  return Object.seal($target)
}