function splitPath($path) {
  const subpathDelimiters = /([a-zA-Z_][a-zA-Z0-9_]*)|(\d+)|\["([^"]*)"\]|"([^"]*)"|\./g;
  const subpaths = [];
  let match;
  while((match = subpathDelimiters.exec($path)) !== null) {
    if(match[1]) { subpaths.push(match[1]); }
    else if(match[2]) { subpaths.push(parseInt(match[2], 10)); }
    else if(match[3]) { subpaths.push(match[3]); }
    else if(match[4]) { subpaths.push(match[4]); }
  }
  return subpaths
}

var typeOf = ($operand) => Object
  .prototype
  .toString
  .call($operand).slice(8, -1).toLowerCase();

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
  'eventTarget': EventTarget,
  'map': Map,
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

var index$1 = /*#__PURE__*/Object.freeze({
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

// Object Getter
function Getter$1(...$arguments) {
  if(![
    'object', 'array', 'eventtarget'
  ].includes(typeOf($arguments[0]))) { throw new Error() }
  else if($arguments.length === 1) {
    const [$target] = $arguments;
    return $target
  }
  else {
    const [$target, $property] = $arguments;
    return $target[$property]
  }
}
// Object Setter
function Setter$1(...$arguments) {
  if(![
    'object', 'array', 'eventtarget'
  ].includes(typeOf($arguments[0]))) { throw new Error() }
  else if(['string', 'number'].includes(typeOf($arguments[1]))) {
    const [$target, $property, $value] = $arguments;
    $target[$property] = $value;
    return $target[$property]
  }
  else {
    const [$target, $source] = $arguments;
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey];
    }
    for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
      $target[$sourceKey] = $sourceValue;
    }
    return $target
  }
}
// Object Deleter
function Deleter$1(...$arguments) {
  const [$target, $property] = $arguments;
  if(![
    'object', 'array', 'eventtarget'
  ].includes(typeOf($target))) { throw new Error() }
  else if(['string', 'number'].includes(typeOf($property))) {
    return delete $target[$property]
  }
  else {
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey];
    }
    return undefined
  }
}

// Map Getter
function Getter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { throw new Error() }
  else if($arguments.length === 1) {
    let [$receiver] = $arguments;
    // return Object.fromEntries($receiver)
    return $receiver
  }
  else {
    let [$receiver, $property] = $arguments;
    return $receiver.get($property)
  }
}
// Map Setter
function Setter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { throw new Error() }
  else if($arguments.length === 2) {
    let [$receiver, $source] = $arguments;
    $receiver.clear();
    for(const [$sourceKey, $sourceValue] of Object.entries(source)) {
      $receiver.set($sourceKey, $sourceValue);
    }
    return $receiver
  }
  else {
    let [$receiver, $property, $value] = $arguments;
    $receiver.set($property, $value);
    return $receiver.get($property)
  }
}
// Map Deleter
function Deleter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { throw new Error() }
  else if($arguments`.length` === 2) {
    let [$receiver, $property] = $arguments;
    return $receiver.delete($property)
  }
  else {
    let [$receiver] = $arguments;
    return $receiver.clear()
  } 
}

const Getters = {
  Object: Getter$1, 
  Map: Getter, 
};
const Setters = {
  Object: Setter$1, 
  Map: Setter, 
};
const Deleters = {
  Object: Deleter$1, 
  Map: Deleter, 
};
class Tensors extends EventTarget {
  constructor($tensors) {
    super();
    Object.defineProperties(this, {
      'cess': { value: function next() {
        for(const $tensor of $tensors) {
          try { return $tensor(...arguments) }
          catch($err) {}
        }
      } },
    });
  }
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Deleters: Deleters,
  Getters: Getters,
  Setters: Setters,
  Tensors: Tensors
});

const Options$e = {
  getters: [Getters.Object, Getters.Map],
};
function getProperty() {
  const [$target, $path, $options] = [...arguments];
  if($path === undefined) return arguments[0]
  const options = Object.assign ({}, Options$e, $options);
  const getters = new Tensors(options.getters);
  const subpaths = splitPath($path);
  let subtarget = $target;
  iterateSubpaths: 
  for(const $subpath of subpaths) {
    try {
      subtarget = getters.cess(subtarget, $subpath);
      if(subtarget === undefined) { break iterateSubpaths } 
    }
    catch($err) { break iterateSubpaths }
  }
  return subtarget
}

