import outmatch from 'outmatch'
import splitPath from '../../../utilities/split-path/index.js'
import compand from '../../object/compand/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function getProperty($target, $path, $options = {}) {
  const options = Options('map', 'get', $options)
  const { pathMatch, pathParseInteger } = options.path
  const tensorProxy = new TensorProxy(options)
  if($path === undefined) { return tensorProxy.get($target, options) }
  const subpaths = splitPath($path, pathParseInteger)
  if(!pathMatch) {
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
    const compandEntries = compand($target, options)
    const propertyPathMatcher = outmatch($path, { separator: '.' })
    iterateCompandEntries: 
    for(const [$propertyPath, $propertyValue] of compandEntries) {
      const propertyPathMatch = propertyPathMatcher($propertyPath, )
      if(propertyPathMatch === true) { subtargets.push([$propertyPath, $propertyValue]) }
    }
    return subtargets
  }
}