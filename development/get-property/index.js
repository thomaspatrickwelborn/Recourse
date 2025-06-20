import regularExpressions from '../regular-expressions/index.js'
import splitPath from '../split-path/index.js'
import { Tensors, Getters } from '../tensors/index.js'
const Options = {
  getters: [Getters.Object, Getters.Map],
}
export default function getProperty() {
  const [$target, $path, $options] = [...arguments]
  if($path === undefined) return arguments[0]
  const options = Object.assign ({}, Options, $options)
  const getters = new Tensors(options.getters)
  const subpaths = splitPath($path)
  let subtarget = $target
  iterateSubpaths: 
  for(const $subpath of subpaths) {
    try {
      subtarget = getters.cess(subtarget, $subpath, options)
      if(subtarget === undefined) { break iterateSubpaths } 
    }
    catch($err) { break iterateSubpaths }
  }
  return subtarget
}