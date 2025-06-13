import typeOf from '../type-of/index.js'
import entities from '../entities/index.js'
import { Cessors, Getters } from '../cessors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  // ancestors: [],
  // getters: [Getters.Object, Getters.Map], 
}
export default function seal($target, $options) {
  const options = Object.assign({}, Options, $options, {
    // ancestors: Object.assign([], $options.ancestors)
  })
  // const target = new Cessors(options.getters).cess($target, options)
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