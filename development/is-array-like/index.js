import entities from '../entities/index.js'
import typeOf from '../type-of/index.js'
const Options = { strict: true }
export default ($source, $options) => {
  const options = Object.assign({}, Options, $options)
  let isArrayLike
  const typeOfSource = typeOf($source)
  if(typeOfSource === 'array') { isArrayLike = true }
  else if(
    typeOfSource === 'object' &&
    $source.length >= 0 && 
    Number.isInteger($source.length)
  ) {
    if(options.strict === false) {
      isArrayLike = true
    }
    else {
      iterateSourceKeys: 
      for(const $sourceKey of entities($source, 'keys', {
        nonenumerable: true, recurse: false
      }).reverse()) {
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