import { Recourse } from '/dependencies/recourse.js'
// const object = {
//   propertyA: [{
//     propertyB: {
//       propertyC: [3, 33, 333]
//     }
//   }, {
//     propertyD: {
//       propertyE: [5, 55, 555]
//     }
//   }, {
//     propertyF: {
//       propertyG: new Map([[0, 7], [1, 77], [2, 777]])
//     }
//   }]
// }
const map = new Map([
  [0, 1],
  [1, 2],
  [2, 3],
  ["0", "1"],
  ["1", "2"],
  ["2", "3"],
])
console.log(map)
console.log(Object.fromEntries(map.entries()))
console.log(Recourse.get(map, '0'))
console.log(Recourse.get(map, 0))
console.log(Object.fromEntries(map))
// console.log(
//   `propertyA.0.propertyB.propertyC.0`,
//   Recourse.get(object, 'propertyA.0.propertyB.propertyC.0')
// )
// Recourse.set(object, 'propertyA.1.propertyD.propertyE.1', "55")
// console.log(
//   `propertyA.1.propertyD.propertyE.1`,
//   Recourse.get(object, 'propertyA.1.propertyD.propertyE.1')
// )
// Recourse.delete(object, 'propertyA.2.propertyF.propertyG.2')
// console.log(Recourse.get(object, 'propertyA.2.propertyF.propertyG'))
// const recourseObject = new Recourse(object)
// recourseObject.get('propertyA.0.propertyB.propertyC.0')
// recourseObject.set('propertyA.1.propertyD.propertyE.1', "55")
// recourseObject.delete('propertyA.2.propertyD.propertyE.2')
