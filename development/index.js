import getProperty from './methods/get-property/index.js'
import setProperty from './methods/set-property/index.js'
import deleteProperty from './methods/delete-property/index.js'
import expand from './methods/expand/index.js'
import impand from './methods/impand/index.js'
import compand from './methods/compand/index.js'
import decompand from './methods/decompand/index.js'
import assign from './methods/assign/index.js'
import assignConcat from './methods/assign-concat/index.js'
import defineProperties from './methods/define-properties/index.js'
import defineProperty from './methods/define-property/index.js'
import freeze from './methods/freeze/index.js'
import seal from './methods/seal/index.js'
import typedObjectLiteral from './methods/typed-object-literal/index.js'
import typeOf from './methods/type-of/index.js'
import isArrayLike from './methods/is-array-like/index.js'
import isMapLike from './methods/is-map-like/index.js'
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
  #target
  #options
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
  get toString() { return Object.defineProperty(this, $staticMethodName, {
    value: $staticMethod.bind(null, this.#target, this.#options)
  }) }
  get compand() { return Object.defineProperty(this, 'compand', {
    value: Recourse.compand.bind(null, this.#target)
  })['compand'] }
  get decompand() { return Object.defineProperty(this, 'decompand', {
    value: Recourse.decompand.bind(null, this.#target)
  })['decompand'] }
  get expand() { return Object.defineProperty(this, 'expand', {
    value: Recourse.expand.bind(null, this.#target)
  })['expand'] }
  get impand() { return Object.defineProperty(this, 'impand', {
    value: Recourse.impand.bind(null, this.#target)
  })['impand'] }
  get entities() { return Object.defineProperty(this, 'entities', {
    value: Recourse.entities.bind(null, this.#target)
  })['entities'] }
  get keys() { return Object.defineProperty(this, 'keys', {
    value: Recourse.keys.bind(null, this.#target)
  })['keys'] }
  get values() { return Object.defineProperty(this, 'values', {
    value: Recourse.values.bind(null, this.#target)
  })['values'] }
  get entries() { return Object.defineProperty(this, 'entries', {
    value: Recourse.entries.bind(null, this.#target)
  })['entries'] }
  get get() { return Object.defineProperty(this, 'get', {
    value: Recourse.get.bind(null, this.#target)
  })['get'] }
  get set() { return Object.defineProperty(this, 'set', {
    value: Recourse.set.bind(null, this.#target)
  })['set'] }
  get delete() { return Object.defineProperty(this, 'delete', {
    value: Recourse.delete.bind(null, this.#target)
  })['delete'] }
  get assign() { return Object.defineProperty(this, 'assign', {
    value: Recourse.assign.bind(null, this.#target)
  })['assign'] }
  get assignConcat() { return Object.defineProperty(this, 'assignConcat', {
    value: Recourse.assignConcat.bind(null, this.#target)
  })['assignConcat'] }
  get defineProperties() { return Object.defineProperty(this, 'defineProperties', {
    value: Recourse.defineProperties.bind(null, this.#target)
  })['defineProperties'] }
  get defineProperty() { return Object.defineProperty(this, 'defineProperty', {
    value: Recourse.defineProperty.bind(null, this.#target)
  })['defineProperty'] }
  get freeze() { return Object.defineProperty(this, 'freeze', {
    value: Recourse.freeze.bind(null, this.#target)
  })['freeze'] }
  get seal() { return Object.defineProperty(this, 'seal', {
    value: Recourse.seal.bind(null, this.#target)
  })['seal'] }
  get getOwnPropertyDescriptors() { return Object.defineProperty(this, 'getOwnPropertyDescriptors', {
    value: Recourse.getOwnPropertyDescriptors.bind(null, this.#target)
  })['getOwnPropertyDescriptors'] }
  get getOwnPropertyDescriptor() { return Object.defineProperty(this, 'getOwnPropertyDescriptor', {
    value: Recourse.getOwnPropertyDescriptor.bind(null, this.#target)
  })['getOwnPropertyDescriptor'] }
  get isArrayLike() { return Object.defineProperty(this, 'isArrayLike', {
    value: Recourse.isArrayLike.bind(null, this.#target)
  })['isArrayLike'] }
  get isMapLike() { return Object.defineProperty(this, 'isMapLike', {
    value: Recourse.isMapLike.bind(null, this.#target)
  })['isMapLike'] }
  get typeOf() { return Object.defineProperty(this, 'typeOf', {
    value: Recourse.typeOf.bind(null, this.#target)
  })['typeOf'] }
  constructor($target, $options = {}) {
    super()
    this.#target = $target
    this.#options = $options
  }
}
export {
  Recourse, Tensors, Variables,
  getProperty as get, setProperty as set, deleteProperty as delete,
  expand, impand, compand, decompand,
  assign, assignConcat,
  defineProperties, defineProperty,
  freeze, seal,
  keys, values, entries,
  entities, 
  getOwnPropertyDescriptors, getOwnPropertyDescriptor,
  isArrayLike, typeOf,
  splitPath, 
  typedObjectLiteral, 
  valueOf, toString,
}