const Options$d = {
  getters: [Getters.Object, Getters.Map],
  delimiter: '.',
  depth: 0,
  enumerable: true,
  frozen: false,
  maxDepth: 10,
  nonenumerable: false,
  path: false,
  recurse: true,
  returnValue: 'receiver',
  sealed: false,
  type: false,
};
function getOwnPropertyDescriptor($source, $propertyKey, $options = {}) {
  const options = Object.assign({}, Options$d, $options, {
    ancestors: Object.assign([], $options.ancestors),
  });
  if(options.depth >= options.maxDepth) { return }
  else { options.depth++; }
  if(!options.ancestors.includes($source)) { options.ancestors.unshift($source); }
  const getters = new Tensors(options.getters);
  const propertyValue = getters.cess($source, $propertyKey);
  if(propertyValue !== undefined) {
    if(ObjectKeys.includes(typeOf(propertyValue))) {
      if(options.ancestors.includes(propertyValue)) { return }
      else { options.ancestors.unshift(propertyValue); }
    }
    const typeOfSource = typeOf($source);
    const propertyDescriptor = (typeOfSource !== 'map')
      ? Object.getOwnPropertyDescriptor($source, $propertyKey)
      : { configurable: false, enumerable: true, value: propertyValue[1], writable: true };
    if(!options.nonenumerable && !propertyDescriptor.enumerable) { return }
    if(options.path) {
      options.path = (
        typeOf(options.path) === 'string'
      ) ? [options.path, $propertyKey].join(options.delimiter) : $propertyKey;
      propertyDescriptor.path = options.path;
    }
    if(options.type) { propertyDescriptor.type = typeOf(propertyValue); }
    if(options.frozen) { propertyDescriptor.frozen = Object.isFrozen(propertyValue); }
    if(options.sealed) { propertyDescriptor.sealed = Object.isSealed(propertyValue); }
    if(options.recurse && ObjectKeys.includes(typeOf(propertyValue))) {
      propertyDescriptor.value = getOwnPropertyDescriptors(propertyValue, options);
    }
    else {
      propertyDescriptor.value = propertyValue;
    }
    return propertyDescriptor
  }
}

function getOwnPropertyDescriptors($source, $options = {}) {
  const options = Object.assign({}, $options);
  const propertyDescriptors = {};
  const typeOfSource = typeOf($source);
  const propertyDescriptorKeys = (['array', 'object'].includes(typeOfSource))
    ? Object.keys(Object.getOwnPropertyDescriptors($source))
    : (typeOfSource == 'map')
    ? Array.from($source.keys())
    : [];
  for(const $propertyKey of propertyDescriptorKeys) {
    const propertyDescriptor = getOwnPropertyDescriptor($source, $propertyKey, options);
    if(propertyDescriptor) {
      propertyDescriptors[$propertyKey] = propertyDescriptor;
    }
  }
  return propertyDescriptors
}

const Options$c = {
  getters: [Getters.Object, Getters.Map],
  ancestors: [],
  depth: 0, maxDepth: 10,
  enumerable: true, nonenumerable: false,
  recurse: true,
};
function entities($source, $type, $options = {}) {
  typeOf($source);
  const sourceEntities = [];
  const options = Object.assign({}, Options$c, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, maxDepth, enumerable, nonenumerable, recurse } = options;
  if(options.depth >= maxDepth) { return }
  if(!ancestors.includes($source)) { ancestors.unshift($source); }
  options.depth++;
  const getters = new Tensors(options.getters);
  const source = getters.cess($source);
  if(!source) { return sourceEntities }
  const propertyDescriptorKeys = (typeOf(source) === 'map')
    ? source.keys()
    : Object.keys(source);
  for(const $propertyKey of propertyDescriptorKeys) {
    const value = getters.cess($source, $propertyKey);
    const propertyDescriptor = (typeOf($source) !== 'map')
      ? Object.getOwnPropertyDescriptor($source, $propertyKey)
      : { enumerable: true, value};
    if(
      (enumerable && propertyDescriptor.enumerable) ||
      (nonenumerable && !propertyDescriptor.enumerable)
    ) {
      const $value = propertyDescriptor.value;
      const typeOfValue = typeOf($value);
      if(
        recurse && 
        ObjectKeys.includes(typeOfValue) && 
        !ancestors.includes($value)
      ) {
        ancestors.unshift($value);
        const subentities = entities($value, $type, options);
        if(subentities.length) {
          if($type === 'entries') { sourceEntities.push([$propertyKey, subentities]); }
          else if($type === 'values') { sourceEntities.push(subentities); }
          else if($type === 'keys') { sourceEntities.push($propertyKey, subentities); }
        }
        else {
          if($type === 'entries') { sourceEntities.push([$propertyKey, $value]); }
          else if($type === 'values') { sourceEntities.push($value); }
          else if($type === 'keys') { sourceEntities.push($propertyKey); }
        }
      }
      else {
        if($type === 'entries') { sourceEntities.push([$propertyKey, $value]); }
        else if($type === 'values') { sourceEntities.push($value); }
        else if($type === 'keys') { sourceEntities.push($propertyKey); }
      }
    }
  }
  return sourceEntities
}

