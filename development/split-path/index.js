import typeOf from '../type-of/index.js'
import regularExpressions from '../regular-expressions/index.js'
const { quotationEscape, quotationStartStop } = regularExpressions
export default function splitPath($path) {
  const typeOfPath = typeOf($path)
  if(typeOfPath === 'string') {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    let subpathIndex = 0
    iterateSubpaths: 
    while(subpathIndex < subpaths.length) {
      subpaths[subpathIndex] = subpaths[subpathIndex].replace(
        new RegExp(regularExpressions.quotationStartStop), '$1'
      )
      subpathIndex++
    }
    return subpaths
  }
  else if(typeOfPath === 'number'){ return [$path] }
}