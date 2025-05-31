function freeze($target) {
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    if(Object.is($propertyValue, $target)) { continue }
    if($propertyValue && typeof $propertyValue === 'object') {
      freeze($propertyValue)
    }
  }
  return Object.freeze($target)
}
export default freeze