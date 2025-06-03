var typeOf = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function assignSources($target, $type, ...$sources) {
  if(!$target) { return $target}
  iterateSources: 
  for(const $source of $sources) {
    if(!$source) continue iterateSources
    for(const [
      $sourcePropertyKey, $sourcePropertyValue
    ] of Object.entries($source)) {
      const typeOfTargetPropertyValue = typeOf($target[$sourcePropertyKey]);
      const typeOfSourcePropertyValue = typeOf($sourcePropertyValue);
      if( 
        typeOfTargetPropertyValue === 'object' &&
        typeOfSourcePropertyValue === 'object'
      ) {
        $target[$sourcePropertyKey] = assignConcat($target[$sourcePropertyKey], $sourcePropertyValue);
      }
      else if(
        $type === 'assignConcat' &&
        typeOfTargetPropertyValue === 'array' &&
        typeOfSourcePropertyValue === 'array'
      ) {
        $target[$sourcePropertyKey] = $target[$sourcePropertyKey].concat($sourcePropertyValue);
      }
      else {
        $target[$sourcePropertyKey] = $sourcePropertyValue;
      }
    }
  }
  return $target
}

function assign($target, ...$sources) {
  return assignSources($target, 'assign', ...$sources)
}

function assignConcat$1($target, ...$sources) {
  return assignSources($target, 'assignConcat', ...$sources)
}

const defaultAccessor = ($target, $property) => {
  if($property === undefined) { return $target }
  else { return $target[$property] }
};
var Accessors = {
  default: defaultAccessor};

const Options$4 = { enumerable: true, nonenumerable: true };
function numerableEntries($target, $options) {
  const _numerableEntries = [];
  const options = Object.assign({}, Options$4, $options);
  const { enumerable, nonenumerable } = options;
  if(!enumerable && !nonenumerable) return []
  const propertyDescriptors = Object.getOwnPropertyDescriptors($target);
  for(const [$property, $propertyDescriptor] of Object.entries(propertyDescriptors)) {
    if(
      enumerable && $propertyDescriptor.enumerable ||
      nonenumerable && !$propertyDescriptor.enumerable
    ) { _numerableEntries.push([$property, $propertyDescriptor.value]); }
  }
  return _numerableEntries
}

const Options$3 = {
  depth: 0,
  maxDepth: 10,
  enumerable: true,
  nonenumerable: false,
};
function entities($target, $type, $options) {
  const _entities = [];
  const options = Object.assign({}, Options$3, $options, {
    ancestors: [].concat($options.ancestors)
  });
  const { ancestors, maxDepth, nonenumerable } = options;
  if(options.depth >= maxDepth) { return _entities }
  options.depth++;
  if(!ancestors.includes($target)) { ancestors.push($target); }
  for(const [$key, $value] of numerableEntries($target, {
    enumerable: true, nonenumerable
  })) {
    const typeOfValue = typeOf($value);
    if(
      ['array', 'object'].includes(typeOfValue) && 
      !ancestors.includes($value)
    ) {
      if($type === 'entries') { _entities.push([$key, entities($value, $type, options)]); }
      else if($type === 'values') { _entities.push(entities($value, $type, options)); }
      else if($type === 'keys') { _entities.push($key, entities($value, $type, options)); }
    }
    else {
      if($type === 'entries') { _entities.push([$key, $value]); }
      else if($type === 'values') { _entities.push($value); }
      else if($type === 'keys') { _entities.push($key); }
    }
  }
  return _entities
}

function entries($target, $options) {
  return entities($target, 'entries', $options)
}

