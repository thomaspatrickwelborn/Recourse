| [➲ Recourse](../../README.md) | *`expand`* |
| :-- | :-- |

# `expand` Method
Expand Object/Array property key/value pairs to abstract syntax tree (AST) where *source* property values become AST Node *target* property values. 
 - [`expand` Method Syntax](#expand-method-syntax)
 - [`expand` Examples](#expand-examples)

## `expand` Method Syntax
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

## `expand` Examples
### `expand` Example 1
Expand `$value` from `object` to `value` using `string` property path
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
### `expand` Example 2
Expand `$value` from `object` to `source.value` using `string` property path.  
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
### `expand` Example 3
Expand `$value` from `object` to `value` using `function`.  
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

### `expand` Example 4
Expand `$value` from `object` to `source.value` using `function`.  
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

### `expand` Example 5
Expand `$value` from `object` to `source.value` `string` property path.  
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

### `expand` Example 6
Expand `$value` from `object` to `source.value` using `function`.  
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