const Options$b = { strict: true };
function isArrayLike($source, $options) {
  const options = Object.assign({}, Options$b, $options);
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
}

const Options$a = { strict: true };
function isMapLike($source, $options) {
  const options = Object.assign({}, Options$a, $options);
  let isMapLike;
  const typeOfSource = typeOf($source);
  if(typeOfSource === 'map') { isMapLike = true; }
  else if(
    typeOfSource === 'object' &&
    $source.size >= 0 && 
    Number.isInteger($source.size)
  ) {
    if(options.strict === false) {
      isMapLike = true;
    }
    else {
      iterateSourceEntries: 
      for(const $sourceEntity of entities($source, 'entries', {
        nonenumerable: true, recurse: false
      })) {
        if(
          isArrayLike($sourceEntity, options) ||
          $sourceEntity.length === 2
        ) { isMapLike = true; }
        else {
          isMapLike = false;
          break iterateSourceEntries
        }
      }
      if(isMapLike === undefined) { isMapLike = false; }
    }
  }
  else { isMapLike = false; }
  return isMapLike
}

function typedObjectLiteral($source) {
  const typeOfSource = typeOf($source);
  if(typeOfSource === 'string') {
    const source = $source.toLowerCase();
    if(source === 'object') { return Object() }
    else if(source === 'array') { return Array() }
    else if(source === 'map') { return new Map() }
    else ;
  }
  else  {
    if(typeOfSource === 'object') { return Object() }
    else if(isArrayLike($source, { strict: true })) { return Array() }
    else if(isMapLike($source, { strict: true })) { return new Map() }
    else ;
  }
}

const Options$9 = {
  getters: [Getters.Object, Getters.Map], 
  setters: [Setters.Object, Setters.Map],
};
function setProperty() {
  const $arguments = [...arguments];
  if(typeOf($arguments[1]) === 'string') {
    const [$target, $path, $value, $options] = $arguments;
    const options = Object.assign({}, Options$9, $options);
    const getters = new Tensors(options.getters);
    const setters = new Tensors(options.setters);
    const { enumerable, nonenumerable } = options;
    getters.cess($target);
    const subpaths = splitPath($path);
    const key = subpaths.pop();
    let subtarget = $target;
    iterateSubpaths: 
    for(const $subpath of subpaths) {
      subtarget = getters.cess(subtarget, $subpath, options) || setters.cess(
        subtarget, $subpath, isNaN($subpath) ? {} : []
      );
      if(subtarget === undefined) { break iterateSubpaths } 
    }
    setters.cess(subtarget, key, $value, options);
    return $target
  }
  else {
    const [$target, $value] = $arguments;
    return $target
  }
}

const Options$8 = { deleters: [Deleters.Object, Deleters.Map], /*returnValue: 'target'*/ };
function deleteProperty($target, $path, $options) {
  const options = Object.assign ({}, Options$8, $options);
  const deleters = new Tensors(options.deleters);
  const subpaths = splitPath($path);
  const key = subpaths.pop();
  const subtarget = getProperty($target, subpaths.join('.'), options) || $target;
  deleters.cess(subtarget, key);
}

const ValidPathTypes = ['string', 'function'];
function expand($source, $path, $options = {}) {
  const options = Object.assign({}, $options);
  const typeOfPath = typeOf($path);
  const typeOfSource = typeOf($source);
  if(
    !ValidPathTypes.includes(typeOfPath) ||
    !ObjectKeys.includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral($source);
  for(const [$sourceKey, $sourceValue] of entities(
    $source, 'entries', Object.assign({}, options, { recurse: false })
  )) {
    const targetValue = (
      ObjectKeys.includes(typeOf($sourceValue))
    ) ? expand($sourceValue, $path, options) : $sourceValue;
    if(typeOfPath === ValidPathTypes[0]) {
      target[$sourceKey] = setProperty({}, $path, targetValue, options);
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue);
    }
  }
  return target
}

