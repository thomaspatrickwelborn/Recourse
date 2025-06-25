import typedObjectLiteral from '../typed-object-literal/index.js'
import typeOf from '../type-of/index.js'
import splitPath from '../split-path/index.js'
import { Tensors, Getters, Setters } from '../tensors/index.js'
const Options = {
  getters: [Getters.Object, Getters.Map], 
  setters: [Setters.Object, Setters.Map],
}
export default function setProperty() {
  const $arguments = [...arguments]
  if(typeOf($arguments[1]) === 'string') {
    const [$target, $path, $value, $options] = $arguments
    const options = Object.assign({}, Options, $options)
    const getters = new Tensors(options.getters)
    const setters = new Tensors(options.setters)
    const { enumerable, nonenumerable } = options
    const target = getters.cess($target, options)
    const subpaths = splitPath($path)
    const key = subpaths.pop()
    let subtarget = $target
    iterateSubpaths: 
    for(const $subpath of subpaths) {
      subtarget = getters.cess(subtarget, $subpath, options) || setters.cess(
        subtarget, $subpath, isNaN($subpath) ? {} : [], options
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