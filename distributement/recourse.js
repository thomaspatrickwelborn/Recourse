var regularExpressions = {
  quotationEscape: /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/,
};

function getProperty() {
  const [$target, $path] = [...arguments];
  if($path === undefined) return arguments[0]
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
  let subtarget = $target;
  for(const $subpath of subpaths) {
    try { subtarget = subtarget[$subpath]; }
    catch($err) { subtarget = undefined; }
  }
  return subtarget
}

var typeOf = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

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

function setProperty() {
  const $target = arguments[0];
  const properties = (typeOf(arguments[1]) === 'string')
    ? { [arguments[1]]: arguments[2] }
    : arguments[1];
  for(const [$path, $value] of Object.entries(properties)) {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
    const key = subpaths.pop();
    let subtarget = $target;
    let subpathIndex = 0;
    while(subpathIndex < subpaths.length) {
      const $subpath = subpaths[subpathIndex];
      if(isNaN($subpath)) { subtarget[$subpath] = {}; }
      else { subtarget[$subpath] = {}; }
      subtarget = subtarget[$subpath];
      subpathIndex++;
    }
    subtarget[key] = $value;
  }
  return $target
}

function deleteProperty($target, $path) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
  const key = subpaths.pop();
  let subtarget = $target;
  for(const $subpath of subpaths) { subtarget = subtarget[$subpath]; }
  delete subtarget[key];
  return
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

const ValidPathTypes = ['string', 'function'];
function expand($source, $path) {
  const typeOfPath = typeOf($path);
  const typeOfSource = typeOf($source);
  if(
    !ValidPathTypes.includes(typeOfPath) ||
    !ObjectKeys.includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral($source);
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    const targetValue = (
      ObjectKeys.includes(typeOf($sourceValue))
    ) ? expand($sourceValue, $path) : $sourceValue;
    if(typeOfPath === ValidPathTypes[0]) {
      target[$sourceKey] = setProperty({}, $path, targetValue);
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue);
    }
  }
  return target
}

