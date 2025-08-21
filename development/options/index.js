import { Deleters, Getters, Setters, TypeValidators  } from '../tensors/index.js'
export default {
  // Path
  delimiter: '.',
  path: false,
  pathMatch: false,
  pathMatchMax: 100,
  pathParseInteger: false, 
  // Tensors
  getters: [Getters.Object, Getters.Map],
  setters: [Setters.Object, Setters.Map],
  deleters: [Deleters.Object, Deleters.Map],
  typeValidators: [TypeValidators.Object, TypeValidators.Map],
  // Entities
  enumerable: true, 
  nonenumerable: false,
  values: false,
  returnValue: 'receiver',
  // Recurse
  // ancestors: [],
  recurse: true,
  depth: 0, 
  maxDepth: 10,
  // Property Descriptors
  frozen: false,
  sealed: false,
  type: false,
  // Property Definitions
  typeCoercion: false,
  strict: true,
}