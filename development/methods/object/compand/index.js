/*
Methods (compand, others) should be authored to:  
 - minimize use of intradependent Recourse methods
 - iterate through property names instead of descriptors
   - This should eliminate error when retrieving property of either value or get 
*/
import { TensorProxy } from '../../../tensors/index.js'
import entities from '../entities/index.js'
import { Options, Defaults } from '../../../options/index.js'
export default function compand($source, $options) {
  const compandment = []
  const options = Options('object', 'compand', $options)
  const { entities, recurse } = options
  const { ancestors, maxDepth } = recurse
  const { nonenumerable } = recurse
  if(recurse.depth >= maxDepth) { return compandment }
  else { recurse.depth++ }
  const tensor = new TensorProxy(options)
  const source = tensor.get($source)
  if(!ancestors.includes($source)) { ancestors.unshift($source) }
  else { return $source }
  const sourceDescriptors = Object.entries(Object.getOwnPropertyDescriptors(source))
  iterateSourceEntries: 
  for(let [$sourceKey, $sourceDescriptor] of sourceDescriptors) {
    const $sourceValue = tensor.get($source, $sourceKey)
    if(!ancestors.includes($sourceValue)) { ancestors.unshift($sourceValue) }
    compandment.push([$sourceKey, $sourceValue])
    if(
      typeof $sourceValue === 'object' &&
      $sourceValue !== null &&
      !Object.is($sourceValue, source) && 
      !ancestors.includes($sourceValue)
    ) {
      if(!ancestors.includes($sourceValue)) { ancestors.unshift($sourceValue) }
      else { continue iterateSourceEntries }
      const subsourceDescriptors = Object.entries(Object.getOwnPropertyDescriptors($sourceValue))
      console.log(subsourceDescriptors)
      iterateSubsourceDescriptors: 
      for(const [$subsourceKey, $subsourceValue] of subsourceDescriptors) {
        const path = [$sourceKey, $subsourceKey].join('.')
        compandment.push([path, $subsourceValue])
      }
    }
  }
  return compandment
}