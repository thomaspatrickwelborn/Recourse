import { Deleters, Getters, Setters, TypeValidators, Returners  } from '../tensors/index.js'
const AssignmentClassOptions = ($propertyAssignment = {}) => {
  return (typeof $propertyAssignment === 'string')
    ? { primitive: $propertyAssignment, object: $propertyAssignment }
    : Object.assign({ primitive: 'assign', object: 'assign' }, $propertyAssignment)
}
const AssignmentOptions = ($assignments = {}) => { return {
  object: AssignmentClassOptions($assignments.object), 
  array: AssignmentClassOptions($assignments.array), 
  map: AssignmentClassOptions($assignments.map), 
  // set: { primitive: 'assign', object: 'assign' }, 
} }
const EntityOptions = ($entityOptions = {}) => Object.assign({
  enumerable: true, nonenumerable: false, returnValue: 'receiver'
}, $entityOptions)
const PathOptions = ($pathOptions = {}) => Object.assign({
  delimiter: '.', pathMatch: false, 
  pathMatchMax: 100, pathParseInteger: false, 
}, $pathOptions)
const RecurseOptions = ($recurseOptions = {}) => (typeof $recurseOptions === 'boolean') ? {
  ancestors: [], depth: 0, maxDepth: 10, recurse: $recurseOptions
} : Object.assign({
  // ancestors: [].concat($recurseOptions.ancestors || []),
  depth: 0, maxDepth: 10, recurse: true,
}, $recurseOptions, {
  ancestors: [].concat($recurseOptions.ancestors || [])
})
const TensorOptions = ($tensorOptions = {}) => Object.assign({
  getters: [Getters.Object, Getters.Map, /* Getters.Set */],
  setters: [Setters.Object, Setters.Map, /* Setters.Set */],
  deleters: [Deleters.Object, Deleters.Map, /* Deleters.Set */],
  typeValidators: [TypeValidators.Object, TypeValidators.Map, /* TypeValidators.Set */],
  returners: [Returners.Object, Returners.Map, /* Returners.Set */],
}, $tensorOptions)
const MethodOptions = {
  map: {
    get: {}, set: {}, delete: {},
  },
  array: {
    concat: {}, copyWithin: {}, fill: { lengthen: true }, pop: {}, 
    push: {}, reverse: {}, shift: {}, splice: {}, unshift: {},
  },
  object: {
    assign: { targetTypedObjectLiteral: false },
    compand: { values: false }, defineProperties: {}, defineProperty: {}, 
    entities: {}, entries: {}, freeze: {},
    getOwnPropertyDescriptors: {
      frozen: false, propertyPath: false, 
      sealed: false, type: false, typeCoercion: false, 
    },
    isArrayLike: { strict: false }, isMapLike: { strict: false },
    keys: {}, seal: {}, toString: { space: 0, replacer: null }, values: {},
  },
  utilities: {
    typedObjectLiteral: { resemble: false },
  },
}
class Defaults {
  #options
  constructor($options = {}) {
    this.#options = $options
  }
  get path() { return Object.defineProperty(this, 'path', {
    value: PathOptions(this.#options.path)
  })['path'] }
  set path($path) { return this.path }
  get tensors() { return Object.defineProperty(this, 'tensors', {
    value: TensorOptions(this.#options.tensors)
  })['tensors'] }
  set tensors($tensors) { return this.tensors }
  get recurse() { return Object.defineProperty(this, 'recurse', {
    writable: true, value: RecurseOptions(this.#options.recurse)
  })['recurse'] }
  set recurse($recurse) { return Object.assign(this.recurse, $recurse) }
  get assignments() { return Object.defineProperty(this, 'assignments', {
    value: AssignmentOptions(this.#options.assignments)
  })['assignments'] }
  set assignments($assignments = {}) { return Object.assign(this.assignments, $assignments) }
  get entities() { return Object.defineProperty(this, 'entities', {
    value: EntityOptions(this.#options.entities)
  })['entities'] }
  set entities($entities = {}) { return Object.assign(this.entities, $entities) }
}
function Options($classGroup, $methodName, $options) {
  const methodOptions = MethodOptions[$classGroup][$methodName]
  const defaultOptions = new Defaults($options)
  return Object.assign(defaultOptions, methodOptions, $options)
}
export { Defaults, Options }