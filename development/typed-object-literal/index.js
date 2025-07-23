import typeOf from '../type-of/index.js'
export default function typedObjectLiteral($value) {
  let _typedObjectLiteral
  const typeOfValue = typeOf($value)
  if(typeOfValue === 'string') {
    const value = $value.toLowerCase()
    if(value === 'object') { _typedObjectLiteral = new Object() }
    else if(value === 'array') { _typedObjectLiteral = new Array() }
    else if(value === 'map') { _typedObjectLiteral = new Map() }
    else { _typedObjectLiteral = {} }
  }
  else  {
    if(typeOfValue === 'object') { _typedObjectLiteral = new Object() }
    else if(typeOfValue === 'array') { _typedObjectLiteral = new Array() }
    else if(typeOfValue === 'map') { _typedObjectLiteral = new Map() }
    else { _typedObjectLiteral = {} }
  }
  return _typedObjectLiteral
}