import regularExpressions from '../regular-expressions/index.js'
import splitPath from '../split-path/index.js'
import { Tensors, Deleters } from '../tensors/index.js'
const Options = { deleters: [Deleters.Object, Deleters.Map] }
import getProperty from '../get-property/index.js'
// import tensors
export default function deleteProperty($target, $path, $options) {
  const options = Object.assign ({}, Options, $options)
  const deleters = new Tensors(options.deleters)
  const subpaths = splitPath($path)
  const key = subpaths.pop()
  const subtarget = getProperty($target, subpaths.join('.')) || $target
  deleters.cess(subtarget, key)
  return
}