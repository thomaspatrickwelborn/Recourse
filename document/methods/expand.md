| [➲ Recourse](../../README.md) | *`Expand`* |
| :-- | :-- |

# `Expand` Method
Expand Object/Array property key/value pairs to abstract syntax tree (AST) where *source* property values become AST Node *target* property values. 

## `Expand` Syntax
```
Recourse.expand($source, $property)
```
### `$source` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Object/Array property key/value pairs expand to AST.  
### `$property` Argument
**Type**: `string`, `function`  
**Required**: `true`  
**Descript**: Target AST Node property name pairs with source property value. When `$property` type is:  
 - `string` AST Node property from `$target[$property]`; 
 - `function` AST Node property returned by function. 
### `return` Value
**Type**: `object`, `array`  
**Descript**  Returns expanded object AST from source object.  

## `Expand` Examples
### `Expand` Example 1
```
const object = {
  propertyA: 1
}
const objectAST = Recourse.expand(object, 'value')
```
*objectAST*  
```
{
  "propertyA": {
    "value": 1
  }
}
```
### `Expand` Example 2
```
const object = {
  propertyA: 1
}
const objectAST = Recourse.expand(object, 'source.value')
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
### `Expand` Example 3
```
const object = {
  propertyA: 1
}
const objectAST = Recourse.expand(object, ($value) => {
  return { value: $value }
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

### `Expand` Example 4
```
const object = {
  propertyA: 1
}
const objectAST = Recourse.expand(object, ($value) => {
  return { source: { value: $value } }
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

### `Expand` Example 5
```
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectAST = Recourse.expand(object, 'value')
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

### `Expand` Example 6
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