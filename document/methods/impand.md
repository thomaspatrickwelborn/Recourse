| [➲ Recourse](../../README.md) | *`impand`* |
| :-- | :-- |

# `impand` Method
Impand Object/Array property key/value pairs from abstract syntax tree (AST) where AST *source* property values become returned *target* property values. 
 - [`impand` Method Syntax](#impand-method-syntax)
 - [`impand` Examples](#impand-examples)
## `impand` Method Syntax
```
Recourse.impand($source, $property)
```
### `$source` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Expanded AST of object/array property key/value pairs.  
### `$property` Argument
**Type**: `string`, `function`  
**Required**: `true`  
**Descript**: Source AST Node property name pairs with target property value. When `$property` type is:  
 - `string` Target property value derived from AST property path; 
 - `function` Target property value returned by function. 
### `return` Value
**Type**: `object`, `array`  
**Descript**  Returns impanded object from expanded object AST.  

## `impand` Examples
### `impand` Example 1
Impand `value` from `objectAST` using `string` property path.  
```
const object = {
  propertyA: 1
}
const objectAST = Recourse.expand(object, 'value')
const objectImpand = Recourse.impand(objectAST, 'value')
```
*objectAST*  
```
{
  "propertyA": {
    "value": 1
  }
}
```
*objectImpand*  
```
{
  "propertyA": 1
}
```
### `impand` Example 2
Impand `source.value` from `objectAST` using `string` property path.  
```
const object = {
  propertyA: 1
}
const objectAST = Recourse.expand(object, 'source.value')
const objectImpand = Recourse.impand(objectAST, 'source.value')
```
*objectAST*  
```
{
  "propertyA": {
    "source": {
      "value": 1
    }
  }
}
```
*objectImpand*  
```
{
  "propertyA": 1
}
```
### `impand` Example 3
Impand `$value.value` from `objectAST` using `function`.  
```
const object = {
  propertyA: 1
}
const objectAST = Recourse.expand(object, ($value) => {
  return { value: $value }
})
const objectImpand = Recourse.impand(objectAST, ($value) => {
  return $value.value
})
```
*objectAST*  
```
{
  "propertyA": {
    "value": 1
  }
}
```
*objectImpand*  
```
{
  "propertyA": 1
}
```
### `impand` Example 4
Impand `$value.source.value` from `objectAST` using `function`.  
```
const object = {
  propertyA: 1
}
const objectAST = Recourse.expand(object, ($value) => {
  return { source: { value: $value } }
})
const objectImpand = Recourse.impand(objectAST, ($value) => {
  return $value.source.value
})
```
*objectAST*  
```
{
  "propertyA": {
    "source": {
      "value": 1
    }
  }
}
```
*objectImpand*  
```
{
  "propertyA": 1
}
```

### `impand` Example 5
Impand `source.value` from `objectAST` using `string` property path.  
```
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectAST = Recourse.expand(object, 'value')
const objectImpand = Recourse.impand(objectAST, 'value')
```
*objectAST*  
```
{
  "propertyA": {
    "value": [
      {
        "value": {
          "propertyC": {
            "value": 3
          }
        }
      },
      {
        "value": {
          "propertyC": {
            "value": 33
          }
        }
      },
      {
        "value": {
          "propertyC": {
            "value": 333
          }
        }
      }
    ]
  }
}
```
*objectImpand*  
```
{
  "propertyA": [
    {
      "propertyC": 3
    },
    {
      "propertyC": 33
    },
    {
      "propertyC": 333
    }
  ]
}
```

### `impand` Example 6
Impand `source.value` from `objectAST` using `function`.  
```
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectAST = Recourse.expand(object, ($value) => {
  return { source: { value: $value } }
})
const objectImpand = Recourse.impand(objectAST, ($value) => {
  return $value.source.value
})
```
*objectAST*  
```
{
  "propertyA": {
    "source": {
      "value": [
        {
          "source": {
            "value": {
              "propertyC": {
                "source": {
                  "value": 3
                }
              }
            }
          }
        },
        {
          "source": {
            "value": {
              "propertyC": {
                "source": {
                  "value": 33
                }
              }
            }
          }
        },
        {
          "source": {
            "value": {
              "propertyC": {
                "source": {
                  "value": 333
                }
              }
            }
          }
        }
      ]
    }
  }
}
```
*objectImpand*  
```
{
  "propertyA": [
    {
      "propertyC": 3
    },
    {
      "propertyC": 33
    },
    {
      "propertyC": 333
    }
  ]
}
```