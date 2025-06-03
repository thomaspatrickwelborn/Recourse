const Options = { enumerable: true, nonenumerable: true }
export default function numerableEntries($target, $options) {
  const _numerableEntries = []
  const options = Object.assign({}, Options, $options)
  const { enumerable, nonenumerable } = options
  if(!enumerable && !nonenumerable) return []
  const propertyDescriptors = Object.getOwnPropertyDescriptors($target)
  for(const [$property, $propertyDescriptor] of Object.entries(propertyDescriptors)) {
    if(
      enumerable && $propertyDescriptor.enumerable ||
      nonenumerable && !$propertyDescriptor.enumerable
    ) { _numerableEntries.push([$property, $propertyDescriptor.value]) }
  }
  return _numerableEntries
}