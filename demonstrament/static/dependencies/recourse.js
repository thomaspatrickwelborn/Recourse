function handleNoCommaBraces(span) {
    if (span.length < 3) {
        return "{" + span + "}";
    }
    var separatorI = -1;
    for (var i = 2; i < span.length; i++) {
        if (span[i] === '.' && span[i - 1] === '.' && (i < 2 || span[i - 2] !== '\\')) {
            if (separatorI > -1) {
                return "{" + span + "}";
            }
            separatorI = i - 1;
        }
    }
    if (separatorI > -1) {
        var rangeStart = span.substr(0, separatorI);
        var rangeEnd = span.substr(separatorI + 2);
        if (rangeStart.length > 0 && rangeEnd.length > 0) {
            return "[" + span.substr(0, separatorI) + "-" + span.substr(separatorI + 2) + "]";
        }
    }
    return "{" + span + "}";
}
function expand$1(pattern) {
    if (typeof pattern !== 'string') {
        throw new TypeError("A pattern must be a string, but " + typeof pattern + " given");
    }
    var scanning = false;
    var openingBraces = 0;
    var closingBraces = 0;
    var handledUntil = -1;
    var results = [''];
    var alternatives = [];
    var span;
    for (var i = 0; i < pattern.length; i++) {
        var char = pattern[i];
        if (char === '\\') {
            i++;
            continue;
        }
        if (char === '{') {
            if (scanning) {
                openingBraces++;
            }
            else if (i > handledUntil && !openingBraces) {
                span = pattern.substring(handledUntil + 1, i);
                for (var j = 0; j < results.length; j++) {
                    results[j] += span;
                }
                alternatives = [];
                handledUntil = i;
                scanning = true;
                openingBraces++;
            }
            else {
                openingBraces--;
            }
        }
        else if (char === '}') {
            if (scanning) {
                closingBraces++;
            }
            else if (closingBraces === 1) {
                span = pattern.substring(handledUntil + 1, i);
                if (alternatives.length > 0) {
                    var newResults = [];
                    alternatives.push(expand$1(span));
                    for (var j = 0; j < results.length; j++) {
                        for (var k = 0; k < alternatives.length; k++) {
                            for (var l = 0; l < alternatives[k].length; l++) {
                                newResults.push(results[j] + alternatives[k][l]);
                            }
                        }
                    }
                    results = newResults;
                }
                else {
                    span = handleNoCommaBraces(span);
                    for (var j = 0; j < results.length; j++) {
                        results[j] += span;
                    }
                }
                handledUntil = i;
                closingBraces--;
            }
            else {
                closingBraces--;
            }
        }
        else if (!scanning && char === ',' && closingBraces - openingBraces === 1) {
            span = pattern.substring(handledUntil + 1, i);
            alternatives.push(expand$1(span));
            handledUntil = i;
        }
        if (scanning && (closingBraces === openingBraces || i === pattern.length - 1)) {
            scanning = false;
            i = handledUntil - 1;
        }
    }
    if (handledUntil === -1) {
        return [pattern];
    }
    var unhandledFrom = pattern[handledUntil] === '{' ? handledUntil : handledUntil + 1;
    if (unhandledFrom < pattern.length) {
        span = pattern.substr(unhandledFrom);
        for (var j = 0; j < results.length; j++) {
            results[j] += span;
        }
    }
    return results;
}

function negate(pattern, options) {
    var supportNegation = options['!'] !== false;
    var supportParens = options['()'] !== false;
    var isNegated = false;
    var i;
    if (supportNegation) {
        for (i = 0; i < pattern.length && pattern[i] === '!'; i++) {
            if (supportParens && pattern[i + 1] === '(') {
                i--;
                break;
            }
            isNegated = !isNegated;
        }
        if (i > 0) {
            pattern = pattern.substr(i);
        }
    }
    return { pattern: pattern, isNegated: isNegated };
}

function escapeRegExpChar(char) { if (char === '-' ||
    char === '^' ||
    char === '$' ||
    char === '+' ||
    char === '.' ||
    char === '(' ||
    char === ')' ||
    char === '|' ||
    char === '[' ||
    char === ']' ||
    char === '{' ||
    char === '}' ||
    char === '*' ||
    char === '?' ||
    char === '\\') {
    return "\\" + char;
}
else {
    return char;
} }
function escapeRegExpString(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        result += escapeRegExpChar(str[i]);
    }
    return result;
}

function Pattern(source, options, excludeDot) {
    var separator = typeof options.separator === 'undefined' ? true : options.separator;
    var separatorSplitter = '';
    var separatorMatcher = '';
    var wildcard = '.';
    if (separator === true) {
        separatorSplitter = '/';
        separatorMatcher = '[/\\\\]';
        wildcard = '[^/\\\\]';
    }
    else if (separator) {
        separatorSplitter = separator;
        separatorMatcher = escapeRegExpString(separatorSplitter);
        if (separatorMatcher.length > 1) {
            separatorMatcher = "(?:" + separatorMatcher + ")";
            wildcard = "((?!" + separatorMatcher + ").)";
        }
        else {
            wildcard = "[^" + separatorMatcher + "]";
        }
    }
    else {
        wildcard = '.';
    }
    var requiredSeparator = separator ? separatorMatcher + "+?" : '';
    var optionalSeparator = separator ? separatorMatcher + "*?" : '';
    var segments = separator ? source.split(separatorSplitter) : [source];
    var support = {
        qMark: options['?'] !== false,
        star: options['*'] !== false,
        globstar: separator && options['**'] !== false,
        brackets: options['[]'] !== false,
        extglobs: options['()'] !== false,
        excludeDot: excludeDot && options.excludeDot !== false,
    };
    return {
        source: source,
        segments: segments,
        options: options,
        separator: separator,
        separatorSplitter: separatorSplitter,
        separatorMatcher: separatorMatcher,
        optionalSeparator: optionalSeparator,
        requiredSeparator: requiredSeparator,
        wildcard: wildcard,
        support: support,
    };
}
function Segment(source, pattern, isFirst, isLast) { return {
    source: source,
    isFirst: isFirst,
    isLast: isLast,
    end: source.length - 1,
}; }
function Result() {
return {
    match: '',
    unmatch: '',
    useUnmatch: false,
}; }
function State(pattern, segment, result) { return {
    pattern: pattern,
    segment: segment,
    result: result,
    openingBracket: segment.end + 1,
    closingBracket: -1,
    openingParens: 0,
    closingParens: 0,
    parensHandledUntil: -1,
    extglobModifiers: [],
    scanningForParens: false,
    escapeChar: false,
    addToMatch: true,
    addToUnmatch: pattern.support.extglobs,
    dotHandled: false,
    i: -1,
    char: '',
    nextChar: '',
}; }

