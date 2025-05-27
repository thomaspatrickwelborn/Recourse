import isArrayLike from '../is-array-like/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import recursiveDefineProperties from '../recursive-define-properties/index.js'
import * as Variables from '../variables/index.js'
import Options from '../recursive-define-properties/options.js'
export default function recursiveDefineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const options = Object.assign({}, Options, $options)
  const typeOfPropertyValue = typeOf($propertyDescriptor.value)
  if(['array', 'object'].includes(typeOfPropertyValue)) {
    const propertyValue = isArrayLike(Object.defineProperties(
      typedObjectLiteral(typeOfPropertyValue), $propertyDescriptor.value
    )) ? [] : {}
    $propertyDescriptor.value = recursiveDefineProperties(propertyValue, $propertyDescriptor.value, options)
  }
  else if(
    options.typeCoercion && 
    Object.getOwnPropertyDescriptor($propertyDescriptor, 'type') !== undefined &&
    !['undefined', 'null'].includes(typeOfPropertyValue)
  ) {
    $propertyDescriptor.value = Variables.Primitives[$propertyDescriptor.type](value)
  }
  Object.defineProperty($target, $propertyKey, $propertyDescriptor)
  return $target
}