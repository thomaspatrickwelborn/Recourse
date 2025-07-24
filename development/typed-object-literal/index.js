import typeOf from '../type-of/index.js'
import isArrayLike from '../is-array-like/index.js'
import isMapLike from '../is-map-like/index.js'
export default function typedObjectLiteral($source) {
  let _typedObjectLiteral
  const typeOfSource = typeOf($source)
  if(typeOfSource === 'string') {
    const source = $source.toLowerCase()
    if(source === 'object') { return Object() }
    else if(source === 'array') { return Array() }
    else if(source === 'map') { return new Map() }
    else { _typedObjectLiteral = {} }
  }
  else  {
    if(typeOfSource === 'object') { return Object() }
    else if(isArrayLike($source, { strict: true })) { return Array() }
    else if(isMapLike($source, { strict: true })) { return new Map() }
    else { _typedObjectLiteral = {} }
  }
}