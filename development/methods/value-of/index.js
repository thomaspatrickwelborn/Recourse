import defineProperties from '../define-properties/index.js' 
import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js' 
import entities from '../entities/index.js' 
import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import { Tensors, Getters, TypeValidators } from '../../tensors/index.js'
import { ObjectKeys } from '../../variables/index.js'
import Options from '../../options/index.js'
export default function valueOf($source, $options = {}) {
  const options = Object.assign({}, Options, $options)
  const getters = new Tensors(options.getters, options.typeValidators)
  const source = getters.cess($source)
  return $source
}