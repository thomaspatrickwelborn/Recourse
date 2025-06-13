import regularExpressions from '../regular-expressions/index.js'
const { quotationEscape, quotationStartStop } = regularExpressions
export default function splitPath($path) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  let subpathIndex = 0
  while(subpathIndex < subpaths.length) {
    subpaths[subpathIndex] = subpaths[subpathIndex].replace(
      new RegExp(regularExpressions.quotationStartStop), '$1'
    )
    subpathIndex++
  }
  return subpaths
}