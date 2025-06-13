import { Cessors, Setters } from '../cessors/index.js'
import typeOf from '../type-of/index.js'
import setProperty from '../set-property/index.js'
import entities from '../entities/index.js'
const Options = {
  setters: [Setters.Object],
}
export default function decompand($source, $options) {
  const options = Object.assign({}, Options, $options)
  const sourceEntries = (
    typeOf($source) === 'object'
  ) ? entities($source, 'entries', options) : $source
  if(!sourceEntries) { return }
  const target = (isNaN(sourceEntries[0][0])) ? {} : []
  iterateSourceEntries: 
  for(const [$propertyPath, $propertyValue] of sourceEntries) {
    setProperty(target, $propertyPath, $propertyValue, options)
  }
  return target
}