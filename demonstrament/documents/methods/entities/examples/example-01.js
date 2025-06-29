import { Recourse } from '/dependencies/recourse.js'
console.log("--------------------")
console.log("Entities | Example 1")
console.log("--------------------")
const object = {
  propertyA: [{}],
  propertyE: {
    /*propertyF: []*/
  },
}

const objectEntries = Recourse.entities(object, 'entries')
const objectKeys = Recourse.entities(object, 'keys')
const objectValues = Recourse.entities(object, 'values')
console.log('objectEntries', objectEntries)
console.log('objectKeys', objectKeys)
console.log('objectValues', objectValues)
