import typeOf from '../type-of/index.js'
export default function typedObjectLiteral($value) {
  let _typedObjectLiteral
  const typeOfValue = typeOf($value)
  if(typeOfValue === 'string') {
    const value = $value.toLowerCase()
    if(value === 'object') { _typedObjectLiteral = {} }
    else if(value === 'array') { _typedObjectLiteral = [] }
    else { _typedObjectLiteral = {} }
  }
  else  {
    if(typeOfValue === 'object') { _typedObjectLiteral = {} }
    else if(typeOfValue === 'array') { _typedObjectLiteral = [] }
    else { _typedObjectLiteral = {} }
  }
  return _typedObjectLiteral
}