const Options$7 = {
  ancestors: [], 
  getters: [Getters.Object, Getters.Map],
  depth: 0, maxDepth: 10,
};
function impand($source, $property, $options = {}) {
  const options = Object.assign({}, Options$7, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, values } = options;
  if(options.depth > options.maxDepth) { return } else { options.depth++; }
  const source = new Tensors(options.getters).cess($source);
  if(!ancestors.includes(source)) { ancestors.unshift(source); }
  const typeOfProperty = typeOf($property);
  let target = typedObjectLiteral($source);
  for(const [$sourceKey, $sourceValue] of entities(
    $source, 'entries', Object.assign({}, options, { recurse: false })
  )) {
    if(typeOfProperty === 'string') { target[$sourceKey] = getProperty($sourceValue, $property); }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue); }
    if(target[$sourceKey] && typeof target[$sourceKey] === 'object') {
      target[$sourceKey] = impand(target[$sourceKey], $property);
    }
  }
  return target
}

const Options$6 = {
  depth: 0, 
  getters: [Getters.Object, Getters.Map],
  maxDepth: 10,
  values: false,
  returnValue: 'receiver',
};
function compand($source, $options = {}) {
  const target = [];
  const options = Object.assign({}, Options$6, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, values } = options;
  options.depth++;
  if(options.depth > options.maxDepth) { return target }
  const source = new Tensors(options.getters).cess($source);
  if(!ancestors.includes($source)) { ancestors.unshift($source); }
  const objectProperties = entities($source, 'entries', Object.assign({}, options, {
    recurse: false
  }));
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
  return target
}

const Options$5 = {
  setters: [Setters.Object, Setters.Map],
};
function decompand($source, $options) {
  const options = Object.assign({}, Options$5, $options);
  const typeofSource= typeOf($source);
  const sourceEntries = (
    typeofSource === 'object'
  ) ? entities($source, 'entries', options) : $source;
  if(!sourceEntries) { return }
  const target = (isNaN(sourceEntries[0][0])) ? {} : [];
  for(const [$propertyPath, $propertyValue] of sourceEntries) {
    setProperty(target, $propertyPath, $propertyValue, options);
  }
  return target
}

const Options$4 = {
  getters: [Getters.Object, Getters.Map],
  setters: [Setters.Object, Setters.Map],
};
function assignSources($target, $type, ...$sources) {
  if(!$target) { return $target}
  const options = Object.assign({}, Options$4);
  const getters = new Tensors(options.getters);
  const setters = new Tensors(options.setters);
  const typeOfTarget = typeOf($target);
  iterateSources: 
  for(const $source of $sources) {
    if(!ObjectKeys.includes(typeOf($source))) continue iterateSources
    const sourceEntries = entities($source, 'entries', {
      recurse: false, // returnValue: 'entries'
    });
    for(const [$sourcePropertyKey, $sourcePropertyValue] of sourceEntries) {
      const targetPropertyValue = getters.cess($target, $sourcePropertyKey);
      const typeOfTargetPropertyValue = typeOf(targetPropertyValue);
      const typeOfSourcePropertyValue = typeOf($sourcePropertyValue);
      if(typeOfTarget === 'array' && $type === 'assignConcat') {
        setters.cess($target, $target.length, $sourcePropertyValue);
      }
      else if(
        ObjectKeys.includes(typeOfSourcePropertyValue) &&
        ObjectKeys.includes(typeOfTargetPropertyValue)
      ) {
        assignSources(targetPropertyValue, $type, $sourcePropertyValue);
      }
      else {
        setters.cess($target, $sourcePropertyKey, $sourcePropertyValue);
      }
    }
  }
}

var assign = ($target, ...$sources) => assignSources($target, 'assign', ...$sources);

var assignConcat = ($target, ...$sources) => assignSources($target, 'assignConcat', ...$sources);

const Options$3 = { typeCoercion: false };
function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const propertyDescriptor = Object.assign({}, $propertyDescriptor);
  let propertyDescriptorValue = propertyDescriptor.value;
  const options = Object.assign({}, Options$3, $options);
  const typeOfPropertyDescriptorValue = typeOf(propertyDescriptor.value);
  const targetPropertyValue = $target[$propertyKey];
  const typeOfTargetPropertyValue = typeOf(targetPropertyValue);
  if(ObjectKeys.includes(typeOfPropertyDescriptorValue)) {
    if(ObjectKeys.includes(typeOfTargetPropertyValue)) {
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
    !['undefined'/*, 'null'*/].includes(typeOfPropertyDescriptorValue)
  ) {
    propertyDescriptor.value = new Primitives[propertyDescriptor.type](propertyDescriptorValue);
  }
  Object.defineProperty($target, $propertyKey, propertyDescriptor);
  if($propertyDescriptor.sealed) { Object.seal($target[$propertyKey]); }
  if($propertyDescriptor.frozen) { Object.freeze($target[$propertyKey]); }
  return $target
}

