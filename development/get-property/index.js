import regularExpressions from '../regular-expressions/index.js'
import { Cessors, Accessors } from '../cessors/index.js'
const Options = { accessors: [Accessors.default] }
export default function getProperty() {
  const [$target, $path, $options] = [...arguments]
  const options = Object.assign ({}, Options, $options)
  if($path === undefined) return arguments[0]
  const accessors = new Cessors(options.accessors)
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  let subtarget = $target
  iterateSubpaths: 
  for(const $subpath of subpaths) {
    try {
      subtarget = accessors.cess(subtarget, $subpath)
      if(subtarget === undefined) { break iterateSubpaths } 
    }
    catch($err) { break iterateSubpaths }
  }
  return subtarget
}