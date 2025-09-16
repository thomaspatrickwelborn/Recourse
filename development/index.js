// Map
import getProperty from './methods/map/get-property/index.js'
import setProperty from './methods/map/set-property/index.js'
import deleteProperty from './methods/map/delete-property/index.js'
// Object
import expand from './methods/object/expand/index.js'
import impand from './methods/object/impand/index.js'
import compand from './methods/object/compand/index.js'
import decompand from './methods/object/decompand/index.js'
import assign from './methods/object/assign/index.js'
import defineProperties from './methods/object/define-properties/index.js'
import defineProperty from './methods/object/define-property/index.js'
import freeze from './methods/object/freeze/index.js'
import seal from './methods/object/seal/index.js'
import keys from './methods/object/keys/index.js'
import values from './methods/object/values/index.js'
import entries from './methods/object/entries/index.js'
import entities from './methods/object/entities/index.js'
import getOwnPropertyDescriptors from './methods/object/get-own-property-descriptors/index.js'
import getOwnPropertyDescriptor from './methods/object/get-own-property-descriptor/index.js'
import splitPath from './utilities/split-path/index.js'
import toString from './methods/object/to-string/index.js'
import valueOf from './methods/object/value-of/index.js'
// Utilities
import typedObjectLiteral from './utilities/typed-object-literal/index.js'
import typeOf from './utilities/type-of/index.js'
import typeOfClass from './utilities/type-of-class/index.js'
import isArrayLike from './methods/array/is-array-like/index.js'
import isMapLike from './methods/map/is-map-like/index.js'
// import isSetLike from './methods/is-set-like/index.js'
import isObjectClass from './utilities/is-object-class/index.js'
import isPrimitiveClass from './utilities/is-primitive-class/index.js'

import * as Tensors from './tensors/index.js'
import * as Variables from './variables/index.js'

import { Defaults } from './options/index.js'

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
  isObjectClass, isPrimitiveClass, 
  typedObjectLiteral, typeOf, typeOfClass, 
  splitPath, 
  valueOf, toString,
}