import { Deleters, Getters, Setters, TypeValidators, Returners  } from '../tensors/index.js'
export default {
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
  resemble: false,
  strict: false,
}