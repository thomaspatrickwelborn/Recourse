import { TensorProxy } from '../../../tensors/index.js'
import typedObjectLiteral from '../../../utilities/typed-object-literal/index.js'
import defineProperties from '../define-properties/index.js'
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function toString($source, $options = {}) {
  const options = Options('object', 'toString', Object.assign({}, $options, {
    resemble: true, type: true
  }))
  // console.log(defineProperties(
  //   typedObjectLiteral($source), getOwnPropertyDescriptors($source, options), options
  // ))
  return JSON.stringify(
    defineProperties(
      typedObjectLiteral($source), getOwnPropertyDescriptors($source, options), options
    ), 
    options.replacer, options.space
  )
}