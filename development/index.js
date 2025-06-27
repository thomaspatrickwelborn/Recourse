import getProperty from './get-property/index.js'
import setProperty from './set-property/index.js'
import deleteProperty from './delete-property/index.js'
import * as tensors from './tensors/index.js'
import expand from './expand/index.js'
import impand from './impand/index.js'
import compand from './compand/index.js'
import decompand from './decompand/index.js'
import assign from './assign/index.js'
import assignConcat from './assign-concat/index.js'
import defineProperties from './define-properties/index.js'
import defineProperty from './define-property/index.js'
import freeze from './freeze/index.js'
import seal from './seal/index.js'
import typedObjectLiteral from './typed-object-literal/index.js'
import typeOf from './type-of/index.js'
import isArrayLike from './is-array-like/index.js'
import isMapLike from './is-map-like/index.js'
import * as variables from './variables/index.js'
import keys from './keys/index.js'
import values from './values/index.js'
import entries from './entries/index.js'
import entities from './entities/index.js'
import getOwnPropertyDescriptors from './get-own-property-descriptors/index.js'
import getOwnPropertyDescriptor from './get-own-property-descriptor/index.js'
import splitPath from './split-path/index.js'
import toString from './to-string/index.js'
import valueOf from './value-of/index.js'

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
    super()
    iterateStaticMutatorMethods: 
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
      })
    }
  }
}
export {
  Recourse, tensors, 
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
  typedObjectLiteral, variables,
  valueOf, toString,
}