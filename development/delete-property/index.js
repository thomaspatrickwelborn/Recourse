import splitPath from '../split-path/index.js'
import { Tensors, Deleters } from '../tensors/index.js'
const Options = { deleters: [Deleters.Object, Deleters.Map], returnValue: 'target' }
import getProperty from '../get-property/index.js'
export default function deleteProperty($target, $path, $options) {
  const options = Object.assign ({}, Options, $options)
  const deleters = new Tensors(options.deleters)
  const subpaths = splitPath($path)
  const key = subpaths.pop()
  const subtarget = getProperty($target, subpaths.join('.'), options) || $target
  deleters.cess(subtarget, key)
}