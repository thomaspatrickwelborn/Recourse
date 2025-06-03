import regularExpressions from '../regular-expressions/index.js'
import typedObjectLiteral from '../typed-object-literal/index.js'

import compandTree from '../compand-tree/index.js'
import decompandTree from '../decompand-tree/index.js'

import impandTree from '../impand-tree/index.js'
import expandTree from '../expand-tree/index.js'

import getTreeNode from '../get-tree-node/index.js'
import setTreeNode from '../set-tree-node/index.js'
import deleteTreeNode from '../get-tree-node/index.js'

import assign from '../assign/index.js'
import assignPush from '../assign-push/index.js'
import assignUnshift from '../assign-unshift/index.js'

import getOwnPropertyDescriptors from '../get-own-property-descriptors/index.js'
import getOwnPropertyDescriptor from '../get-own-property-descriptor/index.js'

import defineProperties from '../define-properties/index.js'
import defineProperty from '../define-property/index.js'

import freeze from '../freeze/index.js'
import seal from '../seal/index.js'

export default class Tree extends EventTarget {
  static compand = compandTree
  static decompand = decompandTree

  static impand = impandTree
  static expand = expandTree

  static get = getTreeNode
  static set = setTreeNode
  static delete = deleteTreeNode

  static assign = assign
  static assignPush = assignPush
  static assignUnshift = assignUnshift

  static getOwnPropertyDescriptors = getOwnPropertyDescriptors
  static getOwnPropertyDescriptor = getOwnPropertyDescriptor

  static defineProperties = defineProperties
  static defineProperty = defineProperty

  static freeze = freeze
  static seal = seal

  static implement($target) {
    iterateStaticMutatorMethods: 
    for(const $staticMethod of [
      Tree.get, Tree.set, Tree.delete,
      Tree.assign, Tree.assignPush, Tree.assignUnshift, 
      Tree.getOwnPropertyDescriptors, Tree.getOwnPropertyDescriptor,
      Tree.defineProperties, Tree.defineProperty,
    ]) {
      Object.defineProperty($target, $staticMethod.name, {
        value: $staticMethod.bind(null, $target)
      })
    }
    return $target
  }
  constructor() {
    super()
    return Tree.implement(null, this)
  }

}