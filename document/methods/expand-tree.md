| [⁘ Recourse](../../README.md) | *`expandTree`* |
| :-- | :-- |

# `expandTree`
Expand Object/Array property key/value pairs to abstract syntax tree (AST) where *source* property values become AST Node *target* property values. 

## `expandTree` Syntax
```
expandTree($source, $property)
```
### `$source` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Object/Array property key/value pairs expand to AST.  
### `$property` Argument
**Type**: `string`, `function`  
**Required**: `true`  
**Descript**: Target AST Node property name pairs with source property value. When `$property` type is:  
 - `string` AST Node property is `$property`; 
 - `function` AST Node property is returned by function. 
## `expandTree` Examples
### `expandTree` Example 1
```
const object = {
  propertyA: 1
}
const objectAST = expandTree(object, 'value')
```
*objectAST*  
```
{
  "propertyA": {
    "value": 1
  }
}
```
### `expandTree` Example 2
```
const object = {
  propertyA: 1
}
const objectAST = expandTree(object, 'source.value')
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
### `expandTree` Example 3
```
const object = {
  propertyA: 1
}
const objectAST = expandTree(object, ($value) => {
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

### `expandTree` Example 4
```
const object = {
  propertyA: 1
}
const objectAST = expandTree(object, ($value) => {
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

### `expandTree` Example 5
```
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectAST = expandTree(object, 'value')
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

### `expandTree` Example 6
```
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectAST = expandTree(object, ($value) => {
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