export default ($operand) => Object
  .prototype
  .toString
  .call($operand).slice(8, -1).toLowerCase()