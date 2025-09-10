import entities from '../../object/entities/index.js'
import typeOf from '../../../utilities/type-of/index.js'
export default function isArrayLike($source, $strict = false) {
  let isArrayLike
  const typeOfSource = typeOf($source)
  if(typeOfSource === 'array') { isArrayLike = true }
  else if(
    typeOfSource === 'object' &&
    $source.length >= 0 && 
    Number.isInteger($source.length)
  ) {
    if($strict === false) { isArrayLike = true }
    else {
      iterateSourceKeys: 
      for(const $sourceKey of entities(
        $source, 'keys', { recurse: false }
      ).reverse()) {
        const lastIndex = Number($sourceKey)
        if(lastIndex === $source.length - 1) {
          isArrayLike = true
          break iterateSourceKeys
        }
      }
      if(isArrayLike === undefined) { isArrayLike = false }
    }
  }
  else { isArrayLike = false }
  return isArrayLike
}