var EXCLUDE_DOT_PATTERN = '(?!\\.)';
function add(state, addition, excludeDot) {
    if (state.addToUnmatch) {
        state.result.unmatch += addition;
    }
    if (state.addToMatch) {
        if (excludeDot && !state.dotHandled) {
            addition = EXCLUDE_DOT_PATTERN + addition;
        }
        state.dotHandled = true;
        state.result.match += addition;
    }
    return state.result;
}
function convertSegment(pattern, segment, result) {
    var support = pattern.support;
    var state = State(pattern, segment, result);
    var separatorMatcher = segment.isLast
        ? pattern.optionalSeparator
        : pattern.requiredSeparator;
    if (!support.excludeDot) {
        state.dotHandled = true;
    }
    if (segment.end === -1) {
        return segment.isLast && !segment.isFirst ? result : add(state, separatorMatcher);
    }
    if (support.globstar && segment.source === '**') {
        var prefix = !state.dotHandled ? EXCLUDE_DOT_PATTERN : '';
        var globstarSegment = prefix + pattern.wildcard + "*?" + separatorMatcher;
        return add(state, "(?:" + globstarSegment + ")*?");
    }
    while (++state.i <= segment.end) {
        state.char = state.segment.source[state.i];
        state.nextChar = state.i < segment.end ? segment.source[state.i + 1] : '';
        if (state.char === '\\') {
            if (state.i < state.segment.end) {
                state.escapeChar = true;
                continue;
            }
            else {
                state.char = '';
            }
        }
        var pattern = state.pattern, segment = state.segment, char = state.char, i = state.i;
        if (pattern.support.brackets && !state.scanningForParens) {
            if (i > state.openingBracket && i <= state.closingBracket) {
                if (state.escapeChar) {
                    add(state, escapeRegExpChar(char));
                }
                else if (i === state.closingBracket) {
                    add(state, ']');
                    state.openingBracket = segment.source.length;
                }
                else if (char === '-' && i === state.closingBracket - 1) {
                    add(state, '\\-');
                }
                else if (char === '!' && i === state.openingBracket + 1) {
                    add(state, '^');
                }
                else if (char === ']') {
                    add(state, '\\]');
                }
                else {
                    add(state, char);
                }
                state.escapeChar = false;
                continue;
            }
            if (i > state.openingBracket) {
                if (char === ']' &&
                    !state.escapeChar &&
                    i > state.openingBracket + 1 &&
                    i > state.closingBracket) {
                    state.closingBracket = i;
                    state.i = state.openingBracket;
                    if (pattern.separator) {
                        add(state, "(?!" + pattern.separatorMatcher + ")[", true);
                    }
                    else {
                        add(state, '[', true);
                    }
                }
                else if (i === segment.end) {
                    add(state, '\\[');
                    state.i = state.openingBracket;
                    state.openingBracket = segment.source.length;
                    state.closingBracket = segment.source.length;
                }
                state.escapeChar = false;
                continue;
            }
            if (char === '[' &&
                !state.escapeChar &&
                i > state.closingBracket &&
                i < segment.end) {
                state.openingBracket = i;
                state.escapeChar = false;
                continue;
            }
        }
        if (state.pattern.support.extglobs) {
            var extglobModifiers = state.extglobModifiers, char = state.char, nextChar = state.nextChar, i = state.i;
            if (nextChar === '(' &&
                !state.escapeChar &&
                (char === '@' || char === '?' || char === '*' || char === '+' || char === '!')) {
                if (state.scanningForParens) {
                    state.openingParens++;
                }
                else if (i > state.parensHandledUntil && !state.closingParens) {
                    state.parensHandledUntil = i;
                    state.scanningForParens = true;
                    state.openingParens++;
                }
                else if (state.closingParens >= state.openingParens) {
                    if (char === '!') {
                        state.addToMatch = true;
                        state.addToUnmatch = false;
                        add(state, state.pattern.wildcard + "*?", true);
                        state.addToMatch = false;
                        state.addToUnmatch = true;
                        state.result.useUnmatch = true;
                    }
                    extglobModifiers.push(char);
                    add(state, '(?:', true);
                    state.openingParens--;
                    state.i++;
                    continue;
                }
                else {
                    state.openingParens--;
                }
            }
            else if (char === ')' && !state.escapeChar) {
                if (state.scanningForParens) {
                    state.closingParens++;
                }
                else if (extglobModifiers.length) {
                    var modifier_1 = extglobModifiers.pop();
                    if (modifier_1 === '!' && extglobModifiers.indexOf('!') !== -1) {
                        throw new Error("Nested negated extglobs aren't supported");
                    }
                    modifier_1 = modifier_1 === '!' || modifier_1 === '@' ? '' : modifier_1;
                    add(state, ")" + modifier_1);
                    state.addToMatch = true;
                    state.addToUnmatch = true;
                    state.closingParens--;
                    continue;
                }
            }
            else if (char === '|' && state.closingParens &&
                !state.scanningForParens &&
                !state.escapeChar) {
                add(state, '|');
                continue;
            }
            if (state.scanningForParens) {
                if (state.closingParens === state.openingParens || i === state.segment.end) {
                    state.scanningForParens = false;
                    state.i = state.parensHandledUntil - 1;
                }
                state.escapeChar = false;
                continue;
            }
        }
        var pattern = state.pattern;
        var support = pattern.support;
        if (!state.escapeChar && support.star && state.char === '*') {
            if (state.i === state.segment.end || state.nextChar !== '*') {
                add(state, pattern.wildcard + "*?", true);
            }
        }
        else if (!state.escapeChar && support.qMark && state.char === '?') {
            add(state, pattern.wildcard, true);
        }
        else {
            add(state, escapeRegExpChar(state.char));
        }
        state.escapeChar = false;
    }
    return add(state, separatorMatcher);
}
function convert(source, options, excludeDot) {
    var pattern = Pattern(source, options, excludeDot);
    var result = Result();
    var segments = pattern.segments;
    for (var i = 0; i < segments.length; i++) {
        var segment = Segment(segments[i], pattern, i === 0, i === segments.length - 1);
        convertSegment(pattern, segment, result);
    }
    if (result.useUnmatch) {
        return "(?!^" + result.unmatch + "$)" + result.match;
    }
    else {
        return result.match;
    }
}

