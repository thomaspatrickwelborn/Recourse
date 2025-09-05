| [➲ Recourse](../../README.md) | *`Options`* |
| :-- | :-- |

# Recourse `Options`
```
{
  propertyAssignments: {
    object: { primitive: 'assign', object: 'assign' }, 
    array: { primitive: 'assign', object: 'assign' }, 
    map: { primitive: 'assign', object: 'assign' }
  },
  
  // Path
  delimiter: '.',
  path: false,
  pathMatch: false,
  pathMatchMax: 100,
  pathParseInteger: false, 
  
  // Tensors
  tensors: {
    getters: [Getters.Object, Getters.Map, /* Getters.Set */],
    setters: [Setters.Object, Setters.Map, /* Setters.Set */],
    deleters: [Deleters.Object, Deleters.Map, /* Deleters.Set */],
    typeValidators: [TypeValidators.Object, TypeValidators.Map, /* TypeValidators.Set */],
    returners: [Returners.Object, Returners.Map, /* Returners.Set */],
  }
  
  // Entities
  enumerable: true, 
  nonenumerable: false,
  returnValue: 'receiver',
  values: false,
  
  // Recurse
  depth: 0,
  recurse: true,
  maxDepth: 10,
  
  // Property Descriptors, Definitions
  frozen: false,
  sealed: false,
  type: false,
  typeCoercion: false,
  
  // Objects
  resemble: false,
  strict: false,
}
```