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
const RecurseOptions = ($recurseOptions = {}) => { 
  return Object.assign({ depth: 0, maxDepth: 10 }, $recurseOptions, {
    ancestors: [].concat($recurseOptions.ancestors || [])
  })
}
const TensorOptions = ($tensorOptions = {}) => Object.assign({
  getters: $tensorOptions.getters || [Getters.Object, Getters.Map, /* Getters.Set */],
  setters: $tensorOptions.setters || [Setters.Object, Setters.Map, /* Setters.Set */],
  deleters: $tensorOptions.deleters || [Deleters.Object, Deleters.Map, /* Deleters.Set */],
  typeValidators: $tensorOptions.typeValidators || [TypeValidators.Object, TypeValidators.Map, /* TypeValidators.Set */],
  returners: $tensorOptions.returners || [Returners.Object, Returners.Map, /* Returners.Set */],
})
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
    keys: {}, seal: {}, toString: { space: 0, replacer: null }, valueOf: {},
  },
  utilities: {
    typedObjectLiteral: { resemble: false },
  },
}
const Defaults = ($options) => Object.assign($options, {
  assignments: AssignmentOptions($options.assignments),
  entities: EntityOptions($options.entities),
  path: PathOptions($options.path),
  recurse: RecurseOptions($options.recurse),
  tensors: TensorOptions($options.tensors),
})
function Options($classGroup, $methodName, $options) {
  const methodOptions = MethodOptions[$classGroup][$methodName]
  const defaultOptions = Defaults($options)
  const options = Object.assign(defaultOptions, methodOptions, $options)
  return Object.assign({}, options)
}
export { Defaults, Options }