import { TensorProxy } from '../../tensors/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import defineProperties from '../define-properties/index.js'
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js'
import Options from '../../options/index.js'
export default function toString($source, $options = {}) {
  const options = Options(
    Object.assign({}, $options, { resemble: true, type: true })
  )
  return JSON.stringify(
    defineProperties(
      typedObjectLiteral($source), getOwnPropertyDescriptors($source, options), options
    ), 
    options.replacer, options.space
  )
}