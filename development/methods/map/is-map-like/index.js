import entities from '../../object/entities/index.js'
import isArrayLike from '../../array/is-array-like/index.js'
import typeOf from '../../../utilities/type-of/index.js'
export default function isMapLike($source, $strict = false) {
  let isMapLike
  const typeOfSource = typeOf($source)
  if(typeOfSource === 'map') { isMapLike = true }
  else if(
    typeOfSource === 'object' &&
    $source.size >= 0 && 
    Number.isInteger($source.size)
  ) {
    if($strict === false) { isMapLike = true }
    else {
      iterateSourceEntries: 
      for(const $sourceEntity of entities(
        $source, 'entries', { recurse: false }
      )) {
        if(
          isArrayLike($sourceEntity, $strict) ||
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