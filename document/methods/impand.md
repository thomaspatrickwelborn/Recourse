| [➲ Recourse](../../README.md) | *`Impand`* |
| :-- | :-- |

# `Impand` Method
Impand Object/Array property key/value pairs from abstract syntax tree (AST) where AST *source* property values become *target* property values. 

## `Impand` Method Syntax
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
 - `string` Target property value from AST property path.  ; 
 - `function` Target property value returned by function. 
### `return` Value
**Type**: `object`, `array`  
**Descript**  Returns impanded object from expanded object AST.  

## `Impand` Examples
### `Impand` Example 1
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
### `Impand` Example 2
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
### `Impand` Example 3
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
### `Impand` Example 4
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

### `Impand` Example 5
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

### `Impand` Example 6
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