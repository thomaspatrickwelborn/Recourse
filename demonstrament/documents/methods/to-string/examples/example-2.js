import * as Recourse from '/dependencies/recourse.js'
console.log("---------------------")
console.log("To String | Example 2")
console.log("---------------------")

const map = new Map([[0, 1], [1, 2], [2, 3]])
const mapString = Recourse.toString(map, { space: 2, replacer: null })
console.log("map", map)
console.log("mapString", mapString)
console.log("pass", mapString === `[
  [
    0,
    1
  ],
  [
    1,
    2
  ],
  [
    2,
    3
  ]
]`)