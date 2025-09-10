import entries from '../entries/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function valueOf($source, $options = {}) {
  const options = Options('object', 'valueOf', $options)
  const source = new TensorProxy(options).get($source)
  return source
}