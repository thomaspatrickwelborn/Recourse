import typeOf from '../type-of/index.js'
import setProperty from '../set-property/index.js'
import entities from '../entities/index.js'
import Options from '../../options/index.js'
export default function decompand($source, $options) {
  const options = Object.assign({}, Options, $options)
  const typeofSource= typeOf($source)
  const sourceEntries = (
    typeofSource === 'object'
  ) ? entities($source, 'entries', Object.assign({}, options, {
    recurse: false
  })) : $source
  if(!sourceEntries) { return }
  iterateSourceEntries: 
  for(const [$propertyPath, $propertyValue] of sourceEntries) {
    setProperty($source, $propertyPath, $propertyValue, options)
  }
  return $source
}