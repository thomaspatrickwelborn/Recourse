import { valueOf } from '/dependencies/recourse.js'
console.log("--------------------")
console.log("Value Of | Example 1")
console.log("--------------------")
console.log(valueOf({
  propertyA: [{
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: [5, 55, 555]
        }
      }]
    }
  }]
}))