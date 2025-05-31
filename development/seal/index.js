function seal($target) {
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    if(Object.is($propertyValue, $target)) { continue }
    if($propertyValue && typeof $propertyValue === 'object') {
      seal($propertyValue)
    }
  }
  return Object.seal($target)
}
export default seal