function impand($source, $property) {
  const typeOfProperty = typeOf($property);
  let target = typedObjectLiteral($source);
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    if(typeOfProperty === 'string') { target[$sourceKey] = getProperty($sourceValue, $property); }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue); }
    if(target[$sourceKey] && typeof target[$sourceKey] === 'object') {
      target[$sourceKey] = impand(target[$sourceKey], $property);
    }
  }
  return target
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
  recurse: true,
};
function entities($target, $type, $options) {
  const _entities = [];
  const options = Object.assign({}, Options$3, $options, {
    ancestors: [].concat($options.ancestors)
  });
  const { ancestors, maxDepth, nonenumerable, recurse } = options;
  if(options.depth >= maxDepth) { return _entities }
  options.depth++;
  if(!ancestors.includes($target)) { ancestors.push($target); }
  for(const [$key, $value] of numerableEntries($target, {
    enumerable: true, nonenumerable
  })) {
    const typeOfValue = typeOf($value);
    if(
      recurse && 
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
  accessors: [Accessors.default],
  ancestors: [],
  depth: 0,
  maxDepth: 10,
  nonenumerable: false, 
  values: false,
};
function compand($target, $options) {
  const compandTree = [];
  const options = Object.assign({}, Options$2, $options, {
    ancestors: [].concat($options.ancestors)
  });
  const { accessors, ancestors, nonenumerable, values } = options;
  options.depth++;
  if(options.depth > options.maxDepth) { return compandTree }
  iterateAccessors: 
  for(const $accessor of accessors) {
    const target = $accessor($target);
    if(!target) { continue iterateAccessors }
    if(!ancestors.includes(target)) { ancestors.unshift(target); }
    const objectProperties = entries(target, { nonenumerable, recurse: false });  
    for(const [$key, $value] of objectProperties) {
      if(!values) { compandTree.push($key); }
      else if(values) { compandTree.push([$key, $value]); }
      if(
        typeof $value === 'object' &&
        $value !== null &&
        !Object.is($value, target) && 
        !ancestors.includes($value)
      ) {
        const subtargets = compand($value, options);
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

function decompand($target, $options) {
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
  subtarget[key] = $target;
  return target
}

function assignSources($target, $type, ...$sources) {
  if(!$target) { return $target}
  const typeOfTarget = typeOf($target);
  iterateSources: 
  for(const $source of $sources) {
    if(!$source) continue iterateSources
    for(const [
      $sourcePropertyKey, $sourcePropertyValue
    ] of Object.entries($source)) {
      const targetPropertyValue = $target[$sourcePropertyKey];
      const typeOfTargetPropertyValue = typeOf(targetPropertyValue);
      typeOf($sourcePropertyValue);
      if(typeOfTarget === 'array' && $type === 'assignConcat') {
        $target.push($sourcePropertyValue);
      }
      else {
        if(['array', 'object'].includes(typeOfTargetPropertyValue)) {
          assignSources(targetPropertyValue, $type, $sourcePropertyValue);
        }
        else {
          Object.assign($target, { [$sourcePropertyKey]: $sourcePropertyValue });
        }
      }
    }
  }
  return $target
}

function assign($target, ...$sources) {
  return assignSources($target, 'assign', ...$sources)
}

function assignConcat($target, ...$sources) {
  return assignSources($target, 'assignConcat', ...$sources)
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

var Options$1 = {
  typeCoercion: false,
};

function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const propertyDescriptor = Object.assign({}, $propertyDescriptor);
  let propertyDescriptorValue = propertyDescriptor.value;
  const options = Object.assign({}, Options$1, $options);
  const typeOfPropertyDescriptorValue = typeOf(propertyDescriptor.value);
  const targetPropertyValue = $target[$propertyKey];
  const typeOfTargetPropertyValue = typeOf(targetPropertyValue);
  const validObjects = ['array', 'object'];
  if(validObjects.includes(typeOfPropertyDescriptorValue)) {
    if(validObjects.includes(typeOfTargetPropertyValue)) {
      propertyDescriptor.value = defineProperties(targetPropertyValue, propertyDescriptorValue, options);
    }
    else {
      const propertyValueTarget = typedObjectLiteral(isArrayLike(
        Object.defineProperties({}, propertyDescriptorValue)
      ) ? 'array' : 'object');
      propertyDescriptor.value = defineProperties(propertyValueTarget, propertyDescriptorValue, options);
    }
  }
  else if(
    options.typeCoercion && 
    Object.getOwnPropertyDescriptor(propertyDescriptor, 'type') !== undefined &&
    !['undefined', 'null'].includes(typeOfPropertyDescriptorValue)
  ) {
    propertyDescriptor.value = Primitives[propertyDescriptor.type](propertyDescriptorValue);
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

function freeze($target) {
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    if(Object.is($propertyValue, $target)) { continue }
    if($propertyValue && typeof $propertyValue === 'object') {
      freeze($propertyValue);
    }
  }
  return Object.freeze($target)
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
    options.path = (
      typeOf(options.path) === 'string'
    ) ? [options.path, $propertyKey].join(options.delimiter) : $propertyKey;
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

function getOwnPropertyDescriptors($target, $options) {
  const propertyDescriptors = {};
  const options = Object.assign({}, Options, $options);
  if(options.depth >= options.maxDepth) { return propertyDescriptors }
  else { options.depth++; }
  for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($target))) {
    const propertyDescriptor = getOwnPropertyDescriptor($target, $propertyKey, options);
    if(propertyDescriptor) { propertyDescriptors[$propertyKey] = propertyDescriptor; }
  }
  return propertyDescriptors
}

class Recourse extends EventTarget {
  static compand = compand
  static decompand = decompand
  static expand = expand
  static impand = impand

  static keys = keys
  static values = values
  static entries = entries
  static numerableEntries = numerableEntries

  static get = getProperty
  static set = setProperty
  static delete = deleteProperty

  static assign = assign
  static assignConcat = assignConcat

  static defineProperties = defineProperties
  static defineProperty = defineProperty

  static freeze = freeze
  static seal = seal

  static getOwnPropertyDescriptors = getOwnPropertyDescriptors
  static getOwnPropertyDescriptor = getOwnPropertyDescriptor

  static isArrayLike = isArrayLike
  static typeOf = typeOf

  static typedObjectLiteral = typedObjectLiteral
  static regularExpressions = regularExpressions
  static variables = variables

  constructor($target) {
    super();
    for(const [$staticMethodName, $staticMethod] of Object.entries({
      compand: Recourse.compand, decompand: Recourse.decompand, expand: Recourse.expand, impand: Recourse.impand,
      keys: Recourse.keys, values: Recourse.values, entries: Recourse.entries, numerableEntries: Recourse.numerableEntries,
      get: Recourse.get, set: Recourse.set, delete: Recourse.delete,
      assign: Recourse.assign, assignConcat: Recourse.assignConcat, 
      defineProperties: Recourse.defineProperties, defineProperty: Recourse.defineProperty,
      freeze: Recourse.freeze, seal: Recourse.seal,
      getOwnPropertyDescriptors: Recourse.getOwnPropertyDescriptors, getOwnPropertyDescriptor: Recourse.getOwnPropertyDescriptor,
      isArrayLike: Recourse.isArrayLike, typeOf: Recourse.typeOf,
    })) {
      Object.defineProperty(this, $staticMethodName, {
        value: $staticMethod.bind(this, $target)
      });
    }
  }
}

export { Recourse as default };
//# sourceMappingURL=recourse.js.map
