import typeOf from '../type-of/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = { ancestors: [] }
function seal($target, $options) {
  const { ancestors } = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  })
  if(!options.ancestors.includes($target)) { options.ancestors.unshift($target) }
  iterateTargetProperties: 
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    const typeOfPropertyValue = typeOf($propertyValue)
    if(options.ancestors.includes($propertyValue)) { continue iterateTargetProperties }
    if(ObjectKeys.includes(typeOfPropertyValue)) {
      seal($propertyValue, options)
    }
  }
  return Object.seal($target)
}
export default seal