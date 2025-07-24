import defineProperties from '../define-properties/index.js' 
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js' 
import entities from '../entities/index.js' 
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import { Tensors, Getters } from '../tensors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  ancestors: [], 
  depth: 0, maxDepth: 10,
  getters: [Getters.Object, Getters.Map], 
  returnValue: 'receiver',
  strict: false,
}
export default function valueOf($source, $options = {}) {
  const options = Object.assign({}, $options)
  if(options.returnValue === 'receiver') { return $source }
  else {
    const target = typedObjectLiteral(typeOf($source))
    return defineProperties(target, getOwnPropertyDescriptors($source, $options))
  }
} 