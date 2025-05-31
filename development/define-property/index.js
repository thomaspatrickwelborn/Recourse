import isArrayLike from '../is-array-like/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import defineProperties from '../define-properties/index.js'
import * as Variables from '../variables/index.js'
import Options from '../define-properties/options.js'
export default function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const propertyDescriptor = Object.assign({}, $propertyDescriptor)
  const options = Object.assign({}, Options, $options)
  const typeOfPropertyValue = typeOf(propertyDescriptor.value)
  if(['array', 'object'].includes(typeOfPropertyValue)) {
    const propertyValue = isArrayLike(Object.defineProperties(
      typedObjectLiteral(typeOfPropertyValue), propertyDescriptor.value
    )) ? [] : {}
    propertyDescriptor.value = defineProperties(propertyValue, propertyDescriptor.value, options)
  }
  else if(
    options.typeCoercion && 
    Object.getOwnPropertyDescriptor(propertyDescriptor, 'type') !== undefined &&
    !['undefined', 'null'].includes(typeOfPropertyValue)
  ) {
    propertyDescriptor.value = Variables.Primitives[propertyDescriptor.type](propertyDescriptor.value)
  }
  Object.defineProperty($target, $propertyKey, propertyDescriptor)
  if($propertyDescriptor.sealed) { Object.seal($target[$propertyKey]) }
  if($propertyDescriptor.frozen) { Object.freeze($target[$propertyKey]) }
  return $target
}