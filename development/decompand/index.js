import regularExpressions from '../regular-expressions/index.js'
import typeOf from '../type-of/index.js'
import setProperty from '../set-property/index.js'
import entries from '../entries/index.js'
import options from './options.js'
export default function decompand($source, $options) {
  const sourceEntries = (typeOf($source) === 'object') ? Object.entries($source) : $source
  if(!sourceEntries) { return }
  const target = (isNaN(sourceEntries[0][0])) ? {} : []
  iterateSourceEntries: 
  for(const [$propertyPath, $propertyValue] of sourceEntries) {
    setProperty(target, $propertyPath, $propertyValue)
  }
  return target
}