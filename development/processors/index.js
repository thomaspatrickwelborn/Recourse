const defaultProcessor = ($target, $property, $value) => {
  if($property === undefined) { return $target }
  else { $target[$property] = $value }
}
const setProcessor = ($target, $property, $value) => {
  if($property === undefined) { return $target }
  else { return $target.set($property, $value) }
}
export default {
  default: defaultProcessor,
  set: setProcessor,
}