import { Recourse } from '/dependencies/recourse.js'
console.log("--------------------------")
console.log("Decompand Tree | Example 1")
console.log("--------------------------")
const array = [{
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
console.log(Recourse.compand(array, { values: true }))
// const arrayString = JSON.stringify(array, null, 2)
// const arrayCompand = Recourse.compand(array, {
//   values: true, maxDepth: 10
// })
// const arrayCompandString = JSON.stringify(arrayCompand, null, 2)
// console.log("array", arrayString)
// console.log("arrayCompand", arrayCompand)
// console.log("arrayCompandString", arrayCompandString)
// const arrayCompandString = JSON.stringify(arrayCompand, null, 2)
// const arrayDecompand = Recourse.decompand(arrayCompand)
// console.log(arrayDecompand)
// const arrayDecompandString = JSON.stringify(arrayDecompand, null, 2)
// // console.log("arrayCompand", arrayCompandString)
// console.log("arrayCompand", arrayCompandString)
// console.log("arrayDecompand", arrayDecompandString)
// console.log("pass", arrayDecompandString === arrayString)