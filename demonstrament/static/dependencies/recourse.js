var regularExpressions = {
  quotationEscape: /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/,
  quotationStartStop: /^"(.*)"$/,
};

var typeOf = ($operand) => Object
  .prototype
  .toString
  .call($operand).slice(8, -1).toLowerCase();

const { quotationEscape, quotationStartStop } = regularExpressions;
function splitPath($path) {
  const typeOfPath = typeOf($path);
  // let subpaths
  if(typeOfPath === 'string') {
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));

    let subpathIndex = 0;
    while(subpathIndex < subpaths.length) {
      subpaths[subpathIndex] = subpaths[subpathIndex].replace(
        new RegExp(regularExpressions.quotationStartStop), '$1'
      );
      subpathIndex++;
    }
    return subpaths
  }
  else if(typeOfPath === 'number'){
    return [$path] 
  }
}

// Object Getter
function Getter$1(...$arguments) {
  const $target = arguments[0];
  if(!['object', 'array'].includes(typeOf($target))) { return }
  if(typeOf(arguments[1]) === 'string') {
    const $property = arguments[1];
    return $target[$property]
  }
  else {
    return $target
  }
}
// Object Setter
function Setter$1() {
  const $arguments = [...arguments];
  if(!['object', 'array'].includes(typeOf($arguments[0]))) { return }
  else if(typeOf($arguments[1]) === 'string') {
    const [$target, $property, $value] = $arguments;
    $target[$property] = $value;
    return $target[$property]
  }
  else {
    const [$target, $source] = $arguments;
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey];
    }
    for(const [$sourceKey, $sourceValue] of Object.entries(source)) {
      $target[$sourceKey] = $sourceValue;
    }
    return $target
  }
}
// Object Deleter
function Deleter$1($target, $property) {
  const $arguments = [...arguments];
  if(!['object', 'array'].includes(typeOf($arguments[0]))) { return }
  else if(typeOf($arguments[1]) === 'string') {
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
function Getter() {
  const $arguments = [...arguments];
  if(typeOf($arguments[0]) !== 'map') { return }
  if(typeOf($arguments[$arguments.length - 1]) !== 'boolean') { $arguments.push(true); }
  // let length = 
  if($arguments.length === 3) {
    const [$receiver, $property, $returnTarget] = $arguments;
    return ($returnTarget) ? $receiver.get($property) : $receiver[$property]
  }
  else if($arguments.length === 2) {
    const [$receiver, $returnTarget] = $arguments;
    return ($returnTarget) ? Array.from($receiver.entries()) : $receiver
  }
}
// Map Setter
function Setter() {
  const $arguments = [...arguments];
  if(typeOf($arguments[0]) !== 'map') { return }
  const length = $arguments.length;
  if(length === 3) {
    const [$receiver, $property, $value] = $arguments;
    $receiver.set($property, $value);
    return $receiver.get($property)
  }
  else if(length === 2) {
    const [$receiver, $source] = $arguments;
    $receiver.clear();
    for(const [$sourceKey, $sourceValue] of Object.entries(source)) {
      $receiver.set($sourceKey, $sourceValue);
    }
    return $receiver
  }
}
// Map Deleter
function Deleter() {
  const $arguments = [...arguments];
  console.log($arguments);
  const length = $arguments.length;
  if(typeOf($arguments[0]) !== 'map') { return }
  else if(length === 2) {
    const [$receiver, $property] = $arguments;
    return $receiver.delete($property)
  }
  else if(length === 1) {
    const [$receiver] = $arguments;
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

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Deleters: Deleters,
  Getters: Getters,
  Setters: Setters,
  Tensors: Tensors
});

const Options$f = {
  getters: [Getters.Object, Getters.Map],
  returnTarget: false,
};
function getProperty() {
  const [$target, $path, $options] = [...arguments];
  if($path === undefined) return arguments[0]
  const options = Object.assign ({}, Options$f, $options);
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

const Options$e = {
  enumerable: true, nonenumerable: false,
  getters: [Getters.Object, Getters.Map], 
  setters: [Setters.Object, Setters.Map],
  returnTarget: false
};
function setProperty() {
  const $arguments = [...arguments];
  if(typeOf($arguments[1]) === 'string') {
    const [$target, $path, $value, $options] = $arguments;
    const options = Object.assign({}, Options$e, $options);
    const getters = new Tensors(options.getters);
    const setters = new Tensors(options.setters);
    const { enumerable, nonenumerable } = options;
    getters.cess($target);
    const subpaths = splitPath($path);
    const key = subpaths.pop();
    let subtarget = $target;
    iterateSubpaths: 
    for(const $subpath of subpaths) {
      subtarget = getters.cess(subtarget, $subpath) || setters.cess(
        subtarget, $subpath, isNaN($subpath) ? {} : []
      );
      if(subtarget === undefined) { break iterateSubpaths } 
    }
    setters.cess(subtarget, key, $value);
    return $target
  }
  else {
    const [$target, $value] = $arguments;
    return $target
  }
}

const Options$d = { deleters: [Deleters.Object, Deleters.Map] };
// import tensors
function deleteProperty($target, $path, $options) {
  const options = Object.assign ({}, Options$d, $options);
  const deleters = new Tensors(options.deleters);
  const subpaths = splitPath($path);
  const key = subpaths.pop();
  const subtarget = getProperty($target, subpaths.join('.')) || $target;
  deleters.cess(subtarget, key);
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

const Options$c = {
  getters: [Getters.Object, Getters.Map],
  ancestors: [],
  depth: 0, maxDepth: 10,
  enumerable: true, nonenumerable: false,
  recurse: true,
};
function entities($source, $type, $options) {
  const sourceEntities = [];
  const options = Object.assign({}, Options$c, $options, {
    ancestors: [].concat($options.ancestors || [])
  });
  const { ancestors, maxDepth, enumerable, nonenumerable, recurse } = options;
  if(options.depth >= maxDepth) { return }
  if(!ancestors.includes($source)) { ancestors.push($source); }
  const source = new Tensors(options.getters).cess($source);
  options.depth++;
  for(const [$key, $propertyDescriptor] of Object.entries(
    Object.getOwnPropertyDescriptors(source)
  )) {
    if(
      enumerable && $propertyDescriptor.enumerable ||
      nonenumerable && !$propertyDescriptor.enumerable
    ) {
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
    }
  }
  return sourceEntities
}

const Options$b = { ancestors: [], nonenumerable: false };
const ValidPathTypes = ['string', 'function'];
function expand($source, $path, $options = {}) {
  const options = Object.assign({}, Options$b, $options, {
    ancestors: [].concat($options.ancestors || []),
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
  for(const [$sourceKey, $sourceValue] of entities(
    $source, 'entries', Object.assign({}, options, { recurse: false })
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
      target[$sourceKey] = setProperty({}, $path, targetValue, options);
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue);
    }
  }
  return target
}

var entries = ($target, $options) => entities($target, 'entries', $options);

const Options$a = {};
function impand($source, $property, $options) {
  const options = Object.assign({}, Options$a, $options);
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

const Options$9 = {
  ancestors: [],
  depth: 0, 
  enumerable: true,
  getters: [Getters.Object, Getters.Map],
  maxDepth: 10,
  nonenumerable: false, 
  values: false,
};
function compand($source, $options) {
  const target = [];
  const options = Object.assign({}, Options$9, $options, {
    ancestors: [].concat($options.ancestors || [])
  });
  const { ancestors, nonenumerable, values } = options;
  options.depth++;
  if(options.depth > options.maxDepth) { return target }
  const source = new Tensors(options.getters).cess($source);
  if(!ancestors.includes(source)) { ancestors.unshift(source); }
  const objectProperties = entities(source, 'entries', { nonenumerable, recurse: false });  
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

const Options$8 = {
  setters: [Setters.Object],
};
function decompand($source, $options) {
  const options = Object.assign({}, Options$8, $options);
  const sourceEntries = (
    typeOf($source) === 'object'
  ) ? entities($source, 'entries', options) : $source;
  if(!sourceEntries) { return }
  const target = (isNaN(sourceEntries[0][0])) ? {} : [];
  for(const [$propertyPath, $propertyValue] of sourceEntries) {
    setProperty(target, $propertyPath, $propertyValue, options);
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
        if(ObjectKeys.includes(typeOfTargetPropertyValue)) {
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

const Options$5 = {
  ancestors: [],
  getters: [Getters.Object, Getters.Map], 
};
function freeze($target, $options = {}) {
  const options = Object.assign({}, Options$5, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const targetEntities = entities($target, 'entries', Object.assign(options, {
    recurse: false
  }));
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    if(ObjectKeys.includes(typeOf($propertyValue)/*typeOfPropertyValue*/)) {
      freeze($propertyValue, options);
    }
  }
  return Object.freeze($target)
}

const Options$4 = {
  // ancestors: [],
  // getters: [Getters.Object, Getters.Map], 
};
function seal($target, $options) {
  const options = Object.assign({}, Options$4, $options, {
    // ancestors: Object.assign([], $options.ancestors)
  });
  // const target = new Tensors(options.getters).cess($target)
  // if(!options.ancestors.includes(target)) { options.ancestors.unshift(target) }
  throw entities($target, 'entries', options)
}

const Options$3 = { strict: true, isArrayLike: false };
function isEntries($source, $options) {
  const options = Object.assign({}, Options$3, $options);
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

const Options$2 = {
  getters: [Getters.Object, Getters.Map],
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
  const options = Object.assign({}, Options$2, $options, {
    ancestors: Object.assign([], $options.ancestors),
  });
  if(options.depth >= options.maxDepth) { return }
  else { options.depth++; }
  const propertyValue = new Tensors(options.getters).cess($properties, $propertyKey);
  if(propertyValue) {
    const propertyDescriptor = Object.getOwnPropertyDescriptor($properties, $propertyKey);
    if(!options.nonenumerable && !propertyDescriptor.enumerable) { return }
    if(!options.ancestors.includes($properties)) { options.ancestors.unshift($properties); }
    if(options.ancestors.includes(/*propertyValue*/propertyValue)) { return }
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

const Options$1 = {
  ancestors: [],
  getters: [Getters.Object, Getters.Map], 
};
function valueOf($source, $options = {}) {
  const options = Object.assign({}, Options$1, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const source = new Tensors(options.getters).cess($source);
  if(source === undefined) { throw [$source, source] }
  if(!options.ancestors.includes($source)) { options.ancestors.unshift($source); }
  const target = typedObjectLiteral(typeOf(source));
  const sourceEntries = entities($source, 'entries', Object.assign(options, { recurse: false }));
  iterateSourceEntries: 
  for(const [$sourceKey, $sourceValue] of sourceEntries) {
    let sourceValue;
    if(ObjectKeys.includes(typeOf($sourceValue))) {
      sourceValue = valueOf($sourceValue, options);
    }
    else { sourceValue = $sourceValue; }
    if(options.ancestors.includes(sourceValue)) { continue iterateSourceEntries }
    try {
      target[$sourceKey] = sourceValue;
    }
    catch($err) { console.error($err); }
  }
  return target
}

const Options = { space: 0, replacer: null };
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
      isArrayLike: Recourse.isArrayLike, isEntries: Recourse.isEntries, typeOf: Recourse.typeOf,
    })) {
      Object.defineProperty(this, $staticMethodName, {
        value: $staticMethod.bind(this, $target)
      });
    }
  }
}

export { Recourse, assign, assignConcat, compand, decompand, defineProperties, defineProperty, deleteProperty as delete, entities, entries, expand, freeze, getProperty as get, getOwnPropertyDescriptor, getOwnPropertyDescriptors, impand, isArrayLike, isEntries, keys, regularExpressions, seal, setProperty as set, splitPath, index$1 as tensors, toString, typeOf, typedObjectLiteral, valueOf, values, index as variables };
//# sourceMappingURL=recourse.js.map
