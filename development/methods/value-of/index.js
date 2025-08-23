import defineProperties from '../define-properties/index.js' 
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js' 
import entities from '../entities/index.js' 
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import { TensorProxy, Getters, TypeValidators } from '../../tensors/index.js'
import { ObjectKeys } from '../../variables/index.js'
import Options from '../../options/index.js'
export default function valueOf($source, $options = {}) {
  const options = Object.assign({}, Options, $options)
  const tensorProxy = new TensorProxy(options)
  const source = tensorProxy.get($source)
  // const sourcePropertyDescriptors = getOwnPropertyDescriptors(source, options)
  // iterateSourcePropertyDescriptors: 
  // for(const [
  //   $sourcePropertyKey, $sourcePropertyDescriptor
  // ] of sourcePropertyDescriptors) {
  //   const { nonenumerable, receiver } options
  //   const { enumerable } = $sourcePropertyDescriptor
  //   if(nonenumerable || enumerable) {}
  // }
  return source
}