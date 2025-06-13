import valueOf from '../value-of/index.js'
import { Getters } from '../cessors/index.js'
import { ObjectKeys } from '../variables/index.js'
const Options = {
  getters: [Getters.Object, Getters.Map], space: 0, replacer: null
}
export default function toString($source, $options) {
  const options = Object.assign({}, Options, $options)
  return JSON.stringify(
    valueOf($source, options), options.replacer, options.space
  )
}