const Options$2 = {
  depth: 0,
  maxDepth: 10,
  accessors: [Accessors.default],
  ancestors: [],
  values: false,
  nonenumerable: false,
};
function CompandTree($target, $options) {
  const compandTree = [];
  const options = Object.assign({}, Options$2, $options, {
    ancestors: [].concat($options.ancestors)
  });
  const { accessors, ancestors, nonenumerable, values } = options;
  options.depth++;
  if(options.depth > maxDepth) { return compandTree }
  iterateAccessors: 
  for(const $accessor of accessors) {
    const target = $accessor($target);
    if(!target) { continue iterateAccessors }
    if(!ancestors.includes(target)) { ancestors.unshift(target); }
    const objectProperties = entries(target, { nonenumerable: nonenumerable });  
    for(const [$key, $value] of objectProperties) {
      if(!values) { compandTree.push($key); }
      else if(values) { compandTree.push([$key, $value]); }
      if(
        typeof $value === 'object' &&
        $value !== null &&
        !Object.is($value, target) && 
        !ancestors.includes($value)
      ) {
        const subtargets = CompandTree($value, options);
        if(!values) {
          for(const $subtarget of subtargets) {
            const path = [$key, $subtarget].join('.');
            compandTree.push(path);
          }
        }
        else if(values) {
          for(const [$subtargetKey, $subtarget] of subtargets) {
            const path = [$key, $subtargetKey].join('.');
            compandTree.push([path, $subtarget]);
          }
        }
      }
    }
  }
  return compandTree
}

var regularExpressions$1 = {
  quotationEscape: /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/,
};

function decompandTree($target, $options) {
  const subpaths = $path.split(new RegExp(regularExpressions$1.quotationEscape));
  const key = subpaths.pop();
  const target = (key && !isNaN(key)) ? [] : {};
  let subtarget = target;
  let subpathIndex = 0;
  while(subpathIndex < subpaths.length - 2) {
    const $subpath = keypaths[subpathIndex];
    if(isNaN($subpath)) { subtarget[$subpath] = {}; }
    else { subtarget[$subpath] = {}; }
    subtarget = subtarget[$subpath];
    subpathIndex++;
  }
  subtarget[key] = $target;
  return target
}

var isArrayLike = ($source) => {
  let isArrayLike;
  const typeOfSource = typeOf($source);
  if(typeOfSource === 'array') { isArrayLike = true; }
  else if(
    typeOfSource === 'object' &&
    Number.isInteger($source.length) && $source.length >= 0
  ) {
    iterateSourceKeys: 
    for(const $sourceKey of Object.keys(
      Object.getOwnPropertyDescriptors($source)
    )) {
      if($sourceKey === 'length') { continue iterateSourceKeys }
      isArrayLike = !isNaN($sourceKey);
      if(!isArrayLike) { break iterateSourceKeys }
    }
  }
  else { isArrayLike = false; }
  return isArrayLike
};

function typedObjectLiteral($value) {
  let _typedObjectLiteral;
  const typeOfValue = typeOf($value);
  if(typeOfValue === 'string') {
    const value = $value.toLowerCase();
    if(value === 'object') { _typedObjectLiteral = {}; }
    else if(value === 'array') { _typedObjectLiteral = []; }
  }
  else  {
    if(typeOfValue === 'object') { _typedObjectLiteral = {}; }
    else if(typeOfValue === 'array') { _typedObjectLiteral = []; }
  }
  return _typedObjectLiteral
}

const Primitives = {
  'string': String, 
  'number': Number, 
  'boolean': Boolean, 
  'bigint': BigInt,
  'undefined': undefined,
  'null': null,
};
const PrimitiveKeys = Object.keys(Primitives);
const PrimitiveValues = Object.values(Primitives);
const Objects = {
  'object': Object,
  'array': Array,
};
const ObjectKeys = Object.keys(Objects);
const ObjectValues = Object.values(Objects);
const Types = Object.assign({}, Primitives, Objects);
const TypeKeys = Object.keys(Types);
const TypeValues = Object.values(Types);
const TypeMethods = [
 Primitives.String, Primitives.Number, Primitives.Boolean, 
 Objects.Object, Objects.Array
];

var variables = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ObjectKeys: ObjectKeys,
  ObjectValues: ObjectValues,
  Objects: Objects,
  PrimitiveKeys: PrimitiveKeys,
  PrimitiveValues: PrimitiveValues,
  Primitives: Primitives,
  TypeKeys: TypeKeys,
  TypeMethods: TypeMethods,
  TypeValues: TypeValues,
  Types: Types
});

var Options$1 = {
  typeCoercion: false,
};

