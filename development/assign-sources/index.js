import typeOf from '../type-of/index.js'
import { ObjectKeys } from '../variables/index.js'
import { Tensors, Getters, Setters } from '../tensors/index.js'
import * as Variables from '../variables/index.js'
import entities from '../entities/index.js'
const Options = {
  getters: [Getters.Object, Getters.Map],
  setters: [Setters.Object, Setters.Map],
}
export default function assignSources($target, $type, ...$sources) {
  if(!$target) { return $target}
  const options = Object.assign({}, Options)
  const getters = new Tensors(options.getters)
  const setters = new Tensors(options.setters)
  const typeOfTarget = typeOf($target)
  iterateSources: 
  for(const $source of $sources) {
    if(!Variables.ObjectKeys.includes(typeOf($source))) continue iterateSources
    const sourceEntries = entities($source, 'entries', {
      recurse: false, // returnValue: 'entries'
    })
    iterateSourceEntries: 
    for(const [$sourcePropertyKey, $sourcePropertyValue] of sourceEntries) {
      const targetPropertyValue = getters.cess($target, $sourcePropertyKey)
      const typeOfTargetPropertyValue = typeOf(targetPropertyValue)
      const typeOfSourcePropertyValue = typeOf($sourcePropertyValue)
      if(typeOfTarget === 'array' && $type === 'assignConcat') {
        setters.cess($target, $target.length, $sourcePropertyValue)
      }
      else if(
        Variables.ObjectKeys.includes(typeOfSourcePropertyValue) &&
        Variables.ObjectKeys.includes(typeOfTargetPropertyValue)
      ) {
        assignSources(targetPropertyValue, $type, $sourcePropertyValue)
      }
      else {
        setters.cess($target, $sourcePropertyKey, $sourcePropertyValue)
      }
    }
  }
  return $target
}