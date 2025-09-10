import isObjectClass from '../is-object-class/index.js'
import isPrimitiveClass from '../is-primitive-class/index.js'
export default function typeOfClass($operand) {
  if(isObjectClass($operand)) { return 'object' }
  if(isPrimitiveClass($operand)) { return 'primitive' }
}