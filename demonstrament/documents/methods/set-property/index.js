import { set, typeOf, variables } from '/dependencies/recourse.js'
console.log("------------------------")
console.log("Set Property | Example 1")
console.log("------------------------")
const options = {
  accessors: [function accessors($target, $property) {
    const typeOfTarget = typeOf($target)
    const typeOfProperty = typeOf($property)
    if(variables.ObjectKeys.includes(typeOfTarget)) {
      if($property) { return $target[$property] }
      else { return $target }
    }
    else if(typeOfTarget === 'map') {
      if($property) { return $target.get($property) }
      else { return $target }
    }
  }],
  processors: [function processors() {
    const $arguments = [...arguments]
    if(typeOf($arguments[1]) === 'string') {
      const [$target, $property, $value, $options] = $arguments
      const typeOfTarget = typeOf($target)
      if(variables.ObjectKeys.includes(typeOfTarget)) {
        $target[$property] = $value
      }
      else if(typeOfTarget === 'map') {
        $target.set($property, $value)
      }
    }
    else {
      // const [$target, $value, $options] = $arguments
    } 
  }],
}
const map = new Map([["propertyA", 1]])
set(map, "propertyB", 2, options)
set(map, "propertyC", new Map([["propertyD", 4]]), options)
set(map, "propertyE", new Map([["propertyF", new Map([["propertyG", 777]])]]), options)
const object = new Object({ "propertyA": 1 })
set(object, "propertyB", 2, options)
set(object, "propertyC", new Object({
  "propertyD": 4
}), options)
set(object, "propertyE", new Object({
  "propertyF": new Object({
    "propertyG": 777
  })
}), options)
console.log("map", map)
set(object, 'propertyH.propertyI.propertyJ', 101010, options)

const array = new Array(3, 4, 5)

console.log("object", object)