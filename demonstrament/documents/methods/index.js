// import './compand-tree/index.js'
// import './expand-tree/index.js'
// import './get-own-property-descriptors/index.js'
// import './define-properties/index.js'

import Recourse from '/dependencies/recourse.js'
const object = {
  propertyA: {
    propertyB: {
      propertyC: 333
    },
  },
  propertyD: [{
    propertyE: 555,
    propertyF: {
      propertyG: 777,
      propertyH: [{
        propertyI: 999
      }]
    }
  }],
}
console.log("object", object)
console.log(Recourse.entries(object, { /* maxDepth: 2 */ }))
console.log(Recourse.values(object, { /* maxDepth: 2 */ }))
console.log(Recourse.keys(object, { /* maxDepth: 2 */ }))
