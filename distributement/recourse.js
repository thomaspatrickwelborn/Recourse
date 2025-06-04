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

var typeOf = ($operand) => Object
  .prototype
  .toString
  .call($operand).slice(8, -1).toLowerCase();

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
    for(const $subpath of subpaths) {
      subtarget[$subpath] = subtarget[$subpath] || (
        isNaN($subpath) ? {} : []
      );
      subtarget = subtarget[$subpath];
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

var index = /*#__PURE__*/Object.freeze({
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

const Options$9 = { enumerable: true, nonenumerable: true };
function numerableEntries($target, $options) {
  const _numerableEntries = [];
  const options = Object.assign({}, Options$9, $options);
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

const Options$8 = {
  depth: 0,
  maxDepth: 10,
  enumerable: true,
  nonenumerable: false,
  recurse: true,
};
function entities($target, $type, $options = {}) {
  const _entities = [];
  const options = Object.assign({}, Options$8, $options, {
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

const Options$7 = { ancestors: [], nonenumerable: false };
const ValidPathTypes = ['string', 'function'];
function expand($source, $path, $options = {}) {
  const options = Object.assign({}, Options$7, $options, {
    ancestors: [].concat($options.ancestors)
  });
  const { ancestors } = options;
  const typeOfPath = typeOf($path);
  const typeOfSource = typeOf($source);
  if(
    !ValidPathTypes.includes(typeOfPath) ||
    !ObjectKeys.includes(typeOfSource)
  ) { return $source }
  if(!ancestors.includes($source)) { ancestors.unshift($source); }
  let target = typedObjectLiteral($source);
  for(const [$sourceKey, $sourceValue] of entries(
    $source, Object.assign({}, options, { recurse: false })
  )) {
    const targetValue = (
      ObjectKeys.includes(typeOf($sourceValue))
    ) ? expand($sourceValue, $path) : $sourceValue;
    if(
      typeOfPath === ValidPathTypes[0] &&
      $sourceValue !== null &&
      !Object.is($sourceValue, $source) && 
      !ancestors.includes($sourceValue)
    ) {
      target[$sourceKey] = setProperty({}, $path, targetValue);
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue);
    }
  }
  return target
}

const Options$6 = {};
function impand($source, $property, $options) {
  const options = Object.assign({}, Options$6, $options);
  const typeOfProperty = typeOf($property);
  let target = typedObjectLiteral($source);
  for(const [$sourceKey, $sourceValue] of entries(
    $source, Object.assign({}, options, { recurse: false })
  )) {
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

var Options$5 = {
  accessors: [Accessors.default],
  ancestors: [],
  depth: 0,
  maxDepth: 10,
  nonenumerable: false, 
  values: false,
};

function compand($source, $options) {
  const target = [];
  const options = Object.assign({}, Options$5, $options, {
    ancestors: [].concat($options.ancestors)
  });
  const { accessors, ancestors, nonenumerable, values } = options;
  options.depth++;
  if(options.depth > options.maxDepth) { return target }
  iterateAccessors: 
  for(const $accessor of accessors) {
    const source = $accessor($source);
    if(!source) { continue iterateAccessors }
    if(!ancestors.includes(source)) { ancestors.unshift(source); }
    const objectProperties = entries(source, { nonenumerable, recurse: false });  
    for(const [$key, $value] of objectProperties) {
      if(!values) { target.push($key); }
      else if(values) { target.push([$key, $value]); }
      if(
        typeof $value === 'object' &&
        $value !== null &&
        !Object.is($value, source) && 
        !ancestors.includes($value)
      ) {
        const subsources = compand($value, options);
        if(!values) {
          for(const $subsource of subsources) {
            const path = [$key, $subsource].join('.');
            target.push(path);
          }
        }
        else if(values) {
          for(const [$subsourceKey, $subsource] of subsources) {
            const path = [$key, $subsourceKey].join('.');
            target.push([path, $subsource]);
          }
        }
      }
    }
  }
  return target
}

function decompand($source, $options) {
  const sourceEntries = (typeOf($source) === 'object') ? Object.entries($source) : $source;
  if(!sourceEntries) { return }
  const target = (isNaN(sourceEntries[0][0])) ? {} : [];
  for(const [$propertyPath, $propertyValue] of sourceEntries) {
    setProperty(target, $propertyPath, $propertyValue);
  }
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

const Options$4 = { strict: true };
var isArrayLike = ($source, $options) => {
  const options = Object.assign({}, Options$4, $options);
  let isArrayLike;
  const typeOfSource = typeOf($source);
  if(typeOfSource === 'array') { isArrayLike = true; }
  else if(
    typeOfSource === 'object' &&
    $source.length >= 0 && 
    Number.isInteger($source.length)
  ) {
    if(options.strict === false) {
      isArrayLike = true;
    }
    else {
      iterateSourceKeys: 
      for(const $sourceKey of entities($source, 'keys', {
        nonenumerable: true, recurse: false
      }).reverse()) {
        const lastIndex = Number($sourceKey);
        if(lastIndex === $source.length - 1) {
          isArrayLike = true;
          break iterateSourceKeys
        }
      }
      if(isArrayLike === undefined) { isArrayLike = false; }
    }
  }
  else { isArrayLike = false; }
  return isArrayLike
};

var Options$3 = {
  typeCoercion: false,
};

function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const propertyDescriptor = Object.assign({}, $propertyDescriptor);
  let propertyDescriptorValue = propertyDescriptor.value;
  const options = Object.assign({}, Options$3, $options);
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
  for(const [
    $propertyKey, $propertyDescriptor
  ] of Object.entries($propertyDescriptors)) {
    defineProperty($target, $propertyKey, $propertyDescriptor, $options);
  }
  return $target
}

const Options$2 = { ancestors: [] };
function freeze($target, $options) {
  const { ancestors } = Object.assign({}, Options$2, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  if(!options.ancestors.includes($target)) { options.ancestors.unshift($target); }
  iterateTargetProperties: 
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    const typeOfPropertyValue = typeOf($propertyValue);
    if(options.ancestors.includes($propertyValue)) { continue iterateTargetProperties }
    if(['array', 'object'].includes(typeOfPropertyValue)) {
      freeze($propertyValue, options);
    }
  }
  return Object.freeze($target)
}

const Options$1 = { ancestors: [] };
function seal($target, $options) {
  const { ancestors } = Object.assign({}, Options$1, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  if(!options.ancestors.includes($target)) { options.ancestors.unshift($target); }
  iterateTargetProperties: 
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    const typeOfPropertyValue = typeOf($propertyValue);
    if(options.ancestors.includes($propertyValue)) { continue iterateTargetProperties }
    if(['array', 'object'].includes(typeOfPropertyValue)) {
      seal($propertyValue, options);
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
  accessors: [Accessors.default],
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

function getOwnPropertyDescriptor($properties, $propertyKey, $options = {}) {
  const options = Object.assign({}, Options, $options, {
    ancestors: Object.assign([], $options.ancestors),
  });
  if(options.depth >= options.maxDepth) { return }
  else { options.depth++; }
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
  for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($target))) {
    const propertyDescriptor = getOwnPropertyDescriptor($target, $propertyKey, $options);
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
  static entities = entities
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

  constructor($target) {
    super();
    for(const [$staticMethodName, $staticMethod] of Object.entries({
      compand: Recourse.compand, decompand: Recourse.decompand, 
      expand: Recourse.expand, impand: Recourse.impand,
      keys: Recourse.keys, values: Recourse.values, entries: Recourse.entries, 
      entities: Recourse.entities, numerableEntries: Recourse.numerableEntries,
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

export { Recourse, assign, assignConcat, compand, decompand, defineProperties, defineProperty, deleteProperty, entities, entries, expand, freeze, getOwnPropertyDescriptor, getOwnPropertyDescriptors, getProperty, impand, isArrayLike, keys, numerableEntries, regularExpressions, seal, setProperty, typeOf, typedObjectLiteral, values, index as variables };
//# sourceMappingURL=recourse.js.map
