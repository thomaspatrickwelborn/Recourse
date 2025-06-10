import isArrayLike from '../is-array-like/index.js'
import typeOf from '../type-of/index.js'
const Options = { strict: true, isArrayLike: false }
export default function isEntries($source, $options) {
  const options = Object.assign({}, Options, $options)
  if(typeOf($source) !== 'array') {
    if(options.isArrayLike && isArrayLike($source, {
      strict: options.strict
    })) { $source = Array.from($source) }
    else { return false }
  }
  if(!options.strict && !$source.length) { return true }
  else {
    let isEntries
    iterateSourceEntities: 
    for(const $soureEntity of $source) {
      isEntries = (
        typeOf($soureEntity) === 'array' &&
        $soureEntity.length === 2 &&
        ['string', 'number', 'symbol'].includes(typeOf($soureEntity[0]))
      )
      if(isEntries === false) { break iterateSourceEntities }
    }
    return isEntries
  }
}