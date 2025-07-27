import outmatch from 'outmatch'
import splitPath from '../split-path/index.js'
import compand from '../compand/index.js'
import { TypeValidators, Tensors, Getters } from '../tensors/index.js'
const Options = {
  pathMatch: false,
  pathMatchMaxResults: 1000,
  getters: [Getters.Object, Getters.Map],
  typeValidators: [TypeValidators.Object, TypeValidators.Map],
}
export default function getProperty() {
  const [$target, $path, $options] = [...arguments]
  if($path === undefined) return arguments[0]
  const options = Object.assign ({}, Options, $options)
  const getters = new Tensors(options.getters, options.typeValidators)
  const subpaths = splitPath($path)
  if(!options.pathMatch) {
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
  else {
    const subtargets = []
    const compandEntries = compand($target, { values: true })
    const propertyPathMatcher = outmatch($path, { separator: '.' })
    iterateCompandEntries:
    for(const [$propertyPath, $propertyValue] of compandEntries) {
      const propertyPathMatch = propertyPathMatcher($propertyPath, )
      if(propertyPathMatch === true) { subtargets.push([$propertyPath, $propertyValue]) }
    }
    return subtargets
  }
}