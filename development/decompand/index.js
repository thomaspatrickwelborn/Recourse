import { Tensors, Setters } from '../tensors/index.js'
import typeOf from '../type-of/index.js'
import setProperty from '../set-property/index.js'
import entities from '../entities/index.js'

const Options = {
  maxDepth: Infinity,
  setters: [Setters.Object, Setters.Map],
}

export default function decompand($source, $options) {
  const options = Object.assign({}, Options, $options)
  const typeofSource = typeOf($source)
  const sourceEntries = (typeofSource === 'object')
    ? entities($source, 'entries', options)
    : $source

  if (!sourceEntries) {
    return
  }

  const target = (isNaN(sourceEntries[0][0]))
    ? {}
    : []

  iterateSourceEntries: for (const [$propertyPath, $propertyValue] of sourceEntries) {
    const pathDepth = $propertyPath.split('.').length
    if (pathDepth > options.maxDepth) { continue }
    setProperty(target, $propertyPath, $propertyValue, options)
  }

  return target
}