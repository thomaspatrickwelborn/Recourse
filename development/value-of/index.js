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
}
export default function valueOf($source, $options = {}) {
  return ($options.returnValue === 'entries')
    ? entities($source, 'entries', $options) : $source
}