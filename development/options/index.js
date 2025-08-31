import { Deleters, Getters, Setters, TypeValidators, Returners  } from '../tensors/index.js'
const PropertyAssignments = {
  object: {
    primitive: 'assign',
    object: 'assign', 
  }, 
  array: {
    primitive: 'assign',
    object: 'assign', 
  }, 
  map: {
    primitive: 'assign',
    object: 'assign', 
  }, 
  // set: {
  //   primitive: 'assign',
  //   object: 'assign', 
  // }, 
}
export default function Options($options = {}) {
  $options = $options || {}
  const propertyAssignments = Object.assign(structuredClone(PropertyAssignments), $options.propertyAssignments)
  const options = Object.assign({
    // Path
    delimiter: '.',
    path: false,
    pathMatch: false,
    pathMatchMax: 100,
    pathParseInteger: false, 
    // Tensors
    getters: [Getters.Object, Getters.Map, /* Getters.Set */],
    setters: [Setters.Object, Setters.Map, /* Setters.Set */],
    deleters: [Deleters.Object, Deleters.Map, /* Deleters.Set */],
    typeValidators: [TypeValidators.Object, TypeValidators.Map, /* TypeValidators.Set */],
    returners: [Returners.Object, Returners.Map, /* Returners.Set */],
    // Entities
    enumerable: true, 
    nonenumerable: false,
    returnValue: 'receiver',
    values: false,
    // Recurse
    depth: 0,
    recurse: true,
    maxDepth: 10,
    // Property Descriptors, Definitions
    frozen: false,
    sealed: false,
    type: false,
    typeCoercion: false,
    // Objects
    resemble: false,
    strict: false,
  }, $options, {
    propertyAssignments: propertyAssignments,
    ancestors: [].concat($options.ancestors || []),
  })
  
  return options
}
