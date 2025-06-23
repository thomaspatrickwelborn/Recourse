import { Recourse } from '/dependencies/recourse.js'
const object = {
  propertyA: [{
    propertyB: {
      propertyC: [3, 33, 333]
    }
  }, {
    propertyD: {
      propertyE: [5, 55, 555]
    }
  }, {
    propertyF: {
      propertyG: new Map([[0, 7], [1, 77], [2, 777]])
    }
  }]
}

Recourse.set(object, 'propertyA.1.propertyD.propertyE.1', "55")
const recourseObject = new Recourse(object)
recourseObject.get('propertyA.0.propertyB.propertyC.0')
recourseObject.set('propertyA.1.propertyD.propertyE.1', "55")
recourseObject.delete('propertyA.2.propertyD.propertyE.2')
