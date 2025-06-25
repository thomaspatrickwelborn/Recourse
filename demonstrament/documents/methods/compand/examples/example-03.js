import { Recourse } from '/dependencies/recourse.js'
console.log("------------------------")
console.log("Compand Tree | Example 3")
console.log("------------------------")
const map = new Map([
  [777, 777], [777777, 777777], [777777777, 777777777]
])
const mapCompand = Recourse.compand(map, {
  values: true, // returnValue: 'target'
})
console.log(mapCompand)
// const mapCompandString = Recourse.toString(map, { space: 2, replacer: null })
// console.log('mapCompandString', mapCompandString)
// console.log("pass", `` === objectCompandString)