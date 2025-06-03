var typeOf$1 = ($data) => Object
  .prototype
  .toString
  .call($data).slice(8, -1).toLowerCase();

function assign($target, ...$sources) {
  if(!$target) { return $target}
  iterateSources: 
  for(const $source of $sources) {
    if(!$source) continue iterateSources
    for(const [
      $sourcePropertyKey, $sourcePropertyValue
    ] of Object.entries($source)) {
      const typeOfTargetPropertyValue = typeOf$1($target[$sourcePropertyKey]);
      const typeOfSourcePropertyValue = typeOf$1($sourcePropertyValue);
      if(
        typeOfTargetPropertyValue === 'object' &&
        typeOfSourcePropertyValue === 'object'
      ) {
        $target[$sourcePropertyKey] = assign($target[$sourcePropertyKey], $sourcePropertyValue);
      }
      else {
        $target[$sourcePropertyKey] = $sourcePropertyValue;
      }
    }
  }
  return $target
}

function assignConcat($target, ...$sources) {
  if(!$target) { return $target}
  iterateSources: 
  for(const $source of $sources) {
    if(!$source) continue iterateSources
    for(const [
      $sourcePropertyKey, $sourcePropertyValue
    ] of Object.entries($source)) {
      const typeOfTargetPropertyValue = typeOf$1($target[$sourcePropertyKey]);
      const typeOfSourcePropertyValue = typeOf$1($sourcePropertyValue);
      if( 
        typeOfTargetPropertyValue === 'object' &&
        typeOfSourcePropertyValue === 'object'
      ) {
        $target[$sourcePropertyKey] = assignConcat($target[$sourcePropertyKey], $sourcePropertyValue);
      }
      else if(
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

const defaultAccessor = ($target, $property) => {
  if($property === undefined) { return $target }
  else { return $target[$property] }
};
var Accessors = {
  default: defaultAccessor};

const Options$3 = {
  depth: 0,
  maxDepth: 10,
  accessors: [Accessors.default],
  ancestors: [],
  values: false,
};
function compandTree$1($object, $options) {
  const _compandTree = [];
  const options = Object.assign({}, Options$3, $options, {
    ancestors: [].concat($options.ancestors)
  });
  options.depth++;
  if(options.depth > options.maxDepth) { return _compandTree }
  iterateAccessors: 
  for(const $accessor of options.accessors) {
    const accessor = $accessor.bind($object);
    const object = accessor($object);
    if(!object) { continue iterateAccessors }
    if(!options.ancestors.includes(object)) { options.ancestors.unshift(object); }
    for(const [$key, $value] of Object.entries(object)) {
      if(!options.values) { _compandTree.push($key); }
      else if(options.values) { _compandTree.push([$key, $value]); }
      if(
        typeof $value === 'object' &&
        $value !== null &&
        !Object.is($value, object) && 
        !options.ancestors.includes($value)
      ) {
        const subtargets = compandTree$1($value, options);
        if(!options.values) {
          for(const $subtarget of subtargets) {
            const path = [$key, $subtarget].join('.');
            _compandTree.push(path);
          }
        }
        else if(options.values) {
          for(const [$subtargetKey, $subtarget] of subtargets) {
            const path = [$key, $subtargetKey].join('.');
            _compandTree.push([path, $subtarget]);
          }
        }
      }
    }
  }
  return _compandTree
}

function typedObjectLiteral($value) {
  let _typedObjectLiteral;
  const typeOfValue = typeOf$1($value);
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

var regularExpressions = {
  quotationEscape: /\.(?=(?:[^"]*"[^"]*")*[^"]*$)/,
};

class Tree extends EventTarget {
  static expand($target, $property) {
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
        target[$targetKey] = Tree.set($property, targetValue);
      }
      else if(typeOfProperty === ValidPropertyTypes[1]) {
        target[$targetKey] = $property(targetValue);
      }
    }
    return target
  }
  static impand($target, $property) {
    const typeOfProperty = typeOf($property);
    const typeOfTarget = typeOf($target);
    if(
      !['string', 'function'].includes(typeOfProperty) ||
      !['array', 'object'].includes(typeOfTarget)
    ) { return $target }
    let target = typedObjectLiteral($target);
    for(const [$targetKey, $targetValue] of Object.entries($target)) {
      if(typeOfProperty === 'string') { target[$targetKey] = Tree.get($property, $targetValue); }
      else if(typeOfProperty === 'function') { target[$targetKey] = $property($targetValue); }
      if(target[$targetKey] && typeof target[$targetKey] === 'object') {
        target[$targetKey] = impandTree(target[$targetKey], $property);
      }
    }
    return target
  }
  static compand($target, $options) {
    const _compandTree = [];
    const options = Object.assign({}, Options, $options, {
      ancestors: [].concat($options.ancestors)
    });
    options.depth++;
    if(options.depth > options.maxDepth) { return _compandTree }
    iterateAccessors: 
    for(const $accessor of options.accessors) {
      const accessor = $accessor.bind($target);
      const target = accessor($target);
      if(!target) { continue iterateAccessors }
      if(!options.ancestors.includes(target)) { options.ancestors.unshift(target); }
      for(const [$key, $value] of Object.entries(target)) {
        if(!options.values) { _compandTree.push($key); }
        else if(options.values) { _compandTree.push([$key, $value]); }
        if(
          typeof $value === 'target' &&
          $value !== null &&
          !Object.is($value, target) && 
          !options.ancestors.includes($value)
        ) {
          const subtargets = compandTree($value, options);
          if(!options.values) {
            for(const $subtarget of subtargets) {
              const path = [$key, $subtarget].join('.');
              _compandTree.push(path);
            }
          }
          else if(options.values) {
            for(const [$subtargetKey, $subtarget] of subtargets) {
              const path = [$key, $subtargetKey].join('.');
              _compandTree.push([path, $subtarget]);
            }
          }
        }
      }
    }
    return _compandTree
  }
  static decompand($target, $options) {
    let _decompandTree;
    options.values;
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
    // return target
    return _decompandTree
  }
  static get($target, $path) {
    let value;
    return value
  }
  static set($target, $path, $value) {
    return $target
  }
  static delete($target, $path) {
    return
  }
  static implement($target) {
    for(const $staticMethod of [
      Tree.get, Tree.set, Tree.delete,
      Tree.impand, Tree.expand, 
      Tree.compand, Tree.decompand,
      Tree.getOwnPropertyDescriptors, Tree.getOwnPropertyDescriptor,
      Tree.defineProperties, Tree.defineProperty,
    ]) {
      Object.defineProperty($target, $staticMethod.name, {
        value: $staticMethod.bind(null, $target)
      });
    }
    return $target
  }
  constructor() {
    super();
    return Tree.implement(this)
  }

}

function decompandTree($compandTree, $options) {
  let _decompandTree;
  options.values;
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
  subtarget[key] = $source;
  // return target
  return _decompandTree
}

var isArrayLike = ($source) => {
  let isArrayLike;
  const typeOfSource = typeOf$1($source);
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
const ObjectKeys$1 = Object.keys(Objects);
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
  ObjectKeys: ObjectKeys$1,
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

var Options$2 = {
  typeCoercion: false,
};

function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const propertyDescriptor = Object.assign({}, $propertyDescriptor);
  const options = Object.assign({}, Options$2, $options);
  const typeOfPropertyValue = typeOf$1(propertyDescriptor.value);
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
  const options = Object.assign({}, Options$2, $options);
  for(const [
    $propertyKey, $propertyDescriptor
  ] of Object.entries($propertyDescriptors)) {
    defineProperty($target, $propertyKey, $propertyDescriptor, options);
  }
  return $target
}

const ValidPropertyTypes$1 = ['string', 'function'];
function expandTree$1($source, $property) {
  const typeOfProperty = typeOf$1($property);
  const typeOfSource = typeOf$1($source);
  if(
    !ValidPropertyTypes$1.includes(typeOfProperty) ||
    !ObjectKeys$1.includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral($source);
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    const sourceValue = (
      ObjectKeys$1.includes(typeOf$1($sourceValue))
    ) ? expandTree$1($sourceValue, $property) : $sourceValue;
    if(typeOfProperty === ValidPropertyTypes$1[0]) {
      target[$sourceKey] = undefined($property, sourceValue);
    }
    else if(typeOfProperty === ValidPropertyTypes$1[1]) {
      target[$sourceKey] = $property(sourceValue);
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

function impandTree$1($source, $property) {
  const typeOfProperty = typeOf$1($property);
  const typeOfSource = typeOf$1($source);
  if(
    !['string', 'function'].includes(typeOfProperty) ||
    !['array', 'object'].includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral($source);
  for(const [$sourceKey, $sourceValue] of Object.entries($source)) {
    if(typeOfProperty === 'string') { target[$sourceKey] = undefined($property, $sourceValue); }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue); }
    if(target[$sourceKey] && typeof target[$sourceKey] === 'object') {
      target[$sourceKey] = impandTree$1(target[$sourceKey], $property);
    }
  }
  return target
}

var Options$1 = {
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
  const options = Object.assign({}, Options$1, $options, {
    ancestors: Object.assign([], $options.ancestors)
  });
  const propertyDescriptor = Object.getOwnPropertyDescriptor($properties, $propertyKey);
  if(!options.nonenumerable && !propertyDescriptor.enumerable) { return }
  if(!options.ancestors.includes($properties)) { options.ancestors.unshift($properties); }
  if(options.ancestors.includes(propertyDescriptor.value)) { return }
  if(options.path) {
    options.path = (typeOf$1(options.path) === 'string') ? [options.path, $propertyKey].join(options.delimiter) : $propertyKey;
    propertyDescriptor.path = options.path;
  }
  if(options.type) { propertyDescriptor.type = typeOf$1(propertyDescriptor.value); }
  if(options.frozen) { propertyDescriptor.frozen = Object.isFrozen(propertyDescriptor.value); }
  if(options.sealed) { propertyDescriptor.sealed = Object.isSealed(propertyDescriptor.value); }
  if(['array', 'object'].includes(typeOf$1(propertyDescriptor.value))) {
    propertyDescriptor.value = getOwnPropertyDescriptors(propertyDescriptor.value, options);
  }
  return propertyDescriptor
}

function getOwnPropertyDescriptors($properties, $options) {
  const propertyDescriptors = {};
  const options = Object.assign({}, Options$1, $options);
  if(options.depth >= options.maxDepth) { return propertyDescriptors }
  else { options.depth++; }
  for(const [$propertyKey, $propertyDescriptor] of Object.entries(Object.getOwnPropertyDescriptors($properties))) {
    const propertyDescriptor = getOwnPropertyDescriptor($properties, $propertyKey, options);
    if(propertyDescriptor !== undefined) { propertyDescriptors[$propertyKey] = propertyDescriptor; }
  }
  return propertyDescriptors
}

export { Tree, assign, assignConcat, compandTree$1 as compandTree, decompandTree, defineProperties, defineProperty, expandTree$1 as expandTree, freeze, getOwnPropertyDescriptor, getOwnPropertyDescriptors, impandTree$1 as impandTree, isArrayLike, regularExpressions, typeOf$1 as typeOf, typedObjectLiteral, index as variables };
//# sourceMappingURL=recourse.js.map