function defineProperties($target, $propertyDescriptors, $options) {
  for(const [$propertyKey, $propertyDescriptor] of Object.entries($propertyDescriptors)) {
    defineProperty($target, $propertyKey, $propertyDescriptor, $options);
  }
  return $target
}

const Options$2 = {
  getters: [Getters.Object, Getters.Map],
  ancestors: [], 
  depth: 0, maxDepth: 10,
};
function freeze($target, $options = {}) {
  const options = Object.assign({}, Options$2, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, values } = options;
  if(options.depth > options.maxDepth) { return } else { options.depth++; }
  const target = new Tensors(options.getters).cess($target);
  if(!ancestors.includes(target)) { ancestors.unshift(target); }
  const targetEntities = entities($target, 'entries', Object.assign(options, {
    recurse: false
  }));
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    if(ancestors.includes($propertyValue)) { continue iterateTargetEntities }
    else if(ObjectKeys.includes(typeOf($propertyValue))) {
      freeze($propertyValue, options);
    }
  }
  return Object.freeze($target)
}

const Options$1 = {
  getters: [Getters.Object, Getters.Map],
  ancestors: [], 
  depth: 0, maxDepth: 10,
};
function seal($target, $options = {}) {
  const options = Object.assign({}, Options$1, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, values } = options;
  if(options.depth > options.maxDepth) { return } else { options.depth++; }
  const target = new Tensors(options.getters).cess($target);
  if(!ancestors.includes(target)) { ancestors.unshift(target); }
  const targetEntities = entities($target, 'entries', Object.assign(options, {
    recurse: false
  }));
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    if(ancestors.includes($propertyValue)) { continue iterateTargetEntities }
    else if(ObjectKeys.includes(typeOf($propertyValue))) {
      seal($propertyValue, options);
    }
  }
  return Object.seal($target)
}

var keys = ($target, $options) => entities($target, 'keys', $options);

var values = ($target, $options) => entities($target, 'values', $options);

var entries = ($target, $options) => entities($target, 'entries', $options);

({
  getters: [Getters.Object, Getters.Map]});
function valueOf($source, $options = {}) {
  const options = Object.assign({}, $options);
  if(options.returnValue === 'receiver') { return $source }
  else {
    const target = typedObjectLiteral(typeOf($source));
    return defineProperties(target, getOwnPropertyDescriptors($source, $options))
  }
}

const Options = { space: 0, replacer: null, returnValue: 'target', nonenumerable: true };
function toString($source, $options) {
  const options = Object.assign({}, Options, $options);
  return JSON.stringify(
    valueOf($source, options), options.replacer, options.space
  )
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
  static isMapLike = isMapLike
  static typeOf = typeOf
  static toString = toString
  static valueOf = valueOf

  constructor($target) {
    super();
    for(const [$staticMethodName, $staticMethod] of Object.entries({
      compand: Recourse.compand, decompand: Recourse.decompand, 
      expand: Recourse.expand, impand: Recourse.impand,
      entities: Recourse.entities,
      keys: Recourse.keys, values: Recourse.values, entries: Recourse.entries, 
      get: Recourse.get, set: Recourse.set, delete: Recourse.delete,
      assign: Recourse.assign, assignConcat: Recourse.assignConcat, 
      defineProperties: Recourse.defineProperties, defineProperty: Recourse.defineProperty,
      freeze: Recourse.freeze, seal: Recourse.seal,
      getOwnPropertyDescriptors: Recourse.getOwnPropertyDescriptors, getOwnPropertyDescriptor: Recourse.getOwnPropertyDescriptor,
      isArrayLike: Recourse.isArrayLike, isMapLike: Recourse.isMapLike,
      typeOf: Recourse.typeOf,
    })) {
      Object.defineProperty(this, $staticMethodName, {
        value: $staticMethod.bind(this, $target)
      });
    }
  }
}

export { Recourse, assign, assignConcat, compand, decompand, defineProperties, defineProperty, deleteProperty as delete, entities, entries, expand, freeze, getProperty as get, getOwnPropertyDescriptor, getOwnPropertyDescriptors, impand, isArrayLike, keys, seal, setProperty as set, splitPath, index as tensors, toString, typeOf, typedObjectLiteral, valueOf, values, index$1 as variables };
//# sourceMappingURL=recourse.js.map
