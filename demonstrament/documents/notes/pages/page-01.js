import { Recourse } from '/dependencies/recourse.js'
const options = {}
const map = new Map([
  [7, 7],
  [77, 77],
  [777, 777],
])
Recourse.assign(map, options, new Map([[7, "7"]]))
