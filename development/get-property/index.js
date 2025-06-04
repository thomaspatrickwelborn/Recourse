import regularExpressions from '../regular-expressions/index.js'
export default function getProperty() {
  const [$target, $path] = [...arguments]
  if($path === undefined) return arguments[0]
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  let subtarget = $target
  for(const $subpath of subpaths) {
    try { subtarget = subtarget[$subpath] }
    catch($err) { subtarget = undefined }
  }
  return subtarget
}