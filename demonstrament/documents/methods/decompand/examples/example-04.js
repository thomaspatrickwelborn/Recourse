import { Recourse } from '/dependencies/recourse.js'
console.log("--------------------------")
console.log("Decompand Tree | Example 1")
console.log("--------------------------")
const object = [{
  propertyA: {
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: 555555555
        }
      }, {
        propertyD: {
          propertyF: [{
            propertyG: 777
          }, {
            propertyG: 777777
          }, {
            propertyG: 777777777
          }],
        }
      }]
    }
  }
}]
const objectString = JSON.stringify(object, null, 2)
const objectCompand = Recourse.compand(object, {
  values: true, maxDepth: 20
})
// const objectCompandString = JSON.stringify(objectCompand, null, 2)
// console.log("object", objectString)
// console.log("objectCompand", objectCompand)
// console.log("objectCompandString", objectCompandString)
// const objectCompandString = JSON.stringify(objectCompand, null, 2)
// const objectDecompand = Recourse.decompand(objectCompand)
// console.log(objectDecompand)
// const objectDecompandString = JSON.stringify(objectDecompand, null, 2)
// // console.log("objectCompand", objectCompandString)
// console.log("objectCompand", objectCompandString)
// console.log("objectDecompand", objectDecompandString)
// console.log("pass", objectDecompandString === objectString)