function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const propertyDescriptor = Object.assign({}, $propertyDescriptor);
  const options = Object.assign({}, Options$1, $options);
  const typeOfPropertyValue = typeOf(propertyDescriptor.value);
  if(['array', 'object'].includes(typeOfPropertyValue)) {
    const propertyValue = isArrayLike(Object.defineProperties(
      typedObjectLiteral(typeOfPropertyValue), propertyDescriptor.value
    )) ? [] : {};
    propertyDescriptor.value = defineProperties(propertyValue, propertyDescriptor.value, options);
  }
  else if(
    options.typeCoercion && 
    Object.getOwnPropertyDescriptor(propertyDescriptor, 'type') !== undefined &&
    !['undefined', 'null'].includes(typeOfPropertyValue)
  ) {
    propertyDescriptor.value = Primitives[propertyDescriptor.type](propertyDescriptor.value);
  }
  Object.defineProperty($target, $propertyKey, propertyDescriptor);
  if($propertyDescriptor.sealed) { Object.seal($target[$propertyKey]); }
  if($propertyDescriptor.frozen) { Object.freeze($target[$propertyKey]); }
  return $target
}

function defineProperties($target, $propertyDescriptors, $options) {
  const options = Object.assign({}, Options$1, $options);
  for(const [
    $propertyKey, $propertyDescriptor
  ] of Object.entries($propertyDescriptors)) {
    defineProperty($target, $propertyKey, $propertyDescriptor, options);
  }
  return $target
}

function setTreeNode($target, $path, $value) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
  const key = subpaths.pop();
  const target = (key && !isNaN(key)) ? [] : {};
  let subtarget = target;
  let subpathIndex = 0;
  while(subpathIndex < subpaths.length - 2) {
    const $subpath = keypaths[subpathIndex];
    if(isNaN($subpath)) { subtarget[$subpath] = {}; }
    else { subtarget[$subpath] = {}; }
    subtarget = subtarget[$subpath];
    subpathIndex++;
  }
  subtarget[key] = $value;
  return target
}

const ValidPropertyTypes = ['string', 'function'];
function expandTree($target, $property) {
  const typeOfProperty = typeOf($property);
  const typeOfTarget = typeOf($target);
  if(
    !ValidPropertyTypes.includes(typeOfProperty) ||
    !ObjectKeys.includes(typeOfTarget)
  ) { return $target }
  let target = typedObjectLiteral($target);
  for(const [$targetKey, $targetValue] of Object.entries($target)) {
    const targetValue = (
      ObjectKeys.includes(typeOf($targetValue))
    ) ? expandTree($targetValue, $property) : $targetValue;
    if(typeOfProperty === ValidPropertyTypes[0]) {
      target[$targetKey] = setTreeNode($property, targetValue);
    }
    else if(typeOfProperty === ValidPropertyTypes[1]) {
      target[$targetKey] = $property(targetValue);
    }
  }
  return target
}

function freeze($target) {
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    if(Object.is($propertyValue, $target)) { continue }
    if($propertyValue && typeof $propertyValue === 'object') {
      freeze($propertyValue);
    }
  }
  return Object.freeze($target)
}

function getTreeNode($target, $path) {
  const subpaths = $path.split(new RegExp(regularExpressions$1.quotationEscape));
  const key = subpaths.pop();
  let subtarget = $target;
  for(const $subpath of subpaths) { subtarget = subtarget[$subpath]; }
  return subtarget[key]
}

function impandTree($target, $property) {
  const typeOfProperty = typeOf($property);
  const typeOfTarget = typeOf($target);
  if(
    !['string', 'function'].includes(typeOfProperty) ||
    !['array', 'object'].includes(typeOfTarget)
  ) { return $target }
  let target = typedObjectLiteral($target);
  for(const [$targetKey, $targetValue] of Object.entries($target)) {
    if(typeOfProperty === 'string') { target[$targetKey] = Tree.getTreeNode($property, $targetValue); }
    else if(typeOfProperty === 'function') { target[$targetKey] = $property($targetValue); }
    if(target[$targetKey] && typeof target[$targetKey] === 'object') {
      target[$targetKey] = impandTree(target[$targetKey], $property);
    }
  }
  return target
}

