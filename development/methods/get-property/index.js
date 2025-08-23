import outmatch from 'outmatch'
import splitPath from '../split-path/index.js'
import compand from '../compand/index.js'
import { TypeValidators, TensorProxy, Getters } from '../../tensors/index.js'
import Options from '../../options/index.js'
export default function getProperty() {
  const [$target, $path, $options] = [...arguments]
  const options = Object.assign ({}, Options, $options)
  const tensorProxy = new TensorProxy(options)
  if($path === undefined) { return tensorProxy.get($target, options) }
  const subpaths = splitPath($path, options.pathParseInteger)
  if(!options.pathMatch) {
    let subtarget = $target
    iterateSubpaths: 
    for(const $subpath of subpaths) {
      try {
        subtarget = tensorProxy.get(subtarget, $subpath)
        if(subtarget === undefined) { break iterateSubpaths } 
      }
      catch($err) { break iterateSubpaths }
    }
    return subtarget
  }
  else {
    const subtargets = []
    const compandEntries = compand($target, Object.assign({}, options, { values: true }))
    const propertyPathMatcher = outmatch($path, { separator: '.' })
    iterateCompandEntries:
    for(const [$propertyPath, $propertyValue] of compandEntries) {
      const propertyPathMatch = propertyPathMatcher($propertyPath, )
      if(propertyPathMatch === true) { subtargets.push([$propertyPath, $propertyValue]) }
    }
    return subtargets
  }
}