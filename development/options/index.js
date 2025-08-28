import { Deleters, Getters, Setters, TypeValidators, Returners  } from '../tensors/index.js'
const PropertyAssignments = {
  object: 'assign', // 'push', 
  array: 'assign', // 'push', 
  map: 'assign', // 'push', 
  /* set: 'assign', // push */
}
export default function Options($options) {
  const { propertyAssignments } = $options
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
    values: false,
    returnValue: 'receiver',
    // Recurse
    // ancestors: [].concat($options.ancestors),
    ancestors: [],
    recurse: true,
    depth: 0, 
    maxDepth: 10,
    // Property Descriptors, Definitions
    frozen: false,
    sealed: false,
    type: false,
    typeCoercion: false,
    // Objects
    propertyAssignments: Object.assign({}, PropertyAssignments, propertyAssignments),
    resemble: false,
    strict: false,
  }, $options)
  // 
  // DEFAULT PROPERTY ASSIGNMENTS
  // 
  // if(!options)
  return options
}
