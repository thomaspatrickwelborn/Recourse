import getProperty from './methods/get-property/index.js'
import setProperty from './methods/set-property/index.js'
import deleteProperty from './methods/delete-property/index.js'
import expand from './methods/expand/index.js'
import impand from './methods/impand/index.js'
import compand from './methods/compand/index.js'
import decompand from './methods/decompand/index.js'
import assign from './methods/assign/index.js'
import defineProperties from './methods/define-properties/index.js'
import defineProperty from './methods/define-property/index.js'
import freeze from './methods/freeze/index.js'
import seal from './methods/seal/index.js'
import typedObjectLiteral from './methods/typed-object-literal/index.js'
import typeOf from './methods/type-of/index.js'
import isArrayLike from './methods/is-array-like/index.js'
import isMapLike from './methods/is-map-like/index.js'
// import isSetLike from './methods/is-set-like/index.js'
import keys from './methods/keys/index.js'
import values from './methods/values/index.js'
import entries from './methods/entries/index.js'
import entities from './methods/entities/index.js'
import getOwnPropertyDescriptors from './methods/get-own-property-descriptors/index.js'
import getOwnPropertyDescriptor from './methods/get-own-property-descriptor/index.js'
import splitPath from './methods/split-path/index.js'
import toString from './methods/to-string/index.js'
import valueOf from './methods/value-of/index.js'
import Options from './options/index.js'
import * as Tensors from './tensors/index.js'
import * as Variables from './variables/index.js'

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
  })['getProperty'] }
  static get set() { return Object.defineProperty(this, 'set', {
    value: setProperty
  })['setProperty'] }
  static get delete() { return Object.defineProperty(this, 'delete', {
    value: deleteProperty
  })['deleteProperty'] }
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
  static get typeOf() { return Object.defineProperty(this, 'typeOf', {
    value: typeOf
  })['typeOf'] }
  static get toString() { return Object.defineProperty(this, 'toString', {
    value: toString
  })['toString'] }
  static get valueOf() { return Object.defineProperty(this, 'valueOf', {
    value: valueOf
  })['valueOf'] }
  // INSTANCE METHODS
  get toString() { return Object.defineProperty(this, $staticMethodName, {
    value: $staticMethod.bind(null, this.target, this.options)
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
  get isArrayLike() { return Object.defineProperty(this, 'isArrayLike', {
    value: Recourse.isArrayLike.bind(null, this.target, this.options)
  })['isArrayLike'] }
  get isMapLike() { return Object.defineProperty(this, 'isMapLike', {
    value: Recourse.isMapLike.bind(null, this.target, this.options)
  })['isMapLike'] }
  // get isSetLike() { return Object.defineProperty(this, 'isSetLike', {
  //   value: Recourse.isSetLike.bind(null, this.target)
  // })['isSetLike'] }
  get typeOf() { return Object.defineProperty(this, 'typeOf', {
    value: Recourse.typeOf.bind(null, this.target, this.options)
  })['typeOf'] }
  set options($options) { return Object.defineProperty(this, 'options', {
    value: Options($options)
  })['options'] }
  constructor($target, $options = {}) {
    super()
    this.target = $target
    this.options = $options
  }
}
export {
  Recourse, Tensors, Variables,
  getProperty as get, setProperty as set, deleteProperty as delete,
  expand, impand, compand, decompand,
  assign, 
  defineProperties, defineProperty,
  freeze, seal,
  keys, values, entries,
  entities, 
  getOwnPropertyDescriptors, getOwnPropertyDescriptor,
  isArrayLike, isMapLike, /* isSetLike, */
  typedObjectLiteral, typeOf, 
  splitPath, 
  valueOf, toString,
}