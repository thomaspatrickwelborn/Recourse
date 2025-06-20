import typeOf from '../type-of/index.js'
import { ObjectKeys } from '../variables/index.js'
import { Tensors, Getters, Setters } from '../tensors/index.js'
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
    if(!$source) continue iterateSources
    iterateSourceEntries: 
    for(const [
      $sourcePropertyKey, $sourcePropertyValue
    ] of Object.entries($source)) {
      const targetPropertyValue = $target[$sourcePropertyKey]
      const typeOfTargetPropertyValue = typeOf(targetPropertyValue)
      const typeOfSourcePropertyValue = typeOf($sourcePropertyValue)
      if(typeOfTarget === 'array' && $type === 'assignConcat') {
        $target.push($sourcePropertyValue)
      }
      else {
        if(ObjectKeys.includes(typeOfTargetPropertyValue)) {
          assignSources(targetPropertyValue, $type, $sourcePropertyValue)
        }
        else {
          setters.cess($target, $sourcePropertyKey, $sourcePropertyValue, options)
        }
      }
    }
  }
  return $target
}