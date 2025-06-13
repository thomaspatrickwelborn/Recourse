import * as Recourse from '/dependencies/recourse.js'
console.log("--------------------")
console.log("Value Of | Example 2")
console.log("--------------------")

const map = new Map([[0, 1], [1, 2], [2, 3]])
const mapString = Recourse.toString(map)
console.log(mapString)
