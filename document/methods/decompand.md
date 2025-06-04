| [➲ Recourse](../../README.md) | *`decompand`* |
| :-- | :-- |

# `decompand` Method
Compand multidimensional object/array property key/value pairs to mono-dimensional property path/value pairs. 
 - [`decompand` Method Syntax](#decompand-method-syntax)
 - [`decompand` Examples](#decompand-examples)

## `decompand` Method Syntax
```
Recourse.decompand($source, $property)
```
### `$source` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Object/Array property key/value pairs decompand to AST.  
### `$options` Argument

### `return` Value
**Type**: `object`, `array`  
**Descript**  Returns decompanded property path directory from source object.  

## `decompand` Examples
### `decompand` Example 1
```
const object = [{
  propertyA: {
    propertyB: {
      propertyC: [{
        propertyD: {
          propertyE: 555555555
        }
      }, {
        propertyD: {
          propertyF: [{
            propertyG: 777
          }, {
            propertyG: 777777
          }, {
            propertyG: 777777777
          }],
        }
      }]
    }
  }
}]
const objectCompand = Recourse.compand(object, { values: true })
```
*objectCompand*  
```
[
  [
    "0",
    {
      "propertyA": {
        "propertyB": {
          "propertyC": [
            {
              "propertyD": {
                "propertyE": 555555555
              }
            },
            {
              "propertyD": {
                "propertyF": [
                  {
                    "propertyG": 777
                  },
                  {
                    "propertyG": 777777
                  },
                  {
                    "propertyG": 777777777
                  }
                ]
              }
            }
          ]
        }
      }
    }
  ],
  [
    "0.propertyA",
    {
      "propertyB": {
        "propertyC": [
          {
            "propertyD": {
              "propertyE": 555555555
            }
          },
          {
            "propertyD": {
              "propertyF": [
                {
                  "propertyG": 777
                },
                {
                  "propertyG": 777777
                },
                {
                  "propertyG": 777777777
                }
              ]
            }
          }
        ]
      }
    }
  ],
  [
    "0.propertyA.propertyB",
    {
      "propertyC": [
        {
          "propertyD": {
            "propertyE": 555555555
          }
        },
        {
          "propertyD": {
            "propertyF": [
              {
                "propertyG": 777
              },
              {
                "propertyG": 777777
              },
              {
                "propertyG": 777777777
              }
            ]
          }
        }
      ]
    }
  ],
  [
    "0.propertyA.propertyB.propertyC",
    [
      {
        "propertyD": {
          "propertyE": 555555555
        }
      },
      {
        "propertyD": {
          "propertyF": [
            {
              "propertyG": 777
            },
            {
              "propertyG": 777777
            },
            {
              "propertyG": 777777777
            }
          ]
        }
      }
    ]
  ],
  [
    "0.propertyA.propertyB.propertyC.0",
    {
      "propertyD": {
        "propertyE": 555555555
      }
    }
  ],
  [
    "0.propertyA.propertyB.propertyC.0.propertyD",
    {
      "propertyE": 555555555
    }
  ],
  [
    "0.propertyA.propertyB.propertyC.0.propertyD.propertyE",
    555555555
  ],
  [
    "0.propertyA.propertyB.propertyC.1",
    {
      "propertyD": {
        "propertyF": [
          {
            "propertyG": 777
          },
          {
            "propertyG": 777777
          },
          {
            "propertyG": 777777777
          }
        ]
      }
    }
  ],
  [
    "0.propertyA.propertyB.propertyC.1.propertyD",
    {
      "propertyF": [
        {
          "propertyG": 777
        },
        {
          "propertyG": 777777
        },
        {
          "propertyG": 777777777
        }
      ]
    }
  ],
  [
    "0.propertyA.propertyB.propertyC.1.propertyD.propertyF",
    [
      {
        "propertyG": 777
      },
      {
        "propertyG": 777777
      },
      {
        "propertyG": 777777777
      }
    ]
  ],
  [
    "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.0",
    {
      "propertyG": 777
    }
  ],
  [
    "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.0.propertyG",
    777
  ],
  [
    "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.1",
    {
      "propertyG": 777777
    }
  ],
  [
    "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.1.propertyG",
    777777
  ],
  [
    "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.2",
    {
      "propertyG": 777777777
    }
  ],
  [
    "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.2.propertyG",
    777777777
  ]
]
```
*objectDecompand*  
```
[
  {
    "propertyA": {
      "propertyB": {
        "propertyC": [
          {
            "propertyD": {
              "propertyE": 555555555
            }
          },
          {
            "propertyD": {
              "propertyF": [
                {
                  "propertyG": 777
                },
                {
                  "propertyG": 777777
                },
                {
                  "propertyG": 777777777
                }
              ]
            }
          }
        ]
      }
    }
  }
]
```