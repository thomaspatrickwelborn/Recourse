import regularExpressions from '../regular-expressions/index.js'
export default function indepandTree($path, $source) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  const key = subpaths.pop()
  let subtarget = $source
  for(const $subpath of subpaths) { subtarget = subtarget[$subpath] }
  return subtarget[key]
}