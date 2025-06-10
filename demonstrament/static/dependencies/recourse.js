var regularExpressions = {
  quotationEscape: /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/,
};

var typeOf = ($operand) => Object
  .prototype
  .toString
  .call($operand).slice(8, -1).toLowerCase();

class Cessors extends EventTarget {
  constructor($cessors) {
    super();
    const cessors = Object.assign([], $cessors);
    Object.defineProperties(this, {
      'cess': { value: function cess() {
        let cessValue;
        iterateAccessors: 
        for(const $cessor of cessors) {
          cessValue = $cessor(...arguments);
          if(cessValue !== undefined) { break iterateAccessors }
        }
        return cessValue
      } },
    });
  }
}
const Accessors = { default: function($target, $property) {
  if($property === undefined) { return $target }
  else { return $target[$property] }
} };
const Processors = { default: function() {
  if(typeOf(arguments[1]) === 'string') {
    const [$target, $property, $value, $options] = [...arguments];
    $target[$property] = $value;
    return $target[$property]
  }
  else {
    let [$target, $value, $options] = [...arguments];
    return $value
  }
} };

const Options$c = { accessors: [Accessors.default] };
function getProperty() {
  const [$target, $path, $options] = [...arguments];
  const options = Object.assign ({}, Options$c, $options);
  if($path === undefined) return arguments[0]
  const accessors = new Cessors(options.accessors);
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
  let subtarget = $target;
  iterateSubpaths: 
  for(const $subpath of subpaths) {
    try {
      subtarget = accessors.cess(subtarget, $subpath);
      if(subtarget === undefined) { break iterateSubpaths } 
    }
    catch($err) { break iterateSubpaths }
  }
  return subtarget
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

const Options$b = {
  accessors: [Accessors.default],
  ancestors: [],
  depth: 0, maxDepth: 10,
  enumerable: true, nonenumerable: false,
  recurse: true,
};
function entities($source, $type, $options) {
  const sourceEntities = [];
  const options = Object.assign({}, Options$b, $options, {
    ancestors: [].concat($options.ancestors || [])
  });
  new Cessors([Accessors.default]).cess($source);
  const { ancestors, maxDepth, enumerable, nonenumerable, recurse } = options;
  if(options.depth >= maxDepth) { return sourceEntities }
  options.depth++;
  if(!ancestors.includes($source)) { ancestors.push($source); }
  for(const [$key, $propertyDescriptor] of Object.entries(
    Object.getOwnPropertyDescriptors($source)
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

const Options$a = {
  enumerable: true, nonenumerable: false,
  accessors: [Accessors.default], 
  processors: [Processors.default],
};
function setProperty() {
  const $arguments = [...arguments];
  if(typeOf($arguments[1]) === 'string') {
    const [$target, $path, $value, $options] = $arguments;
    const options = Object.assign({}, Options$a, $options);
    const accessors = new Cessors(options.accessors);
    const processors = new Cessors(options.processors);
    const { enumerable, nonenumerable } = options;
    const target = accessors.cess($target);
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
    const key = subpaths.pop();
    let subtarget = target;
    for(const $subpath of subpaths) {
      subtarget = accessors.cess(subtarget, $subpath, options) || processors.cess(
        subtarget, $subpath, isNaN($subpath) ? {} : [], options
      );
    }
    processors.cess(subtarget, key, $value);
    return $target
  }
  else {
    const [$target, $value] = $arguments;
    return $target
  }
}

function deleteProperty($target, $path) {
  const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape));
  const key = subpaths.pop();
  let subtarget = $target;
  for(const $subpath of subpaths) { subtarget = subtarget[$subpath]; }
  delete subtarget[key];
  return
}

var entries = ($target, $options) => entities($target, 'entries', $options);

const Options$9 = { ancestors: [], nonenumerable: false };
const ValidPathTypes = ['string', 'function'];
function expand($source, $path, $options = {}) {
  const options = Object.assign({}, Options$9, $options, {
    ancestors: [].concat($options.ancestors || []),
    // accessors: [Acessors.default],
  });
  // throw options
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
      // throw [target, $sourceKey, $path, targetValue, options]
      target[$sourceKey] = setProperty({}, $path, targetValue, options);
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue);
    }
  }
  return target
}

const Options$8 = {};
function impand($source, $property, $options) {
  const options = Object.assign({}, Options$8, $options);
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

const Options$7 = {
  accessors: [Accessors.default],
  ancestors: [],
  depth: 0, maxDepth: 10,
  enumerable: true, nonenumerable: false, 
  values: false,
};
function compand($source, $options) {
  const target = [];
  const options = Object.assign({}, Options$7, $options, {
    ancestors: [].concat($options.ancestors || [])
  });
  const { ancestors, nonenumerable, values } = options;
  options.depth++;
  if(options.depth > options.maxDepth) { return target }
  const source = new Cessors(options.accessors).cess($source);
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

const Options$6 = {
  processors: [Processors.default],
  values: false,
};
function decompand($source, $options) {
  const options = Object.assign({}, Options$6, $options);
  const sourceEntries = (typeOf($source) === 'object') ? Object.entries($source) : $source;
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

const Options$5 = { strict: true };
function isArrayLike($source, $options) {
  const options = Object.assign({}, Options$5, $options);
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

const Options$4 = { typeCoercion: false };
function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const propertyDescriptor = Object.assign({}, $propertyDescriptor);
  let propertyDescriptorValue = propertyDescriptor.value;
  const options = Object.assign({}, Options$4, $options);
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

const Options$3 = { ancestors: [] };
function freeze($target, $options) {
  const { ancestors } = Object.assign({}, Options$3, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  if(!options.ancestors.includes($target)) { options.ancestors.unshift($target); }
  iterateTargetProperties: 
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    const typeOfPropertyValue = typeOf($propertyValue);
    if(options.ancestors.includes($propertyValue)) { continue iterateTargetProperties }
    if(ObjectKeys.includes(typeOfPropertyValue)) {
      freeze($propertyValue, options);
    }
  }
  return Object.freeze($target)
}

const Options$2 = { ancestors: [] };
function seal($target, $options) {
  const { ancestors } = Object.assign({}, Options$2, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  if(!options.ancestors.includes($target)) { options.ancestors.unshift($target); }
  iterateTargetProperties: 
  for(const [$propertyKey, $propertyValue] of Object.entries($target)) {
    const typeOfPropertyValue = typeOf($propertyValue);
    if(options.ancestors.includes($propertyValue)) { continue iterateTargetProperties }
    if(ObjectKeys.includes(typeOfPropertyValue)) {
      seal($propertyValue, options);
    }
  }
  return Object.seal($target)
}

const Options$1 = { strict: true, isArrayLike: false };
function isEntries($source, $options) {
  const options = Object.assign({}, Options$1, $options);
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

const Options = {
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
  const propertyValue = new Cessors(options.accessors).cess($properties, $propertyKey);
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

function toString($target, $options) {}

function valueOf($target, $options) {}

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

export { Recourse, assign, assignConcat, compand, decompand, defineProperties, defineProperty, deleteProperty as delete, entities, entries, expand, freeze, getProperty as get, getOwnPropertyDescriptor, getOwnPropertyDescriptors, impand, isArrayLike, isEntries, keys, regularExpressions, seal, setProperty as set, typeOf, typedObjectLiteral, values, index as variables };
//# sourceMappingURL=recourse.js.map
