import { Deleters, Getters, Setters, TypeValidators, Returners  } from '../tensors/index.js'
const DefaultOptions = ($defaultOptions = {}) => Object({}, $defaultOptions)
const MutatorMethodOptions = ($mutatorOptions = {}) => Object.assign({ presetters: [], postsetters: [] }, $mutatorOptions)
const DefaultOptions = ($nonmutatorMethodOptions = {}) => Object.assign({}, $nonmutatorMethodOptions)
const AssignmentOption = ($propertyAssignment = {}) => Object.assign({
  primitive: 'assign', object: 'assign'
}, $propertyAssignment)
const AssignmentOptions = ($assignments = {}) => { return {
  object: AssignmentOption($assignments.object), 
  array: AssignmentOption($assignments.array), 
  map: AssignmentOption($assignments.map), 
  // set: { primitive: 'assign', object: 'assign' }, 
} }
const EntityOptions = ($entityOptions = {}) => Object.assign({
  enumerable: true, 
  nonenumerable: false,
  returnValue: 'receiver',
}, $entityOptions)
const MethodOptions = {
  map: {
    // Mutators
    get: MutatorMethodOptions(),
    set: MutatorMethodOptions(),
    delete: MutatorMethodOptions(),
  },
  array: {
    // Mutators
    concat: MutatorMethodOptions(),
    copyWithin: MutatorMethodOptions(),
    fill: MutatorMethodOptions({ lengthen: true }),
    pop: MutatorMethodOptions(),
    push: MutatorMethodOptions(),
    reverse: MutatorMethodOptions(),
    shift: MutatorMethodOptions(),
    splice: MutatorMethodOptions(),
    unshift: MutatorMethodOptions(),
  },
  object: {
    // Mutators
    assign: MutatorMethodOptions({
      sourceTree: true,
      targetTypedObjectLiteral: false,
      assignSources: MutatorMethodOptions(),
      assignSourceProperty: MutatorMethodOptions(),
      assignSourcePropertyKey: MutatorMethodOptions(),
    }),
    compand: MutatorMethodOptions({ values: false }),
    defineProperties: MutatorMethodOptions({
      descriptorTree: true,
    }),
    defineProperty: MutatorMethodOptions({ descriptorTree: true }),
    freeze: MutatorMethodOptions(),
    getOwnPropertyDescriptors: DefaultOptions({
      frozen: false, sealed: false, type: false, typeCoercion: false,
    }),
    isArrayLike: DefaultOptions({ strict: false }),
    isMapLike: DefaultOptions({ strict: false }),
    seal: MutatorMethodOptions(),
    toString: DefaultOptions({ space: 0, replacer: null }),
  },
  utilities: {
    typedObjectLiteral: DefaultOptions({ resemble: false }),
  },
}
const PathOptions = ($pathOptions = {}) => Object.assign({
  delimiter: '.',
  path: false,
  pathMatch: false,
  pathMatchMax: 100,
  pathParseInteger: false, 
}, $pathOptions)
const RecurseOptions = ($recurseOptions = {}) => Object.assign({
  ancestors: [].concat($recurseOptions.ancestors || []),
  depth: 0,
  recurse: true,
  maxDepth: 10,
})
const TensorOptions = ($tensorOptions = {}) => Object.assign({
  getters: [Getters.Object, Getters.Map, /* Getters.Set */],
  setters: [Setters.Object, Setters.Map, /* Setters.Set */],
  deleters: [Deleters.Object, Deleters.Map, /* Deleters.Set */],
  typeValidators: [TypeValidators.Object, TypeValidators.Map, /* TypeValidators.Set */],
  returners: [Returners.Object, Returners.Map, /* Returners.Set */],
}, $tensorOptions)

export default($options) => 

export default ($options = {}, $classGroup, $methodName) => Object.assign({
  get path() { return Object.defineProperty(this, 'path', {
    value: PathOptions($options.path)
  })['path'] },
  get tensors() { return Object.defineProperty(this, 'tensors', {
    value: TensorOptions($options.tensors)
  })['tensors'] },
  get recurse() { return Object.defineProperty(this, 'recurse', {
    value: RecurseOptions($options.recurse)
  })['recurse'] },
  get assignments() { return Object.defineProperty(this, 'assignments', {
    value: AssignmentOptions($options.assignments)
  })['assignments'] },
  get entities() { return Object.defineProperty(this, 'entities', {
    value: EntityOptions($options.entities)
  })['entities'] },
}, MethodOptions[$classGroup][$methodName]($options))