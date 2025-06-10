import entities from '../entities/index.js'
import regularExpressions from '../regular-expressions/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'
import typeOf from '../type-of/index.js'
import { Cessors, Accessors, Processors } from '../cessors/index.js'
const Options = {
  enumerable: true, nonenumerable: false,
  accessors: [Accessors.default], 
  processors: [Processors.default],
}
export default function setProperty() {
  const $arguments = [...arguments]
  if(typeOf($arguments[1]) === 'string') {
    const [$target, $path, $value, $options] = $arguments
    const options = Object.assign({}, Options, $options)
    const accessors = new Cessors(options.accessors)
    const processors = new Cessors(options.processors)
    const { enumerable, nonenumerable } = options
    const target = accessors.cess($target)
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    const key = subpaths.pop()
    let subtarget = target
    iterateSubpaths: 
    for(const $subpath of subpaths) {
      subtarget = accessors.cess(subtarget, $subpath, options) || processors.cess(
        subtarget, $subpath, isNaN($subpath) ? {} : [], options
      )
    }
    processors.cess(subtarget, key, $value)
    return $target
  }
  else {
    const [$target, $value] = $arguments
    return $target
  }
}