function flatMap(array, predicate) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
        var mappedValue = predicate(array[i]);
        for (var j = 0; j < mappedValue.length; j++) {
            results.push(mappedValue[j]);
        }
    }
    return results;
}
function compile(patterns, options) {
    patterns = Array.isArray(patterns) ? patterns : [patterns];
    if (options['{}'] !== false) {
        patterns = flatMap(patterns, expand$1);
    }
    var positiveResults = [];
    var negativeResults = [];
    var result = '';
    for (var i = 0; i < patterns.length; i++) {
        var negatedPattern = negate(patterns[i], options);
        var convertedPattern = convert(negatedPattern.pattern, options, !negatedPattern.isNegated);
        if (negatedPattern.isNegated) {
            negativeResults.push(convertedPattern);
        }
        else {
            positiveResults.push(convertedPattern);
        }
    }
    if (negativeResults.length) {
        result = "(?!(?:" + negativeResults.join('|') + ")$)";
    }
    if (positiveResults.length > 1) {
        result += "(?:" + positiveResults.join('|') + ")";
    }
    else if (positiveResults.length === 1) {
        result += positiveResults[0];
    }
    else if (result.length) {
        result += convert('**', options, true);
    }
    return "^" + result + "$";
}
function isMatch(regexp, sample) { if (typeof sample !== 'string') {
    throw new TypeError("Sample must be a string, but " + typeof sample + " given");
} return regexp.test(sample); }
/**
 * Compiles one or more glob patterns into a RegExp and returns an isMatch function.
 * The isMatch function takes a sample string as its only argument and returns true
 * if the string matches the pattern(s).
 *
 * ```js
 * outmatch('src/*.js')('src/index.js') //=> true
 * ```
 *
 * ```js
 * const isMatch = outmatch('*.example.com', '.')
 * isMatch('foo.example.com') //=> true
 * isMatch('foo.bar.com') //=> false
 * ```
 */
function outmatch(pattern, options) {
    if (typeof pattern !== 'string' && !Array.isArray(pattern)) {
        throw new TypeError("The first argument must be a single pattern string or an array of patterns, but " + typeof pattern + " given");
    }
    if (typeof options === 'string' || typeof options === 'boolean') {
        options = { separator: options };
    }
    if (arguments.length === 2 &&
        !(typeof options === 'undefined' ||
            (typeof options === 'object' && options !== null && !Array.isArray(options)))) {
        throw new TypeError("The second argument must be an options object or a string/boolean separator, but " + typeof options + " given");
    }
    options = options || {};
    if (options.separator === '\\') {
        throw new Error('\\ is not a valid separator');
    }
    var regexpPattern = compile(pattern, options);
    var regexp = new RegExp(regexpPattern, options.flags);
    var fn = isMatch.bind(null, regexp);
    fn.options = options;
    fn.pattern = pattern;
    fn.regexp = regexp;
    return fn;
}

function splitPath($path, $pathParseInteger) {
  const subpathDelimiters = /([a-zA-Z_][a-zA-Z0-9_]*)|(\d+)|\["([^"]*)"\]|"([^"]*)"|\./g;
  const subpaths = [];
  let match;
  while((match = subpathDelimiters.exec($path)) !== null) {
    if(match[1]) { subpaths.push(match[1]); }
    else if(match[2]) {
      if($pathParseInteger) { subpaths.push(parseInt(match[2], 10)); }
      else { subpaths.push(match[2]); }
    }
    else if(match[3]) { subpaths.push(match[3]); }
    else if(match[4]) { subpaths.push(match[4]); }
  }
  return subpaths
}

var typeOf = ($operand) => Object
  .prototype
  .toString
  .call($operand).slice(8, -1).toLowerCase();

const AssignmentClassOptions = ($propertyAssignment = {}) => {
  return (typeof $propertyAssignment === 'string')
    ? { primitive: $propertyAssignment, object: $propertyAssignment }
    : Object.assign({ primitive: 'assign', object: 'assign' }, $propertyAssignment)
};
const AssignmentOptions = ($assignments = {}) => { return {
  object: AssignmentClassOptions($assignments.object), 
  array: AssignmentClassOptions($assignments.array), 
  map: AssignmentClassOptions($assignments.map), 
  // set: { primitive: 'assign', object: 'assign' }, 
} };
const EntityOptions = ($entityOptions = {}) => Object.assign({
  enumerable: true, nonenumerable: false, returnValue: 'receiver'
}, $entityOptions);
const PathOptions = ($pathOptions = {}) => Object.assign({
  delimiter: '.', pathMatch: false, 
  pathMatchMax: 100, pathParseInteger: false, 
}, $pathOptions);
const RecurseOptions = ($recurseOptions = {}) => { 
  const ancestors = [].concat($recurseOptions.ancestors || []);
  const maxDepth = ($recurseOptions.maxDepth) ? $recurseOptions.maxDepth : 10;
  let depth = ($recurseOptions.depth) ? $recurseOptions.depth : 0;
  return Object.assign(Object.defineProperties({}, {
    ancestors: {
      enumerable: true,
      get() { return ancestors },
      set($ancestor) {
        if($ancestor && typeof $ancestor === 'object') {
          if(ancestors.includes($ancestor)) {
            throw new Error(null)
          }
          else { ancestors.unshift($ancestor); }
        }
      },
    },
    depth: {
      enumerable: true,
      get() { return depth },
      set($depth) {
        if($depth <= maxDepth) { depth = ($depth === undefined) ? depth : $depth; }
        else { throw new Error(null) }
      }
    }
  }), $recurseOptions, { depth, maxDepth })
};
const TensorOptions = ($tensorOptions = {}) => Object.assign({
  getters: $tensorOptions.getters || [Getters.Object, Getters.Map, /* Getters.Set */],
  setters: $tensorOptions.setters || [Setters.Object, Setters.Map, /* Setters.Set */],
  deleters: $tensorOptions.deleters || [Deleters.Object, Deleters.Map, /* Deleters.Set */],
  typeValidators: $tensorOptions.typeValidators || [TypeValidators.Object, TypeValidators.Map, /* TypeValidators.Set */],
  returners: $tensorOptions.returners || [Returners.Object, Returners.Map, /* Returners.Set */],
});
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
};
const Defaults = ($options) => {
  $options = ($options) ? $options : {};
  Object.assign($options, {
    assignments: AssignmentOptions($options.assignments),
    entities: EntityOptions($options.entities),
    path: PathOptions($options.path),
    recurse: RecurseOptions($options.recurse),
    tensors: TensorOptions($options.tensors),
  });
  return $options
};
function Options($classGroup, $methodName, $options) {
  const methodOptions = MethodOptions[$classGroup][$methodName];
  const defaultOptions = Defaults($options);
  const options = Object.assign(defaultOptions, methodOptions, $options);
  return Object.assign({}, options)
}

function getOwnPropertyDescriptors($source, $options = {}) {
  const options = Options('object', 'getOwnPropertyDescriptors', $options);
  const propertyDescriptors = {};
  const typeOfSource = typeOf($source);
  const propertyDescriptorKeys = (['array', 'object'].includes(typeOfSource))
    ? Object.keys(Object.getOwnPropertyDescriptors($source))
    : (typeOfSource == 'map')
    ? Array.from($source.keys())
    : [];
  for(const $propertyKey of propertyDescriptorKeys) {
    const propertyDescriptor = getOwnPropertyDescriptor($source, $propertyKey, options);
    if(propertyDescriptor) { propertyDescriptors[$propertyKey] = propertyDescriptor; }
  }
  return propertyDescriptors
}

