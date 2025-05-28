function recursiveFreeze($target) {
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    if(Object.is($propertyValue, $target)) { continue }
    if($propertyValue && typeof $propertyValue === 'object') {
      recursiveFreeze($propertyValue)
    }
  }
  return Object.freeze($target)
}
export default recursiveFreeze