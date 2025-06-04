import typeOf from '../type-of/index.js'
const Options = { }
export default function assignSources($target, $type, ...$sources) {
  if(!$target) { return $target}
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
        if(['array', 'object'].includes(typeOfTargetPropertyValue)) {
          assignSources(targetPropertyValue, $type, $sourcePropertyValue)
        }
        else {
          Object.assign($target, { [$sourcePropertyKey]: $sourcePropertyValue })
        }
      }
    }
  }
  return $target
}