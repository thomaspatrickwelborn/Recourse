import regularExpressions from '../regular-expressions/index.js'
export default function getTreeNode($target, $path) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  const key = subpaths.pop()
  let subtarget = $target
  for(const $subpath of subpaths) { subtarget = subtarget[$subpath] }
  return subtarget[key]
}