var Options = {
  ancestors: [],
  delimiter: '.',
  depth: 0,
  frozen: false,
  maxDepth: 10,
  nonenumerable: true,
  path: false,
  sealed: false,
  type: false,
};

function getOwnPropertyDescriptor($properties, $propertyKey, $options) {
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const propertyDescriptor = Object.getOwnPropertyDescriptor($properties, $propertyKey);
  if(!options.nonenumerable && !propertyDescriptor.enumerable) { return }
  if(!options.ancestors.includes($properties)) { options.ancestors.unshift($properties); }
  if(options.ancestors.includes(propertyDescriptor.value)) { return }
  if(options.path) {
    options.path = (typeOf(options.path) === 'string') ? [options.path, $propertyKey].join(options.delimiter) : $propertyKey;
    propertyDescriptor.path = options.path;
  }
  if(options.type) { propertyDescriptor.type = typeOf(propertyDescriptor.value); }
  if(options.frozen) { propertyDescriptor.frozen = Object.isFrozen(propertyDescriptor.value); }
  if(options.sealed) { propertyDescriptor.sealed = Object.isSealed(propertyDescriptor.value); }
  if(['array', 'object'].includes(typeOf(propertyDescriptor.value))) {
    propertyDescriptor.value = getOwnPropertyDescriptors(propertyDescriptor.value, options);
  }
  return propertyDescriptor
}

function getOwnPropertyDescriptors($properties, $options) {
  const propertyDescriptors = {};
  const options = Object.assign({}, Options, $options);
  if(options.depth >= options.maxDepth) { return propertyDescriptors }
  else { options.depth++; }
  for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($properties))) {
    const propertyDescriptor = getOwnPropertyDescriptor($properties, $propertyKey, options);
    if(propertyDescriptor !== undefined) { propertyDescriptors[$propertyKey] = propertyDescriptor; }
  }
  return propertyDescriptors
}

function seal($target) {
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    if(Object.is($propertyValue, $target)) { continue }
    if($propertyValue && typeof $propertyValue === 'object') {
      seal($propertyValue);
    }
  }
  return Object.seal($target)
}

function keys($target, $options) {
  return entities($target, 'keys', $options)
}

function values($target, $options) {
  return entities($target, 'values', $options)
}

class Recourse extends EventTarget {
  static compand = CompandTree
  static decompand = decompandTree
  static expand = expandTree
  static impand = impandTree

  static keys = keys
  static values = values
  static entries = entries
  static numerableEntries = numerableEntries

  static get = getTreeNode
  static set = setTreeNode
  static delete = getTreeNode

  static assign = assign
  static assignConcat = assignConcat$1

  static defineProperties = defineProperties
  static defineProperty = defineProperty

  static freeze = freeze
  static seal = seal

  static getOwnPropertyDescriptors = getOwnPropertyDescriptors
  static getOwnPropertyDescriptor = getOwnPropertyDescriptor

  static isArrayLike = isArrayLike
  static typeOf = typeOf

  static typedObjectLiteral = typedObjectLiteral
  static regularExpressions = regularExpressions$1
  static variables = variables

  constructor($target) {
    super();
    const typeOfTarget = typeOf($target);
    const target = typedObjectLiteral(typeOfTarget);
    for(const $staticMethod of [
      Recourse.compand, Recourse.decompand, Recourse.expand, Recourse.impand,
      Recourse.keys, Recourse.values, Recourse.entries, Recourse.numerableEntries,
      Recourse.get, Recourse.set, Recourse.delete,
      Recourse.assign, Recourse.assignConcat, 
      Recourse.defineProperties, Recourse.defineProperty,
      Recourse.freeze, Recourse.seal,
      Recourse.getOwnPropertyDescriptors, Recourse.getOwnPropertyDescriptor,
      Recourse.isArrayLike, Recourse.typeOf,
    ]) {
      Object.defineProperty(this, $staticMethod.name, {
        value: $staticMethod.bind(this, target)
      });
    }
  }
}

export { Recourse as default };
//# sourceMappingURL=recourse.js.map
