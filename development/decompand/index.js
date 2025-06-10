import { Cessors, Processors } from '../cessors/index.js'
import typeOf from '../type-of/index.js'
import setProperty from '../set-property/index.js'
import entries from '../entries/index.js'
const Options = {
  processors: [Processors.default],
  values: false,
}
export default function decompand($source, $options) {
  const options = Object.assign({}, Options, $options)
  const sourceEntries = (typeOf($source) === 'object') ? Object.entries($source) : $source
  if(!sourceEntries) { return }
  const target = (isNaN(sourceEntries[0][0])) ? {} : []
  iterateSourceEntries: 
  for(const [$propertyPath, $propertyValue] of sourceEntries) {
    setProperty(target, $propertyPath, $propertyValue, options)
  }
  return target
}