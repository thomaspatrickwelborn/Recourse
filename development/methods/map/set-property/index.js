import outmatch from 'outmatch'
import compand from '../../object/compand/index.js'
import typeOf from '../../../utilities/type-of/index.js'
import splitPath from '../../../utilities/split-path/index.js'
import { TensorProxy } from '../../../tensors/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function setProperty() {
  const $arguments = [...arguments]
  const [$target, $path, $value, $options] = $arguments
  const options = Options('map', 'set', $options)
  const { pathMatch, pathParseInteger } = options.path
  if(!pathMatch) {
    const tensorProxy = new TensorProxy(options)
    if(typeOf($arguments[1]) === 'string') {
      const { enumerable, nonenumerable } = options.entities
      const target = tensorProxy.get($target)
      const subpaths = splitPath($path, pathParseInteger)
      const key = subpaths.pop()
      let subtarget = $target
      iterateSubpaths: 
      for(const $subpath of subpaths) {
        subtarget = tensorProxy.get(subtarget, $subpath, options) || tensorProxy.set(
          subtarget, $subpath, isNaN($subpath) ? {} : []
        )
        if(subtarget === undefined) { break iterateSubpaths } 
      }
      tensorProxy.set(subtarget, key, $value, options)
      return $target
    }
    else {
      const [$target, $value] = $arguments
      return $target
    }
  }
  else {
    const subtargets = []
    const compandEntries = compand($target, options)
    const propertyPathMatcher = outmatch($path, { separator: '.' })
    iterateCompandEntries:
    for(const [$propertyPath, $propertyValue] of compandEntries) {
      const propertyPathMatch = propertyPathMatcher($propertyPath, { separator: '.' })
      if(propertyPathMatch === true) {
        setProperty($target, $propertyPath, $value, {
          path: { pathMatch: false, pathParseInteger: pathParseInteger }
        })
        subtargets.push([$propertyPath, $value])
      }
    }
    return subtargets
  }
}