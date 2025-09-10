import typeOf from '../../../utilities/type-of/index.js'
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { ObjectKeys } from '../../../variables/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function getOwnPropertyDescriptor($source, $propertyKey, $options = {}) {
  const options = Options('object', 'getOwnPropertyDescriptors', $options)
  const { propertyPath, path, recurse } = options
  const { ancestors, maxDepth } = recurse
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  if(recurse.depth >= maxDepth) { return }
  else { recurse.depth++ }
  const tensorProxy = new TensorProxy(options)
  try {
    const propertyValue = tensorProxy.get($source, $propertyKey)
    if(ObjectKeys.includes(typeOf(propertyValue))) {
      if(ancestors.includes(propertyValue)) { return }
      else { ancestors.unshift(propertyValue) }
    }
    const typeOfSource = typeOf($source)
    const propertyDescriptor = (typeOfSource !== 'map')
      ? Object.getOwnPropertyDescriptor($source, $propertyKey)
      : (typeOfSource === 'map')
      ? { configurable: false, enumerable: true, value: propertyValue[1], writable: true }
      : undefined
    if(!propertyDescriptor) return undefined

    if(!options.nonenumerable && !propertyDescriptor.enumerable) { return }
    if(propertyPath) {
       path.string = (typeOf(path.string) === 'string')
        ? [path.string, $propertyKey].join(path.delimiter)
        : $propertyKey
      propertyDescriptor.path = path.string
    }
    if(options.type) { propertyDescriptor.type = typeOf(propertyValue) }
    if(options.frozen) { propertyDescriptor.frozen = Object.isFrozen(propertyValue) }
    if(options.sealed) { propertyDescriptor.sealed = Object.isSealed(propertyValue) }
    if(recurse.recurse && ObjectKeys.includes(typeOf(propertyValue))) {
      propertyDescriptor.value = getOwnPropertyDescriptors(propertyValue, options)
    }
    else {
      propertyDescriptor.value = propertyValue
    }
    return propertyDescriptor
  }
  catch($err) { console.error($err) }
  return undefined
}