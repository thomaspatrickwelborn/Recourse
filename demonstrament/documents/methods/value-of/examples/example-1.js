import { Recourse } from '/dependencies/recourse.js'
console.log("--------------------")
console.log("Value Of | Example 1")
console.log("--------------------")
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: [5, 55, 555]
        }
      }]
    }
  }]
}
console.log(Recourse.valueOf(object))
