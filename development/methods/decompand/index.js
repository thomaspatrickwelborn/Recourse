import typeOf from '../type-of/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import setProperty from '../set-property/index.js'
import entities from '../entities/index.js'
import Options from '../../options/index.js'
export default function decompand($compandEntries, $options = {}) {
  const options = Options($options)
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