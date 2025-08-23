import outmatch from 'outmatch'
import compand from '../compand/index.js'
import splitPath from '../split-path/index.js'
import Options from '../../options/index.js'
import { TensorProxy } from '../../tensors/index.js'
import getProperty from '../get-property/index.js'
export default function deleteProperty($target, $path, $options) {
  const options = Object.assign ({}, Options, $options)
  const tensorProxy = new TensorProxy(options)
  if(!options.pathMatch) {
    const subpaths = splitPath($path, options.pathParseInteger)
    const key = subpaths.pop()
    const subtarget = getProperty($target, subpaths.join('.'), options) || $target
    tensorProxy.delete(subtarget, key)
  }
  else {
    const subtargets = []
    const compandEntries = compand($target, Object.assign({}, options, { values: true }))
    const propertyPathMatcher = outmatch($path, { separator: '.' })
    iterateCompandEntries:
    for(const [$propertyPath, $propertyValue] of compandEntries) {
      const propertyPathMatch = propertyPathMatcher($propertyPath, { separator: '.' })
      if(propertyPathMatch === true) {
        deleteProperty($target, $propertyPath, {
          pathMatch: false, pathParseInteger: options.pathParseInteger
        })
        subtargets.push([$propertyPath, undefined])
      }
    }
    return subtargets
  }
}