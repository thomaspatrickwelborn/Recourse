import assign from './assign/index.js'
import assignConcat from './assign-concat/index.js'
import compandTree from './compand-tree/index.js'
import decompandTree from './decompand-tree/index.js'
import defineProperties from './define-properties/index.js'
import defineProperty from './define-property/index.js'
import expandTree from './expand-tree/index.js'
import freeze from './freeze/index.js'
import impandTree from './impand-tree/index.js'
import isArrayLike from './is-array-like/index.js'
import getOwnPropertyDescriptors from './get-own-property-descriptors/index.js'
import getOwnPropertyDescriptor from './get-own-property-descriptor/index.js'
import regularExpressions from './regular-expressions/index.js'
import seal from './seal/index.js'
import typedObjectLiteral from './typed-object-literal/index.js'
import typeOf from './type-of/index.js'
import * as variables from './variables/index.js'

import keys from './keys/index.js'
import values from './values/index.js'
import entities from './entities/index.js'
import entries from './entries/index.js'
import numerableEntries from './numerable-entries/index.js'

import getTreeNode from './get-tree-node/index.js'
import setTreeNode from './set-tree-node/index.js'
import deleteTreeNode from './get-tree-node/index.js'

export default class Recourse extends EventTarget {
  static compand = compandTree
  static decompand = decompandTree
  static expand = expandTree
  static impand = impandTree

  static keys = keys
  static values = values
  static entries = entries
  static numerableEntries = numerableEntries

  static get = getTreeNode
  static set = setTreeNode
  static delete = deleteTreeNode

  static assign = assign
  static assignConcat = assignConcat

  static defineProperties = defineProperties
  static defineProperty = defineProperty

  static freeze = freeze
  static seal = seal

  static getOwnPropertyDescriptors = getOwnPropertyDescriptors
  static getOwnPropertyDescriptor = getOwnPropertyDescriptor

  static isArrayLike = isArrayLike
  static typeOf = typeOf

  static typedObjectLiteral = typedObjectLiteral
  static regularExpressions = regularExpressions
  static variables = variables

  constructor($target) {
    super()
    const typeOfTarget = typeOf($target)
    const target = typedObjectLiteral(typeOfTarget)
    iterateStaticMutatorMethods: 
    for(const $staticMethod of [
      Recourse.compand, Recourse.decompand, Recourse.expand, Recourse.impand,
      Recourse.keys, Recourse.values, Recourse.entries, Recourse.numerableEntries,
      Recourse.get, Recourse.set, Recourse.delete,
      Recourse.assign, Recourse.assignConcat, 
      Recourse.defineProperties, Recourse.defineProperty,
      Recourse.freeze, Recourse.seal,
      Recourse.getOwnPropertyDescriptors, Recourse.getOwnPropertyDescriptor,
      Recourse.isArrayLike, Recourse.typeOf,
    ]) {
      Object.defineProperty(this, $staticMethod.name, {
        value: $staticMethod.bind(this, target)
      })
    }
  }
}