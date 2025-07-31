
import outmatch from 'outmatch'
import compand from '../compand/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import typeOf from '../type-of/index.js'
import splitPath from '../split-path/index.js'
import { TypeValidators, Tensors, Getters, Setters } from '../tensors/index.js'
const Options = {
  pathMatch: false,
  pathMatchMaxResults: 1000,
  pathParseInteger: false, 
  getters: [Getters.Object, Getters.Map], 
  setters: [Setters.Object, Setters.Map],
  typeValidators: [TypeValidators.Object, TypeValidators.Map],
}
export default function setProperty() {
  const $arguments = [...arguments]
  const [$target, $path, $value, $options] = $arguments
  const options = Object.assign({}, Options, $options)
  const getters = new Tensors(options.getters, options.typeValidators)
  const setters = new Tensors(options.setters, options.typeValidators)
  if(!options.pathMatch) {
    if(typeOf($arguments[1]) === 'string') {
      const { enumerable, nonenumerable } = options
      const target = getters.cess($target)
      const subpaths = splitPath($path, options.pathParseInteger)
      const key = subpaths.pop()
      let subtarget = $target
      iterateSubpaths: 
      for(const $subpath of subpaths) {
        subtarget = getters.cess(subtarget, $subpath, options) || setters.cess(
          subtarget, $subpath, isNaN($subpath) ? {} : []
        )
        if(subtarget === undefined) { break iterateSubpaths } 
      }
      setters.cess(subtarget, key, $value, options)
      return $target
    }
    else {
      const [$target, $value] = $arguments
      return $target
    }
  }
  else {
    const subtargets = []
    const compandEntries = compand($target, Object.assign({}, options, { values: true }))
    const propertyPathMatcher = outmatch($path, { separator: '.' })
    iterateCompandEntries:
    for(const [$propertyPath, $propertyValue] of compandEntries) {
      const propertyPathMatch = propertyPathMatcher($propertyPath, { separator: '.' })
      if(propertyPathMatch === true) {
        setProperty($target, $propertyPath, $value, {
          pathMatch: false, pathParseInteger: options.pathParseInteger
        })
        subtargets.push([$propertyPath, $value])
      }
    }
    return subtargets
  }
}