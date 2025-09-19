import typeOf from '../../../utilities/type-of/index.js'
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { ObjectKeys } from '../../../variables/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function getOwnPropertyDescriptor($source, $propertyKey, $options = {}) {
  const options = Options('object', 'getOwnPropertyDescriptors', $options)
  const { entities, propertyPath, path, recurse } = options
  const { maxDepth } = recurse
  try { recurse.depth++ } catch($err) { return }
  const tensorProxy = new TensorProxy(options)
  const propertyValue = tensorProxy.get($source, $propertyKey)
  try { recurse.ancestors = propertyValue } catch($err) { return }
  const typeOfSource = typeOf($source)
  const propertyDescriptor = (typeOfSource !== 'map')
    ? Object.getOwnPropertyDescriptor($source, $propertyKey)
    : (typeOfSource === 'map')
    ? { configurable: false, enumerable: true, value: propertyValue, writable: true }
    : undefined
  if(!propertyDescriptor) return undefined
  if(!entities.nonenumerable && !propertyDescriptor.enumerable) { return }
  if(propertyPath) {
     path.string = (typeOf(path.string) === 'string')
      ? [path.string, $propertyKey].join(path.delimiter)
      : $propertyKey
    propertyDescriptor.path = path.string
  }
  if(options.type) { propertyDescriptor.type = typeOf(propertyValue) }
  if(options.frozen) { propertyDescriptor.frozen = Object.isFrozen(propertyValue) }
  if(options.sealed) { propertyDescriptor.sealed = Object.isSealed(propertyValue) }
  if(maxDepth > 1 && ObjectKeys.includes(typeOf(propertyValue))) {
    propertyDescriptor.value = getOwnPropertyDescriptors(propertyValue, options)
  }
  else {
    propertyDescriptor.value = propertyValue
  }
  return propertyDescriptor
}