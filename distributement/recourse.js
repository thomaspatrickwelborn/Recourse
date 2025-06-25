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

// Object Getter
function Getter$1(...$arguments) {
  const $target = $arguments[0];
  if(!['object', 'array'].includes(typeOf($target))) { return }
  else if(['string', 'number'].includes(typeOf($arguments[1]))) {
    const $property = $arguments[1];
    return $target[$property]
  }
  else {
    return $target
  }
}
// Object Setter
function Setter$1(...$arguments) {
  if(!['object', 'array'].includes(typeOf($arguments[0]))) { return }
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
  if(!['object', 'array'].includes(typeOf($target))) { return }
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

const Options$h = { returnValue: 'target' };
// Map Getter
function Getter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(PrimitiveKeys.includes(typeOf($arguments[1]))) {
    const [$receiver, $property, $options] = $arguments;
    const { returnValue } = Object.assign({}, Options$h, $options);
    return (returnValue === 'target') ? $receiver.get($property)
    : (returnValue === 'receiver') ? $receiver[$property]
    : (returnValue === 'entries') ? [$property, $receiver.get($property)]
    : undefined
  }
  else {
    const [$receiver, $options] = $arguments;
    const { returnValue } = Object.assign({}, Options$h, $options);
    return (returnValue === 'target') ? Object.fromEntries($receiver)
    : (returnValue === 'receiver') ? $receiver
    : (returnValue === 'entries') ? Array.from($receiver.entries())
    : undefined
  }
}
// Map Setter
function Setter(...$arguments) {
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(PrimitiveKeys.includes(typeOf($arguments[1]))) {
    let [$receiver, $property, $value, $options] = $arguments;
    const { returnValue } = Object.assign({}, Options$h, $options);
    $receiver.set($property, $value);
    return $receiver.get($property)
  }
  else {
    let [$receiver, $source, $options] = $arguments;
    const { returnValue } = Object.assign({}, Options$h, $options);
    $receiver.clear();
    for(const [$sourceKey, $sourceValue] of Object.entries(source)) {
      $receiver.set($sourceKey, $sourceValue);
    }
    return $receiver
  }
}
// Map Deleter
function Deleter(...$arguments) {
  $arguments.length;
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(PrimitiveKeys.includes(typeOf($arguments[1]))) {
    let [$receiver, $property, $options] = $arguments;
    const { returnValue } = Object.assign({}, Options$h, $options);
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
    const tensors = Object.assign([], $tensors);
    Object.defineProperties(this, {
      'cess': { value: function cess() {
        let cess;
        iterateGetters: 
        for(const $tensor of tensors) {
          cess = $tensor(...arguments);
          if(cess !== undefined) { break iterateGetters }
        }
        return cess
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

const Options$g = {
  getters: [Getters.Object, Getters.Map],
};
function getProperty() {
  const [$target, $path, $options] = [...arguments];
  if($path === undefined) return arguments[0]
  const options = Object.assign ({}, Options$g, $options);
  const getters = new Tensors(options.getters);
  const subpaths = splitPath($path);
  let subtarget = $target;
  iterateSubpaths: 
  for(const $subpath of subpaths) {
    try {
      subtarget = getters.cess(subtarget, $subpath, options);
      if(subtarget === undefined) { break iterateSubpaths } 
    }
    catch($err) { break iterateSubpaths }
  }
  return subtarget
}

function typedObjectLiteral($value) {
  let _typedObjectLiteral;
  const typeOfValue = typeOf($value);
  if(typeOfValue === 'string') {
    const value = $value.toLowerCase();
    if(value === 'object') { _typedObjectLiteral = new Object(); }
    else if(value === 'array') { _typedObjectLiteral = new Array(); }
    else if(value === 'map') { _typedObjectLiteral = new Map(); }
    else { _typedObjectLiteral = {}; }
  }
  else  {
    if(typeOfValue === 'object') { _typedObjectLiteral = new Object(); }
    else if(typeOfValue === 'array') { _typedObjectLiteral = new Array(); }
    else if(value === 'map') { _typedObjectLiteral = new Map(); }
    else { _typedObjectLiteral = {}; }
  }
  return _typedObjectLiteral
}

const Options$f = {
  getters: [Getters.Object, Getters.Map], 
  setters: [Setters.Object, Setters.Map],
};
function setProperty() {
  const $arguments = [...arguments];
  if(typeOf($arguments[1]) === 'string') {
    const [$target, $path, $value, $options] = $arguments;
    const options = Object.assign({}, Options$f, $options);
    const getters = new Tensors(options.getters);
    const setters = new Tensors(options.setters);
    const { enumerable, nonenumerable } = options;
    getters.cess($target, options);
    const subpaths = splitPath($path);
    const key = subpaths.pop();
    let subtarget = $target;
    iterateSubpaths: 
    for(const $subpath of subpaths) {
      subtarget = getters.cess(subtarget, $subpath, options) || setters.cess(
        subtarget, $subpath, isNaN($subpath) ? {} : [], options
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

const Options$e = { deleters: [Deleters.Object, Deleters.Map], returnValue: 'target' };
function deleteProperty($target, $path, $options) {
  const options = Object.assign ({}, Options$e, $options);
  const deleters = new Tensors(options.deleters);
  const subpaths = splitPath($path);
  const key = subpaths.pop();
  const subtarget = getProperty($target, subpaths.join('.'), options) || $target;
  deleters.cess(subtarget, key, options);
}

const Options$d = {
  getters: [Getters.Object, Getters.Map],
  delimiter: '.',
  depth: 0,
  frozen: false,
  nonenumerable: true,
  path: false,
  sealed: false,
  type: false,
};
function getOwnPropertyDescriptor($properties, $propertyKey, $options = {}) {
  const options = Object.assign({}, Options$d, $options, {
    ancestors: Object.assign([], $options.ancestors),
  });
  if(options.depth >= options.maxDepth) { return }
  else { options.depth++; }
  const propertyValue = new Tensors(options.getters).cess($properties, $propertyKey, options);
  if(propertyValue) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor($properties, $propertyKey);
    if(!options.nonenumerable && !propertyDescriptor.enumerable) { return }
    if(!options.ancestors.includes($properties)) { options.ancestors.unshift($properties); }
    if(options.ancestors.includes(propertyValue)) { return }
    if(options.path) {
      options.path = (
        typeOf(options.path) === 'string'
      ) ? [options.path, $propertyKey].join(options.delimiter) : $propertyKey;
      propertyDescriptor.path = options.path;
    }
    if(options.type) { propertyDescriptor.type = typeOf(propertyValue); }
    if(options.frozen) { propertyDescriptor.frozen = Object.isFrozen(propertyValue); }
    if(options.sealed) { propertyDescriptor.sealed = Object.isSealed(propertyValue); }
    if(ObjectKeys.includes(typeOf(propertyValue))) {
      propertyDescriptor.value = getOwnPropertyDescriptors(propertyValue, options);
    }
    return propertyDescriptor
  }
}

function getOwnPropertyDescriptors($target, $options) {
  const propertyDescriptors = {};

  for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($target))) {
    const propertyDescriptor = getOwnPropertyDescriptor($target, $propertyKey, $options);
    if(propertyDescriptor) { propertyDescriptors[$propertyKey] = propertyDescriptor; }
  }
  return propertyDescriptors
}

const Options$c = {
  getters: [Getters.Object, Getters.Map],
  ancestors: [],
  depth: 0, maxDepth: 10,
  enumerable: true, nonenumerable: false,
  recurse: true,
  returnValue: 'target',
};
function entities($source, $type, $options = {}) {
  const sourceEntities = [];
  const options = Object.assign({}, Options$c, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, maxDepth, enumerable, nonenumerable, recurse } = options;
  if(options.depth >= maxDepth) { return }
  if(!ancestors.includes($source)) { ancestors.push($source); }
  const source = new Tensors(options.getters).cess($source, options);
  options.depth++;
  for(const [$key, $propertyDescriptor] of Object.entries(
    // Object.getOwnPropertyDescriptors(source)
    getOwnPropertyDescriptors(source, { nonenumerable: true })
  )) {
    // if(
    //   enumerable && $propertyDescriptor.enumerable ||
    //   nonenumerable && !$propertyDescriptor.enumerable
    // ) {
      const $value = $propertyDescriptor.value;
      const typeOfValue = typeOf($value);
      if(
        recurse && 
        ObjectKeys.includes(typeOfValue) && 
        !ancestors.includes($value)
      ) {
        if($type === 'entries') { sourceEntities.push([$key, entities($value, $type, options)]); }
        else if($type === 'values') { sourceEntities.push(entities($value, $type, options)); }
        else if($type === 'keys') { sourceEntities.push($key, entities($value, $type, options)); }
      }
      else {
        if($type === 'entries') { sourceEntities.push([$key, $value]); }
        else if($type === 'values') { sourceEntities.push($value); }
        else if($type === 'keys') { sourceEntities.push($key); }
      }
    // }
  }
  return sourceEntities
}

// const Options = {}
const ValidPathTypes = ['string', 'function'];
function expand($source, $path, $options = {}) {
  const options = Object.assign({}, /*Options, */$options);
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
    ) ? expand($sourceValue, $path) : $sourceValue;
    if(typeOfPath === ValidPathTypes[0]) {
      target[$sourceKey] = setProperty({}, $path, targetValue, options);
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue);
    }
  }
  return target
}

const Options$b = {
  ancestors: [], 
  getters: [Getters.Object, Getters.Map],
  depth: 0, maxDepth: 10,
};
function impand($source, $property, $options = {}) {
  const options = Object.assign({}, Options$b, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, values } = options;
  if(options.depth > options.maxDepth) { return } else { options.depth++; }
  const source = new Tensors(options.getters).cess($source, options);
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

const Options$a = {
  depth: 0, 
  getters: [Getters.Object, Getters.Map],
  maxDepth: 10,
  values: false,
};
function compand($source, $options) {
  const target = [];
  const options = Object.assign({}, Options$a, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, values } = options;
  options.depth++;
  if(options.depth > options.maxDepth) { return target }
  const source = new Tensors(options.getters).cess($source, options);
  if(!ancestors.includes(source)) { ancestors.unshift(source); }
  const objectProperties = entities(source, 'entries', Object.assign(options, {
    recurse: false
  }));
  console.log(objectProperties);
  // throw objectProperties
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

const Options$9 = {
  setters: [Setters.Object, Setters.Map],
};
function decompand($source, $options) {
  const options = Object.assign({}, Options$9, $options);
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

const Options$8 = {
  getters: [Getters.Object, Getters.Map],
  setters: [Setters.Object, Setters.Map],
};
function assignSources($target, $type, ...$sources) {
  if(!$target) { return $target}
  const options = Object.assign({}, Options$8);
  new Tensors(options.getters);
  const setters = new Tensors(options.setters);
  const typeOfTarget = typeOf($target);
  iterateSources: 
  for(const $source of $sources) {
    if(!ObjectKeys.includes(typeOf($source))) continue iterateSources
    const sourceEntries = entities($source, 'entries', { recurse: false });
    for(const [$sourcePropertyKey, $sourcePropertyValue] of sourceEntries) {
      const targetPropertyValue = $target[$sourcePropertyKey];
      const typeOfTargetPropertyValue = typeOf(targetPropertyValue);
      typeOf($sourcePropertyValue);
      if(typeOfTarget === 'array' && $type === 'assignConcat') {
        $target.push($sourcePropertyValue);
      }
      else if(ObjectKeys.includes(typeOfTargetPropertyValue)) {
        assignSources(targetPropertyValue, $type, $sourcePropertyValue);
      }
      else {
        setters.cess($target, $sourcePropertyKey, $sourcePropertyValue, options);
      }
    }
  }
  return $target
}

var assign = ($target, ...$sources) => assignSources($target, 'assign', ...$sources);

var assignConcat = ($target, ...$sources) => assignSources($target, 'assignConcat', ...$sources);

const Options$7 = { strict: true };
function isArrayLike($source, $options) {
  const options = Object.assign({}, Options$7, $options);
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
        nonenumerable: true,  recurse: false
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

const Options$6 = { typeCoercion: false };
function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const propertyDescriptor = Object.assign({}, $propertyDescriptor);
  let propertyDescriptorValue = propertyDescriptor.value;
  const options = Object.assign({}, Options$6, $options);
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

const Options$5 = {
  ancestors: [], 
  depth: 0, maxDepth: 10,
};
function freeze($target, $options = {}) {
  const options = Object.assign({}, Options$5, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, values } = options;
  if(options.depth > options.maxDepth) { return } else { options.depth++; }
  const target = new Tensors(options.getters).cess($target, options);
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

const Options$4 = {
  ancestors: [], 
  depth: 0, maxDepth: 10,
};
function seal($target, $options = {}) {
  const options = Object.assign({}, Options$4, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, values } = options;
  if(options.depth > options.maxDepth) { return } else { options.depth++; }
  const target = new Tensors(options.getters).cess($target, options);
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

const Options$3 = { strict: true };
function isMapLike($source, $options) {
  const options = Object.assign({}, Options$3, $options);
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

const Options$2 = { strict: true, isArrayLike: false };
function isEntries($source, $options) {
  const options = Object.assign({}, Options$2, $options);
  if(typeOf($source) !== 'array') {
    if(options.isArrayLike && isArrayLike($source, {
      strict: options.strict
    })) { $source = Array.from($source); }
    else { return false }
  }
  if(!options.strict && !$source.length) { return true }
  else {
    let isEntries;
    iterateSourceEntities: 
    for(const $soureEntity of $source) {
      isEntries = (
        typeOf($soureEntity) === 'array' &&
        $soureEntity.length === 2 &&
        ['string', 'number', 'symbol'].includes(typeOf($soureEntity[0]))
      );
      if(isEntries === false) { break iterateSourceEntities }
    }
    return isEntries
  }
}

var keys = ($target, $options) => entities($target, 'keys', $options);

var values = ($target, $options) => entities($target, 'values', $options);

var entries = ($target, $options) => entities($target, 'entries', $options);

const Options$1 = {
  ancestors: [], 
  depth: 0, maxDepth: 10,
  getters: [Getters.Object, Getters.Map], 
  returnValue: 'receiver',
};
function valueOf($source, $options = {}) {
  const options = Object.assign({}, Options$1, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const { ancestors, maxDepth, returnValue } = options;
  if(returnValue === 'receiver') { return $source }
  if(options.depth >= maxDepth) { return } else { options.depth++; }
  const source = new Tensors(options.getters).cess($source, options);
  if(source === undefined) { return }
  if(!ancestors.includes($source)) { ancestors.unshift($source); }
  const target = typedObjectLiteral(typeOf(source));
  const sourceEntries = entities($source, 'entries', Object.assign({}, options, { recurse: false }));
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of sourceEntries) {
    let sourceValue;
    if(ObjectKeys.includes(typeOf($sourceValue))) {
      if(ancestors.includes($sourceValue)) { continue iterateSourceEntries }
      sourceValue = valueOf($sourceValue, options);
    }
    else { sourceValue = $sourceValue; }
    try {
      target[$sourceKey] = sourceValue;
    }
    catch($err) { console.error($err); }
  }
  return target
}

const Options = { space: 0, replacer: null, returnValue: 'receiver' };
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
  static isEntries = isEntries
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
      isArrayLike: Recourse.isArrayLike, isEntries: Recourse.isEntries, isMapLike: Recourse.isMapLike,
      typeOf: Recourse.typeOf,
    })) {
      Object.defineProperty(this, $staticMethodName, {
        value: $staticMethod.bind(this, $target)
      });
    }
  }
}

export { Recourse, assign, assignConcat, compand, decompand, defineProperties, defineProperty, deleteProperty as delete, entities, entries, expand, freeze, getProperty as get, getOwnPropertyDescriptor, getOwnPropertyDescriptors, impand, isArrayLike, isEntries, keys, seal, setProperty as set, splitPath, index as tensors, toString, typeOf, typedObjectLiteral, valueOf, values, index$1 as variables };
//# sourceMappingURL=recourse.js.map
