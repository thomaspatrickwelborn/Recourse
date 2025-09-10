import typeOf from '../../../utilities/type-of/index.js'
import setProperty from '../../map/set-property/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function decompand($compandEntries, $options = {}) {
  const options = Options('object', 'decompand', $options)
  const typeOfCompandEntries = typeOf($compandEntries)
  let compandEntries
  switch(typeOfCompandEntries) {
    case 'array': compandEntries = $compandEntries; break
    case 'object': compandEntries = Object.entries($compandEntries); break
    case 'map': compandEntries = $compandEntries.entries(); break
  }
  const decompandment = (isNaN(compandEntries[0][0])) ? {} : []
  iterateSourceEntries: 
  for(const [$propertyPath, $propertyValue] of $compandEntries) {
    setProperty(decompandment, $propertyPath, $propertyValue, options)
  }
  return decompandment
}