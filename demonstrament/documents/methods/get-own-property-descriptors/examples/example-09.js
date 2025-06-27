console.log("---------------------------------------------------")
console.log("Recourse | Get Own Property Descriptors | Example 9")
console.log("---------------------------------------------------")
import { Recourse } from '/dependencies/recourse.js'
const { getOwnPropertyDescriptors } = Recourse
const map = new Map([[7, 7], [77, 77], [777, 777]])
const mapPDASTEntries = Recourse.getOwnPropertyDescriptors(map, {
  returnValue: 'entries'
})
// const mapPDASTTarget = Recourse.getOwnPropertyDescriptors(map, {
//   returnValue: 'target'
// })
// const mapPDASTReceiver = Recourse.getOwnPropertyDescriptors(map, {
//   returnValue: 'receiver'
// })
const mapPDASTEntriesString = JSON.stringify(mapPDASTEntries, null, 2)
// const mapPDASTTargetString = JSON.stringify(mapPDASTTarget, null, 2)
// const mapPDASTReceiverString = JSON.stringify(mapPDASTReceiver, null, 2)
console.log('map', map)
console.log("mapPDASTEntries", mapPDASTEntriesString)
// console.log("mapPDASTTarget", mapPDASTTargetString)
// console.log("mapPDASTReceiver", mapPDASTReceiverString)
