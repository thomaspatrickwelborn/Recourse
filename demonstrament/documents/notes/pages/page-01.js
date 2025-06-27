import { Recourse } from '/dependencies/recourse.js'
const map = new Map([
  [7, 7],
  [77, 77],
  [777, 777],
])
Recourse.assign(map, new Map([[7, "7"]]))
