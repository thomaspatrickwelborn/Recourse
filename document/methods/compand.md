| [➲ Recourse](../../README.md) | *`compand`* |
| :-- | :-- |

# `compand` Method
Compand multidimensional object/array property key/value pairs to mono-dimensional property path/value pairs. 
 - [`compand` Method Syntax](#compand-method-syntax)
 - [`compand` Examples](#compand-examples)

## `compand` Method Syntax
```
Recourse.compand($source, $property)
```
### `$source` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Object/Array property key/value pairs compand to AST.  
### `$options` Argument

### `return` Value
**Type**: `object`, `array`  
**Descript**  Returns companded property path directory from source object.  

## `compand` Examples
### `compand` Example 1
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
const objectCompand = Recourse.compand(object, { values: false })
```
*objectCompand*  
```
[
  "0",
  "0.propertyA",
  "0.propertyA.propertyB",
  "0.propertyA.propertyB.propertyC",
  "0.propertyA.propertyB.propertyC.0",
  "0.propertyA.propertyB.propertyC.0.propertyD",
  "0.propertyA.propertyB.propertyC.0.propertyD.propertyE",
  "0.propertyA.propertyB.propertyC.1",
  "0.propertyA.propertyB.propertyC.1.propertyD",
  "0.propertyA.propertyB.propertyC.1.propertyD.propertyF",
  "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.0",
  "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.0.propertyG",
  "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.1",
  "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.1.propertyG",
  "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.2",
  "0.propertyA.propertyB.propertyC.1.propertyD.propertyF.2.propertyG"
]
```

### `compand` Example 2
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