import regularExpressions from '../regular-expressions/index.js'
import { Cessors, Getters } from '../cessors/index.js'
const Options = { getters: [Getters.Object, Getters.Map] }
export default function getProperty() {
  const [$target, $path, $options] = [...arguments]
  const options = Object.assign ({}, Options, $options)
  if($path === undefined) return arguments[0]
  const getters = new Cessors(options.getters)
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
  let subtarget = $target
  iterateSubpaths: 
  for(const $subpath of subpaths) {
    try {
      subtarget = getters.cess(subtarget, $subpath)
      if(subtarget === undefined) { break iterateSubpaths } 
    }
    catch($err) { break iterateSubpaths }
  }
  return subtarget
}