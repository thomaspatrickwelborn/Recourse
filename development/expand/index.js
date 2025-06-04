import { ObjectKeys } from '../variables/index.js'
import setProperty from '../set-property/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import entries from '../entries/index.js'
const Options = { ancestors: [], nonenumerable: false }
const ValidPathTypes = ['string', 'function']
export default function expand($source, $path, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: [].concat($options.ancestors)
  })
  const { ancestors } = options
  const typeOfPath = typeOf($path)
  const typeOfSource = typeOf($source)
  if(
    !ValidPathTypes.includes(typeOfPath) ||
    !ObjectKeys.includes(typeOfSource)
  ) { return $source }
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  let target = typedObjectLiteral($source)
  for(const [$sourceKey, $sourceValue] of entries(
    $source, Object.assign({}, options, { recurse: false })
  )) {
    const targetValue = (
      ObjectKeys.includes(typeOf($sourceValue))
    ) ? expand($sourceValue, $path) : $sourceValue
    if(
      typeOfPath === ValidPathTypes[0] &&
      $sourceValue !== null &&
      !Object.is($sourceValue, $source) && 
      !ancestors.includes($sourceValue)
    ) {
      target[$sourceKey] = setProperty({}, $path, targetValue)
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue)
    }
  }
  return target
}