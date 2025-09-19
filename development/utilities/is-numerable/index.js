export default ($entityOptions, $propertyDescriptor) => {
  const { enumerable } = $propertyDescriptor
  return (
    ($entityOptions.enumerable && enumerable) ||
    ($entityOptions.nonenumerable && !enumerable)
  )
}