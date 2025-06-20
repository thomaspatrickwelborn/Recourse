import entities from '../entities/index.js'
import isArrayLike from '../is-array-like/index.js'
import typeOf from '../type-of/index.js'
const Options = { strict: true }
export default function isMapLike($source, $options) {
  const options = Object.assign({}, Options, $options)
  let isMapLike
  const typeOfSource = typeOf($source)
  if(typeOfSource === 'map') { isMapLike = true }
  else if(
    typeOfSource === 'object' &&
    $source.size >= 0 && 
    Number.isInteger($source.size)
  ) {
    if(options.strict === false) {
      isMapLike = true
    }
    else {
      iterateSourceEntries: 
      for(const $sourceEntity of entities($source, 'entries', {
        nonenumerable: true, recurse: false
      })) {
        if(
          isArrayLike($sourceEntity, options) ||
          $sourceEntity.length === 2
        ) { isMapLike = true }
        else {
          isMapLike = false
          break iterateSourceEntries
        }
      }
      if(isMapLike === undefined) { isMapLike = false }
    }
  }
  else { isMapLike = false }
  return isMapLike
}