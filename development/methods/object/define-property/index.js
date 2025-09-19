import typeOf from '../../../utilities/type-of/index.js'
import typedObjectLiteral from '../../../utilities/typed-object-literal/index.js'
import defineProperties from '../define-properties/index.js'
import { ObjectKeys, Primitives } from '../../../variables/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const options = Options('object', 'defineProperty', $options)
  const { strict, resemble } = options
  const tensorProxy = new TensorProxy(options)
  const propertyDescriptor = Object.assign({}, $propertyDescriptor)
  const targetPropertyValue = tensorProxy.get($target, $propertyKey)
  let propertyDescriptorValue = propertyDescriptor.value
  const typeOfPropertyDescriptorValue = typeOf(propertyDescriptor.value)
  const typeOfTargetPropertyValue = typeOf(targetPropertyValue)
  if(ObjectKeys.includes(typeOfPropertyDescriptorValue)) {
    if(ObjectKeys.includes(typeOfTargetPropertyValue)) {
      propertyDescriptor.value = defineProperties(targetPropertyValue, propertyDescriptorValue, options)
    }
    else {
      const propertyValueTarget = typedObjectLiteral(
        propertyDescriptor.type || propertyDescriptorValue,
        { resemble, strict }
      )
      propertyDescriptor.value = defineProperties(propertyValueTarget, propertyDescriptorValue, options)
    }
  }
  else if(options.typeCoercion) {
    try { propertyDescriptor.value = new Primitives[propertyDescriptor.type](propertyDescriptorValue) }
    catch($err) { console.error($err) }
  }
  Object.defineProperty($target, $propertyKey, propertyDescriptor)
  if(propertyDescriptor.sealed) { Object.seal($target[$propertyKey]) }
  if(propertyDescriptor.frozen) { Object.freeze($target[$propertyKey]) }
  return $target
}