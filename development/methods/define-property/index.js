import isArrayLike from '../is-array-like/index.js'
import isMapLike from '../is-map-like/index.js'
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import defineProperties from '../define-properties/index.js'
import * as Variables from '../../variables/index.js'
import Options from '../../options/index.js'
export default function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const propertyDescriptor = Object.assign({}, $propertyDescriptor)
  let propertyDescriptorValue = propertyDescriptor.value
  const options = Object.assign({}, Options, $options)
  const typeOfPropertyDescriptorValue = typeOf(propertyDescriptor.value)
  const targetPropertyValue = $target[$propertyKey]
  const typeOfTargetPropertyValue = typeOf(targetPropertyValue)
  if(Variables.ObjectKeys.includes(typeOfPropertyDescriptorValue)) {
    if(Variables.ObjectKeys.includes(typeOfTargetPropertyValue)) {
      propertyDescriptor.value = defineProperties(targetPropertyValue, propertyDescriptorValue, options)
    }
    else {
      const propertyValueTarget = typedObjectLiteral(isArrayLike(
        Object.defineProperties({}, propertyDescriptorValue)
      ) ? 'array' : 'object')
      propertyDescriptor.value = defineProperties(propertyValueTarget, propertyDescriptorValue, options)
    }
  }
  else if(
    options.typeCoercion && 
    Object.getOwnPropertyDescriptor(propertyDescriptor, 'type') !== undefined &&
    !['undefined'/*, 'null'*/].includes(typeOfPropertyDescriptorValue)
  ) {
    propertyDescriptor.value = new Variables.Primitives[propertyDescriptor.type](propertyDescriptorValue)
  }
  Object.defineProperty($target, $propertyKey, propertyDescriptor)
  if($propertyDescriptor.sealed) { Object.seal($target[$propertyKey]) }
  if($propertyDescriptor.frozen) { Object.freeze($target[$propertyKey]) }
  return $target
}