const ObjectLiterals = {
  get object() { return {} },
  get array() { return [] },
  get eventtarget() { return new EventTarget() },
  get map() { return new Map() },
  // get set() { return new Set() },
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
  'eventtarget': EventTarget,
  'map': Map,
  // 'set': Set, 
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
    ObjectLiterals: ObjectLiterals,
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

function getOwnPropertyDescriptor($source, $propertyKey, $options = {}) {
  const options = Options('object', 'getOwnPropertyDescriptors', $options);
  const { entities, propertyPath, path, recurse } = options;
  const { maxDepth } = recurse;
  try { recurse.depth++; } catch($err) { return }
  const tensorProxy = new TensorProxy(options);
  const propertyValue = tensorProxy.get($source, $propertyKey);
  try { recurse.ancestors = propertyValue; } catch($err) { return }
  const typeOfSource = typeOf($source);
  const propertyDescriptor = (typeOfSource !== 'map')
    ? Object.getOwnPropertyDescriptor($source, $propertyKey)
    : (typeOfSource === 'map')
    ? { configurable: false, enumerable: true, value: propertyValue, writable: true }
    : undefined;
  if(!propertyDescriptor) return undefined
  if(!entities.nonenumerable && !propertyDescriptor.enumerable) { return }
  if(propertyPath) {
     path.string = (typeOf(path.string) === 'string')
      ? [path.string, $propertyKey].join(path.delimiter)
      : $propertyKey;
    propertyDescriptor.path = path.string;
  }
  if(options.type) { propertyDescriptor.type = typeOf(propertyValue); }
  if(options.frozen) { propertyDescriptor.frozen = Object.isFrozen(propertyValue); }
  if(options.sealed) { propertyDescriptor.sealed = Object.isSealed(propertyValue); }
  if(maxDepth > 1 && ObjectKeys.includes(typeOf(propertyValue))) {
    propertyDescriptor.value = getOwnPropertyDescriptors(propertyValue, options);
  }
  else {
    propertyDescriptor.value = propertyValue;
  }
  return propertyDescriptor
}

var isNumerable = ($entityOptions, $propertyDescriptor) => {
  const { enumerable } = $propertyDescriptor;
  return (
    ($entityOptions.enumerable && enumerable) ||
    ($entityOptions.nonenumerable && !enumerable)
  )
};

function entities($source, $type, $options = {}) {
  const sourceEntities = [];
  const options = Options('object', 'entities', $options);
  const { recurse } = options;
  const { enumerable, nonenumerable } = options.entities;
  const { pathParseInteger } = options.path;
  const { maxDepth } = recurse;
  try { recurse.depth++; } catch($err) { return }
  try { recurse.ancestors = $source; } catch($err) {}
  const tensorProxy = new TensorProxy(options);
  const source = tensorProxy.get($source);
  const propertyDescriptorKeys = (typeOf(source) === 'map')
    ? source.keys()
    : (nonenumerable) 
    ? Object.keys(Object.getOwnPropertyDescriptors(source))
    : Object.keys(source);
  iterateSourcePropertyDescriptors: 
  for(let $propertyKey of propertyDescriptorKeys) {
    if(!isNaN($propertyKey) && pathParseInteger) {
      $propertyKey = parseInt($propertyKey, 10);
    }
    const value = tensorProxy.get($source, $propertyKey);
    const propertyDescriptor = getOwnPropertyDescriptor(
      $source, $propertyKey, Object.assign(
        {}, options, { recurse: { depth: 0, maxDepth: 1 } }
    ));
    if(isNumerable(options.entities, propertyDescriptor)) {
      const typeOfValue = typeOf(value);
      try { recurse.ancestors = value; } catch($err) { continue iterateSourcePropertyDescriptors }
      if(
        maxDepth > 1 && 
        ObjectKeys.includes(typeOfValue)
      ) {
        const subentities = entities(value, $type, options);
        if(subentities.length) {
          if($type === 'entries') { sourceEntities.push([$propertyKey, subentities]); }
          else if($type === 'values') { sourceEntities.push(subentities); }
          else if($type === 'keys') { sourceEntities.push($propertyKey, subentities); }
        }
        else {
          if($type === 'entries') { sourceEntities.push([$propertyKey, value]); }
          else if($type === 'values') { sourceEntities.push(value); }
          else if($type === 'keys') { sourceEntities.push($propertyKey); }
        }
      }
      else {
        if($type === 'entries') { sourceEntities.push([$propertyKey, value]); }
        else if($type === 'values') { sourceEntities.push(value); }
        else if($type === 'keys') { sourceEntities.push($propertyKey); }
      }
    }
  }
  return sourceEntities
}

function isArrayLike($source, $strict = false) {
  let isArrayLike;
  const typeOfSource = typeOf($source);
  if(typeOfSource === 'array') { isArrayLike = true; }
  else if(
    typeOfSource === 'object' &&
    $source.length >= 0 && 
    Number.isInteger($source.length)
  ) {
    if($strict === false) { isArrayLike = true; }
    else {
      iterateSourceKeys: 
      for(const $sourceKey of entities(
        $source, 'keys', { recurse: { maxDepth: 1 } }
      ).reverse()) {
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

function isObjectClass($value) {
  return $value !== null && typeof $value === "object";
}

function isPrimitiveClass($value) {
  return $value === null || (typeof $value !== "object" && typeof $value !== "function");
}

function typeOfClass($operand) {
  if(isObjectClass($operand)) { return 'object' }
  if(isPrimitiveClass($operand)) { return 'primitive' }
}

function PropertyTransformer($assignments, $newProperty, $target, $property, $value) {
  if(isNaN($property)) { return $property }
  if(PropertyAssigner($assignments, $target, $property, $value) === 'push') {
    switch(typeOf($property)) {
      case 'string': return String(Number($newProperty))
      case 'number': return $newProperty
      default: return $property
    }
  }
  else { return $property }
}
function PropertyAssigner($assignments, $target, $property, $value) {
  const targetType = typeOf($target);
  const targetAssignmentMethodDefinition = $assignments[targetType];
  const typeofTargetAssignmentDefinition = typeof targetAssignmentMethodDefinition;
  switch(typeofTargetAssignmentDefinition) {
    case 'string': return targetAssignmentMethodDefinition; 
    case 'object': return targetAssignmentMethodDefinition[typeOfClass($value)]; 
    default: return $property; 
  }
}

// Object Type Validator
const TypeValidator$1 = ($target) => (
    !($target instanceof Map) &&
    ['array', 'object'].includes(typeof $target)
  );
// Object Getter
function Getter$1($returner, ...$arguments) {
  if($arguments.length === 1) {
    const [$target] = $arguments;
    return $returner($target)
  }
  else {
    const [$target, $property] = $arguments;
    return $returner($property, $target[$property])
  }
}
// Object Setter
function Setter$1($returner, ...$arguments) {
  if(['string', 'number'].includes(typeOf($arguments[1]))) {
    let [$target, $property, $value] = $arguments;
    $property = PropertyTransformer(
      this.options.assignments, $target.length, ...$arguments
    );
    $target[$property] = $value;
    return $returner($property, $target[$property])
  }
  else {
    const [$target, $source] = $arguments;
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey];
    }
    if(isTargetArrayLike) { $target.length = 0; }
    for(let [$sourceProperty, $sourceValue] of Object.entries($source)) {
      $sourceProperty = PropertyTransformer(
        this.options.assignments, $target.length, $target, $sourceProperty, $sourceValue
      );
      $target[$sourceProperty] = $sourceValue;
    }
    return $returner($target)
  }
}
// Object Deleter
function Deleter$1($returner, ...$arguments) {
  const [$target, $property] = $arguments;
  if(['string', 'number'].includes(typeOf($property))) {
    delete $target[$property];
    return $returner($property, $target[$property])
  }
  else {
    for(const $targetKey of Object.keys($target)) {
      delete $target[$targetKey];
    }
    return $returner($target)
  }
}
// Object Returner
function Returner$1(...$arguments) {
  return $arguments.at(-1)
}

function isMapLike($source, $strict = false) {
  let isMapLike;
  const typeOfSource = typeOf($source);
  if(typeOfSource === 'map') { isMapLike = true; }
  else if(
    typeOfSource === 'object' &&
    $source.size >= 0 && 
    Number.isInteger($source.size)
  ) {
    if($strict === false) { isMapLike = true; }
    else {
      iterateSourceEntries: 
      for(const $sourceEntity of entities(
        $source, 'entries', { recurse: { maxDepth: 1 } }
      )) {
        if(
          isArrayLike($sourceEntity, $strict) ||
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

// Map Type Validator
const TypeValidator = ($target) => ($target instanceof Map);
// Map Getter
function Getter($returner, ...$arguments) {
  if($arguments.length === 1) {
    let [$receiver] = $arguments;
    return $returner($receiver)
  }
  else {
    let [$receiver, $property] = $arguments;
    return $returner($property, $receiver.get($property))
  }
}
// Map Setter
function Setter($returner, ...$arguments) {
  if($arguments.length === 2) {
    let [$receiver, $source] = $arguments;
    $receiver.clear();
    const sourceEntries = $source.entries();
    for(let [$sourceProperty, $sourceValue] of sourceEntries) {
      $sourceProperty = PropertyTransformer(
        this.options.assignments, $receiver.size, $target, $sourceProperty, $sourceValue
      );
      $receiver.set($sourceProperty, $sourceValue);
    }
    return $returner($receiver)
  }
  else {
    let [$receiver, $property, $value] = $arguments;
    $property = PropertyTransformer(
      this.options.assignments, $receiver.size, $receiver, $property, $value
    );
    $receiver.set($property, $value);
    return $returner($property, $receiver.get($property))
  }
}
// Map Deleter
function Deleter($returner, ...$arguments) {
  if($arguments.length === 2) {
    let [$receiver, $property] = $arguments;
    return $returner($property, $receiver.delete($property))
  }
  else {
    let [$receiver] = $arguments;
    return $returner($receiver.clear())
  } 
}
// Map Returner
function Returner(...$arguments) {
  const { returnValue } = this.options.entities;
  if($arguments.length === 1) {
    const [$value] = $arguments;
    switch(returnValue) {
      case 'receiver': return $value
      case 'target': return $value.entries()
    }
  }
  else {
    const [$property, $value] = $arguments;
    switch(returnValue) {
      case 'receiver': case 'target': return $value
    }
  }
}

// import * as SetTensors from './set/index.js'
const Getters = {
  Object: Getter$1, 
  Map: Getter, 
  // Set: SetTensors.Getter, 
};
const Setters = {
  Object: Setter$1, 
  Map: Setter, 
  // Set: SetTensors.Setter, 
};
const Deleters = {
  Object: Deleter$1, 
  Map: Deleter, 
  // Set: SetTensors.Deleter, 
};
const TypeValidators = {
  Object: TypeValidator$1, 
  Map: TypeValidator, 
  // Set: SetTensors.TypeValidator, 
};
const Returners = {
  Object: Returner$1, 
  Map: Returner, 
  // Set: SetTensors.TypeValidator, 
};
function Cess($tensors, ...$arguments) {
  const { returners, typeValidators } = this;
  const [$target] = $arguments;
  let tensorIndex = 0;
  for(const $typeValidator of typeValidators) {
    const returner = returners[tensorIndex];
    if($typeValidator($target)) { return $tensors[tensorIndex](returner, ...$arguments) }
    tensorIndex++;
    if(tensorIndex === typeValidators.length) { throw new Error(null) }
  }
}
class TensorProxy extends EventTarget {
  constructor($options) {
    super();
    this.options = $options;
    this.returners;
  }
  get typeValidators() { return Object.defineProperty(this, 'typeValidators', {
    value: this.options.tensors.typeValidators
  })['typeValidators'] }
  get getters() {
    const getters = [];
    for(const $getter of this.options.tensors.getters) { getters.push($getter.bind(this)); }
    return Object.defineProperty(this, 'getters', { value: getters })['getters']
  }
  get setters() {
    const setters = [];
    for(const $setter of this.options.tensors.setters) { setters.push($setter.bind(this)); }
    return Object.defineProperty(this, 'setters', { value: setters })['setters']
  }
  get deleters() {
    const deleters = [];
    for(const $deleter of this.options.tensors.deleters) { deleters.push($deleter.bind(this)); }
    return Object.defineProperty(this, 'deleters', { value: deleters })['deleters']
  }
  get returners() {
    const returners = [];
    for(const $returner of this.options.tensors.returners) { returners.push($returner.bind(this)); }
    return Object.defineProperty(this, 'returners', { value: returners })['returners']
  }
  get get() { return Object.defineProperty(this, 'get', {
    value: Cess.bind(this, this['getters'])
  })['get'] }
  get set() { return Object.defineProperty(this, 'set', {
    value: Cess.bind(this, this['setters'])
  })['set'] }
  get delete() { return Object.defineProperty(this, 'delete', {
    value: Cess.bind(this, this['deleters'])
  })['delete'] }
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Deleters: Deleters,
    Getters: Getters,
    Returners: Returners,
    Setters: Setters,
    TensorProxy: TensorProxy,
    TypeValidators: TypeValidators
});

function compand($source, $options) {
  const compandment = [];
  const options = Options('object', 'compand', $options);
  const { entities, recurse } = options;
  try { recurse.depth++; } catch($err) { return compandment }
  const tensor = new TensorProxy(options);
  const source = tensor.get($source);
  try { recurse.ancestors = $source; } catch($err) { return compandment }
  const sourceDescriptors = Object.entries(Object.getOwnPropertyDescriptors(source));
  iterateSourceEntries: 
  for(let [$sourceKey, $sourceDescriptor] of sourceDescriptors) {
    if(isNumerable(entities, $sourceDescriptor)) {
      const $sourceValue = tensor.get($source, $sourceKey);
      try { recurse.ancestors = $sourceValue; } catch($err) { continue iterateSourceEntries }
      compandment.push([$sourceKey, $sourceValue]);
      if($sourceValue && typeof $sourceValue === 'object') {
        compandment.push(...compand($sourceValue, options));
      }
    }
  }
  return compandment
}

function getProperty($target, $path, $options = {}) {
  const options = Options('map', 'get', $options);
  const { pathMatch, pathParseInteger } = options.path;
  const tensorProxy = new TensorProxy(options);
  if($path === undefined) { return tensorProxy.get($target, options) }
  const subpaths = splitPath($path, pathParseInteger);
  if(!pathMatch) {
    let subtarget = $target;
    iterateSubpaths: 
    for(const $subpath of subpaths) {
      try {
        subtarget = tensorProxy.get(subtarget, $subpath);
        if(subtarget === undefined) { break iterateSubpaths } 
      }
      catch($err) { break iterateSubpaths }
    }
    return subtarget
  }
  else {
    const subtargets = [];
    const compandEntries = compand($target, options);
    const propertyPathMatcher = outmatch($path, { separator: '.' });
    for(const [$propertyPath, $propertyValue] of compandEntries) {
      const propertyPathMatch = propertyPathMatcher($propertyPath, );
      if(propertyPathMatch === true) { subtargets.push([$propertyPath, $propertyValue]); }
    }
    return subtargets
  }
}

function setProperty() {
  const $arguments = [...arguments];
  const [$target, $path, $value, $options] = $arguments;
  const options = Options('map', 'set', $options);
  const { pathMatch, pathParseInteger } = options.path;
  if(!pathMatch) {
    const tensorProxy = new TensorProxy(options);
    if(typeOf($arguments[1]) === 'string') {
      const { enumerable, nonenumerable } = options.entities;
      tensorProxy.get($target);
      const subpaths = splitPath($path, pathParseInteger);
      const key = subpaths.pop();
      let subtarget = $target;
      iterateSubpaths: 
      for(const $subpath of subpaths) {
        subtarget = tensorProxy.get(subtarget, $subpath, options) || tensorProxy.set(
          subtarget, $subpath, isNaN($subpath) ? {} : []
        );
        if(subtarget === undefined) { break iterateSubpaths } 
      }
      tensorProxy.set(subtarget, key, $value, options);
      return $target
    }
    else {
      const [$target, $value] = $arguments;
      return $target
    }
  }
  else {
    const subtargets = [];
    const compandEntries = compand($target, options);
    const propertyPathMatcher = outmatch($path, { separator: '.' });
    for(const [$propertyPath, $propertyValue] of compandEntries) {
      const propertyPathMatch = propertyPathMatcher($propertyPath, { separator: '.' });
      if(propertyPathMatch === true) {
        setProperty($target, $propertyPath, $value, {
          path: { pathMatch: false, pathParseInteger: pathParseInteger }
        });
        subtargets.push([$propertyPath, $value]);
      }
    }
    return subtargets
  }
}

function deleteProperty($target, $path, $options) {
  const options = Options('map', 'delete', $options);
  const { pathMatch, pathParseInteger } = options.path;
  if(!pathMatch) {
    const tensorProxy = new TensorProxy(options);
    const subpaths = splitPath($path, pathParseInteger);
    const key = subpaths.pop();
    const subtarget = getProperty($target, subpaths.join('.'), options) || $target;
    tensorProxy.delete(subtarget, key);
  }
  else {
    const subtargets = [];
    const compandEntries = compand($target, options);
    const propertyPathMatcher = outmatch($path, { separator: '.' });
    for(const [$propertyPath, $propertyValue] of compandEntries) {
      const propertyPathMatch = propertyPathMatcher($propertyPath, { separator: '.' });
      if(propertyPathMatch === true) {
        deleteProperty($target, $propertyPath, {
          path: { pathMatch: false, pathParseInteger: pathParseInteger }
        });
        subtargets.push([$propertyPath, undefined]);
      }
    }
    return subtargets
  }
}

function typedObjectLiteral($source, $options) {
  const { resemble, strict } = Options('utilities', 'typedObjectLiteral', $options);
  const typeOfSource = typeOf($source);
  if(typeOfSource === 'string') { return ObjectLiterals[$source.toLowerCase()] }
  else if(!resemble) { return ObjectLiterals[typeOfSource] }
  else if(resemble) {
    if(isArrayLike($source, strict)) { return ObjectLiterals['array'] }
    else if(isMapLike($source, strict)) { return ObjectLiterals['map'] }
    // else if(isSetLike($source, strict)) { return ObjectLiterals['set'] }
    else { return ObjectLiterals['object'] }
  }
  else { return null }
}

const ValidPathTypes = ['string', 'function'];
function expand($source, $path, $options = {}) {
  const options = Options('object', 'expand', $options);
  const { resemble, strict } = options;
  const typeOfPath = typeOf($path);
  const typeOfSource = typeOf($source);
  if(
    !ValidPathTypes.includes(typeOfPath) ||
    !ObjectKeys.includes(typeOfSource)
  ) { return $source }
  let target = typedObjectLiteral($source, { resemble, strict });
  const sourceEntries = entities(
    $source, 'entries', Object.assign({}, options, { recurse: { maxDepth: 1 } })
  );
  for(const [$sourceKey, $sourceValue] of sourceEntries) {
    const targetValue = (ObjectKeys.includes(typeOf($sourceValue)))
      ? expand($sourceValue, $path, options)
      : $sourceValue;
    if(typeOfPath === ValidPathTypes[0]) {
      target[$sourceKey] = setProperty({}, $path, targetValue, options);
    }
    else if(typeOfPath === ValidPathTypes[1]) {
      target[$sourceKey] = $path(targetValue);
    }
  }
  return target
}

function impand($source, $property, $options = {}) {
  const options = Options('object', 'impand', $options);
  const { recurse, resemble, strict } = options;
  const { maxDepth } = recurse;
  try { recurse.depth++; } catch($err) { return }
  const source = new TensorProxy(options).get($source);
  if(!recurse.ancestors.includes(source)) { recurse.ancestors = source; }
  const typeOfProperty = typeOf($property);
  let target = typedObjectLiteral($source, { resemble, strict });
  for(const [$sourceKey, $sourceValue] of entities(
    $source, 'entries', Object.assign({}, options, { recurse: { maxDepth: 1 } })
  )) {
    if(typeOfProperty === 'string') { target[$sourceKey] = getProperty($sourceValue, $property); }
    else if(typeOfProperty === 'function') { target[$sourceKey] = $property($sourceValue); }
    if(target[$sourceKey] && typeof target[$sourceKey] === 'object') {
      target[$sourceKey] = impand(target[$sourceKey], $property);
    }
  }
  return target
}

function decompand($compandEntries, $options = {}) {
  const options = Options('object', 'decompand', $options);
  const typeOfCompandEntries = typeOf($compandEntries);
  let compandEntries;
  switch(typeOfCompandEntries) {
    case 'array': compandEntries = $compandEntries; break
    case 'object': compandEntries = Object.entries($compandEntries); break
    case 'map': compandEntries = $compandEntries.entries(); break
  }
  const decompandment = (isNaN(compandEntries[0][0])) ? {} : [];
  for(const [$propertyPath, $propertyValue] of $compandEntries) {
    setProperty(decompandment, $propertyPath, $propertyValue, options);
  }
  return decompandment
}

function assign($target, $options, ...$sources) {
  if(!$target) { return $target}
  const options = Options('object', 'assign', $options);
  const entityOptions = Options('object', 'entities', Object.assign({}, options, {
    entities: Object.assign(options.entities, { nonenumerable: true, enumerable: true }), 
    recurse: Object.assign(options.recurse, { depth: 0, maxDepth: 1 })
  }));
  const { assignments, /*entities,*/ recurse } = options;
  try { recurse.depth++; } catch($err) { return $target }
  const tensorProxy = new TensorProxy(options);
  typeOf($target);
  iterateSources: 
  for(const $source of $sources) {
    if(!ObjectKeys.includes(typeOf($source))) continue iterateSources
    const sourceEntries = entities($source, 'entries', entityOptions);
    iterateSourceEntries: 
    for(const [$sourcePropertyKey, $sourcePropertyDescriptor] of sourceEntries) {
        const $sourcePropertyValue = tensorProxy.get($source, $sourcePropertyKey);
        try { recurse.ancestors = $sourcePropertyValue; } catch($err) { continue iterateSourceEntries }
        const targetPropertyValue = tensorProxy.get($target, $sourcePropertyKey);
        const typeOfTargetPropertyValue = typeOf(targetPropertyValue);
        const typeOfSourcePropertyValue = typeOf($sourcePropertyValue);
        if(
          ObjectKeys.includes(typeOfSourcePropertyValue) &&
          ObjectKeys.includes(typeOfTargetPropertyValue) &&
          PropertyAssigner(
            assignments, $target, $sourcePropertyKey, $sourcePropertyValue
          ) === 'assign'
        ) {
          assign(targetPropertyValue, options, $sourcePropertyValue);
        }
        else {
          tensorProxy.set($target, $sourcePropertyKey, $sourcePropertyValue);
        }
    }
  }
  return $target
}

function defineProperty($target, $propertyKey, $propertyDescriptor, $options) {
  const options = Options('object', 'defineProperty', $options);
  const { strict, resemble } = options;
  const tensorProxy = new TensorProxy(options);
  const propertyDescriptor = Object.assign({}, $propertyDescriptor);
  const targetPropertyValue = tensorProxy.get($target, $propertyKey);
  let propertyDescriptorValue = propertyDescriptor.value;
  const typeOfPropertyDescriptorValue = typeOf(propertyDescriptor.value);
  const typeOfTargetPropertyValue = typeOf(targetPropertyValue);
  if(ObjectKeys.includes(typeOfPropertyDescriptorValue)) {
    if(ObjectKeys.includes(typeOfTargetPropertyValue)) {
      propertyDescriptor.value = defineProperties(targetPropertyValue, propertyDescriptorValue, options);
    }
    else {
      const propertyValueTarget = typedObjectLiteral(
        propertyDescriptor.type || propertyDescriptorValue,
        { resemble, strict }
      );
      propertyDescriptor.value = defineProperties(propertyValueTarget, propertyDescriptorValue, options);
    }
  }
  else if(options.typeCoercion) {
    try { propertyDescriptor.value = new Primitives[propertyDescriptor.type](propertyDescriptorValue); }
    catch($err) { console.error($err); }
  }
  Object.defineProperty($target, $propertyKey, propertyDescriptor);
  if(propertyDescriptor.sealed) { Object.seal($target[$propertyKey]); }
  if(propertyDescriptor.frozen) { Object.freeze($target[$propertyKey]); }
  return $target
}

function defineProperties($target, $propertyDescriptors, $options) {
  const options = Options('object', 'defineProperties', $options);
  for(const [$propertyKey, $propertyDescriptor] of Object.entries($propertyDescriptors)) {
    defineProperty($target, $propertyKey, $propertyDescriptor, options);
  }
  return $target
}

function freeze($target, $options = {}) {
  const options = Options('object', 'freeze', $options);
  const { recurse } = options;
  const { maxDepth } = recurse;
  try { recurse.depth++; } catch($err) { return }
  const target = new TensorProxy(options).get($target);
  try { recurse.ancestors = target; } catch($err) { return $target }
  const targetEntities = entities($target, 'entries', Object.assign({}, options, {
    recurse: { maxDepth: 1 }
  }));
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    try { recurse.ancestors = $propertyValue; } catch($err) { continue iterateTargetEntities }
    if(ObjectKeys.includes(typeOf($propertyValue))) { freeze($propertyValue, options); }
  }
  return Object.freeze($target)
}

function seal($target, $options = {}) {
  const options = Options('object', 'seal', $options);
  const { recurse } = options;
  try { recurse.depth++; } catch($err) { return }
  const target = new TensorProxy(options).get($target);
  try { recurse.ancestors = target; } catch($err) {}
  const targetEntities = entities($target, 'entries', Object.assign({}, options, {
    recurse: { maxDepth: 1 }
  }));
  iterateTargetEntities: 
  for(const [$propertyKey, $propertyValue] of targetEntities) {
    try { recurse.ancestors = $propertyValue; } catch($err) { continue iterateTargetEntities }
    if(ObjectKeys.includes(typeOf($propertyValue))) { seal($propertyValue, options); }
  }
  return Object.seal($target)
}

var keys = ($target, $options) => entities($target, 'keys', $options);

var values = ($target, $options) => entities($target, 'values', $options);

var entries = ($target, $options) => entities($target, 'entries', $options);

function toString($source, $options = {}) {
  const options = Options('object', 'toString', Object.assign({}, $options, {
    resemble: true, type: true
  }));
  // console.log(defineProperties(
  //   typedObjectLiteral($source), getOwnPropertyDescriptors($source, options), options
  // ))
  return JSON.stringify(
    defineProperties(
      typedObjectLiteral($source), getOwnPropertyDescriptors($source, options), options
    ), 
    options.replacer, options.space
  )
}

function valueOf($source, $options = {}) {
  const options = Options('object', 'valueOf', $options);
  const source = new TensorProxy(options).get($source);
  return source
}

// Map

class Recourse extends EventTarget {
  // STATIC METHODS
  static get compand() { return Object.defineProperty(this, 'compand', {
    value: compand
  })['compand'] }
  static get decompand() { return Object.defineProperty(this, 'decompand', {
    value: decompand
  })['decompand'] }
  static get expand() { return Object.defineProperty(this, 'expand', {
    value: expand
  })['expand'] }
  static get impand() { return Object.defineProperty(this, 'impand', {
    value: impand
  })['impand'] }
  static get keys() { return Object.defineProperty(this, 'keys', {
    value: keys
  })['keys'] }
  static get values() { return Object.defineProperty(this, 'values', {
    value: values
  })['values'] }
  static get entries() { return Object.defineProperty(this, 'entries', {
    value: entries
  })['entries'] }
  static get entities() { return Object.defineProperty(this, 'entities', {
    value: entities
  })['entities'] }
  static get get() { return Object.defineProperty(this, 'get', {
    value: getProperty
  })['get'] }
  static get set() { return Object.defineProperty(this, 'set', {
    value: setProperty
  })['set'] }
  static get delete() { return Object.defineProperty(this, 'delete', {
    value: deleteProperty
  })['delete'] }
  static get assign() { return Object.defineProperty(this, 'assign', {
    value: assign
  })['assign'] }
  static get defineProperties() { return Object.defineProperty(this, 'defineProperties', {
    value: defineProperties
  })['defineProperties'] }
  static get defineProperty() { return Object.defineProperty(this, 'defineProperty', {
    value: defineProperty
  })['defineProperty'] }
  static get freeze() { return Object.defineProperty(this, 'freeze', {
    value: freeze
  })['freeze'] }
  static get seal() { return Object.defineProperty(this, 'seal', {
    value: seal
  })['seal'] }
  static get getOwnPropertyDescriptors() { return Object.defineProperty(this, 'getOwnPropertyDescriptors', {
    value: getOwnPropertyDescriptors
  })['getOwnPropertyDescriptors'] }
  static get getOwnPropertyDescriptor() { return Object.defineProperty(this, 'getOwnPropertyDescriptor', {
    value: getOwnPropertyDescriptor
  })['getOwnPropertyDescriptor'] }
  static get isArrayLike() { return Object.defineProperty(this, 'isArrayLike', {
    value: isArrayLike
  })['isArrayLike'] }
  static get isMapLike() { return Object.defineProperty(this, 'isMapLike', {
    value: isMapLike
  })['isMapLike'] }
  static get isPrimitiveClass() { return Object.defineProperty(this, 'isPrimitiveClass', {
    value: isPrimitiveClass
  })['isPrimitiveClass'] }
  static get isObjectClass() { return Object.defineProperty(this, 'isObjectClass', {
    value: isObjectClass
  })['isObjectClass'] }
  static get typeOf() { return Object.defineProperty(this, 'typeOf', {
    value: typeOf
  })['typeOf'] }
  static get typeOfClass() { return Object.defineProperty(this, 'typeOfClass', {
    value: typeOfClass
  })['typeOfClass'] }
  static get toString() { return Object.defineProperty(this, 'toString', {
    value: toString
  })['toString'] }
  static get valueOf() { return Object.defineProperty(this, 'valueOf', {
    value: valueOf
  })['valueOf'] }
  // INSTANCE METHODS
  get toString() { return Object.defineProperty(this, $staticMethodName, {
    value: $staticMethod.bind(null, this.target, this.options.methods)
  }) }
  get compand() { return Object.defineProperty(this, 'compand', {
    value: Recourse.compand.bind(null, this.target, this.options)
  })['compand'] }
  get decompand() { return Object.defineProperty(this, 'decompand', {
    value: Recourse.decompand.bind(null, this.target, this.options)
  })['decompand'] }
  get expand() { return Object.defineProperty(this, 'expand', {
    value: Recourse.expand.bind(null, this.target, this.options)
  })['expand'] }
  get impand() { return Object.defineProperty(this, 'impand', {
    value: Recourse.impand.bind(null, this.target, this.options)
  })['impand'] }
  get entities() { return Object.defineProperty(this, 'entities', {
    value: Recourse.entities.bind(null, this.target, this.options)
  })['entities'] }
  get keys() { return Object.defineProperty(this, 'keys', {
    value: Recourse.keys.bind(null, this.target, this.options)
  })['keys'] }
  get values() { return Object.defineProperty(this, 'values', {
    value: Recourse.values.bind(null, this.target, this.options)
  })['values'] }
  get entries() { return Object.defineProperty(this, 'entries', {
    value: Recourse.entries.bind(null, this.target, this.options)
  })['entries'] }
  get get() { return Object.defineProperty(this, 'get', {
    value: Recourse.get.bind(null, this.target, this.options)
  })['get'] }
  get set() { return Object.defineProperty(this, 'set', {
    value: Recourse.set.bind(null, this.target, this.options)
  })['set'] }
  get delete() { return Object.defineProperty(this, 'delete', {
    value: Recourse.delete.bind(null, this.target, this.options)
  })['delete'] }
  get assign() { return Object.defineProperty(this, 'assign', {
    value: Recourse.assign.bind(null, this.target, this.options)
  })['assign'] }
  get defineProperties() { return Object.defineProperty(this, 'defineProperties', {
    value: Recourse.defineProperties.bind(null, this.target, this.options)
  })['defineProperties'] }
  get defineProperty() { return Object.defineProperty(this, 'defineProperty', {
    value: Recourse.defineProperty.bind(null, this.target, this.options)
  })['defineProperty'] }
  get freeze() { return Object.defineProperty(this, 'freeze', {
    value: Recourse.freeze.bind(null, this.target, this.options)
  })['freeze'] }
  get seal() { return Object.defineProperty(this, 'seal', {
    value: Recourse.seal.bind(null, this.target, this.options)
  })['seal'] }
  get getOwnPropertyDescriptors() { return Object.defineProperty(this, 'getOwnPropertyDescriptors', {
    value: Recourse.getOwnPropertyDescriptors.bind(null, this.target, this.options)
  })['getOwnPropertyDescriptors'] }
  get getOwnPropertyDescriptor() { return Object.defineProperty(this, 'getOwnPropertyDescriptor', {
    value: Recourse.getOwnPropertyDescriptor.bind(null, this.target, this.options)
  })['getOwnPropertyDescriptor'] }
  // get isArrayLike() { return Object.defineProperty(this, 'isArrayLike', {
  //   value: Recourse.isArrayLike.bind(null, this.target, this.options)
  // })['isArrayLike'] }
  // get isMapLike() { return Object.defineProperty(this, 'isMapLike', {
  //   value: Recourse.isMapLike.bind(null, this.target, this.options)
  // })['isMapLike'] }
  // get isSetLike() { return Object.defineProperty(this, 'isSetLike', {
  //   value: Recourse.isSetLike.bind(null, this.target)
  // })['isSetLike'] }
  get typeOf() { return Object.defineProperty(this, 'typeOf', {
    value: Recourse.typeOf.bind(null, this.target, this.options)
  })['typeOf'] }
  set options($options) { return Object.defineProperty(this, 'options', {
    value: Defaults($options)
  })['options'] }
  constructor($target, $options = {}) {
    super();
    this.target = $target;
    this.options = $options;
  }
}

export { Recourse, index as Tensors, index$1 as Variables, assign, compand, decompand, defineProperties, defineProperty, deleteProperty as delete, entities, entries, expand, freeze, getProperty as get, getOwnPropertyDescriptor, getOwnPropertyDescriptors, impand, isArrayLike, isMapLike, isObjectClass, isPrimitiveClass, keys, seal, setProperty as set, splitPath, toString, typeOf, typeOfClass, typedObjectLiteral, valueOf, values };
//# sourceMappingURL=recourse.js.map
