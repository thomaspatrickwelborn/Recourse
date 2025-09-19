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
  const ancestors = [].concat($recurseOptions.ancestors || [])
  const maxDepth = ($recurseOptions.maxDepth) ? $recurseOptions.maxDepth : 10
  let depth = ($recurseOptions.depth) ? $recurseOptions.depth : 0
  return Object.assign(Object.defineProperties({}, {
    ancestors: {
      enumerable: true,
      get() { return ancestors },
      set($ancestor) {
        if($ancestor && typeof $ancestor === 'object') {
          if(ancestors.includes($ancestor)) {
            throw new Error(null)
          }
          else { ancestors.unshift($ancestor) }
        }
      },
    },
    depth: {
      enumerable: true,
      get() { return depth },
      set($depth) {
        if($depth <= maxDepth) { depth = ($depth === undefined) ? depth : $depth }
        else { throw new Error(null) }
      }
    }
  }), $recurseOptions, { depth, maxDepth })
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
    get: {}, set: {}, delete: {}, isMapLike: { strict: false },
  },
  array: {
    concat: {}, copyWithin: {}, fill: { lengthen: true }, pop: {}, 
    push: {}, reverse: {}, shift: {}, splice: {}, unshift: {},
    isArrayLike: { strict: false }, 
  },
  object: {
    assign: { targetTypedObjectLiteral: false },
    compand: { values: false }, defineProperties: {}, defineProperty: {}, 
    entities: {}, entries: {}, freeze: {},
    getOwnPropertyDescriptors: {
      frozen: false, propertyPath: false, 
      sealed: false, type: false, typeCoercion: false, 
    },
    keys: {}, seal: {}, toString: { space: 0, replacer: null }, valueOf: {},
  },
  utilities: {
    typedObjectLiteral: { resemble: false },
  },
}
const Defaults = ($options) => {
  $options = ($options) ? $options : {}
  Object.assign($options, {
    assignments: AssignmentOptions($options.assignments),
    entities: EntityOptions($options.entities),
    path: PathOptions($options.path),
    recurse: RecurseOptions($options.recurse),
    tensors: TensorOptions($options.tensors),
  })
  return $options
}
function Options($classGroup, $methodName, $options) {
  const methodOptions = MethodOptions[$classGroup][$methodName]
  const defaultOptions = Defaults($options)
  const options = Object.assign(defaultOptions, methodOptions, $options)
  return Object.assign({}, options)
}
export { Defaults, Options }