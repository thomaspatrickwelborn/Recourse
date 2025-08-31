import typeOf from '../methods/type-of/index.js'
import typeOfClass from '../methods/type-of-class/index.js'
function PropertyTransformer($propertyAssignments, $newProperty, $target, $property, $value) {
  if(isNaN($property)) { return $property }
  if(PropertyAssigner($propertyAssignments, $target, $property, $value) === 'push') {
    switch(typeOf($property)) {
      case 'string': return String(Number($newProperty))
      case 'number': return $newProperty
      default: return $property
    }
  }
  else { return $property }
}
function PropertyAssigner($propertyAssignments, $target, $property, $value) {
  const targetType = typeOf($target)
  const targetAssignmentMethodDefinition = $propertyAssignments[targetType]
  const typeofTargetAssignmentDefinition = typeof targetAssignmentMethodDefinition
  switch(typeofTargetAssignmentDefinition) {
    case 'string': return targetAssignmentMethodDefinition; 
    case 'object': return targetAssignmentMethodDefinition[typeOfClass($value)]; 
    default: return $property; 
  }
}
export { PropertyAssigner, PropertyTransformer }