export default ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase()