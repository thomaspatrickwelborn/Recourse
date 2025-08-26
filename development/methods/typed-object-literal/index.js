import typeOf from '../type-of/index.js'
import isArrayLike from '../is-array-like/index.js'
import isMapLike from '../is-map-like/index.js'
import { ObjectLiterals, Objects } from  '../../variables/index.js'
import Options from '../../options/index.js'
export default function typedObjectLiteral($source, $options) {
  const { resemble, strict } = Object.assign({}, Options, $options)
  const typeOfSource = typeOf($source)
  if(typeOfSource === 'string') { return ObjectLiterals[$source.toLowerCase()] }
  else if(!resemble) { return ObjectLiterals[typeOfSource] }
  else if(resemble) {
    if(isArrayLike($source, strict)) { return ObjectLiterals['array'] }
    else if(isMapLike($source, strict)) { return ObjectLiterals['map'] }
    // else if(isSetLike($source, strict)) { return ObjectLiterals['set'] }
    else { return ObjectLiterals['object'] }
  }
  else { return null }
}