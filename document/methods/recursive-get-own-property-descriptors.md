| [➲ Recourse](../../README.md) | *`recursiveGetOwnPropertyDescriptors`* |
| :-- | :-- |

# `recursiveGetOwnPropertyDescriptors`
Returns object/array property descriptor abstract syntax tree (PDAST).  

## Syntax
```
import { recursiveGetOwnPropertyDescriptors } from 'recourse'
recursiveGetOwnPropertyDescriptors($source, $options)
```
### `$source` Argument
**Type**: `object`, `array`  
**Required**: `true`  
**Descript**: Object/Array property key/value pairs expand to AST.  
### `$options` Argument
**Type**: `object`  
```
{
  delimiter: '.',
  maxDepth: 10,
  path: false,
  retrocursion: false,
  type: false,
}
```

#### `$options.delimiter`
**Type**: `string`  
**Default**: `.`  
**Descript**: Property path separator.  

#### `$options.maxDepth`
**Type**: `number`  
**Default**: `10`  
**Descript**: Maximum depth of subproperty descriptors.  

#### `$options.path`
**Type**: `boolean`  
**Default**: `false`  
**Descript**: When `$options.path` is:  
 - `true`: Property descriptor value's `path` stored.  
 - `false`: **No** property descriptor value's `path` stored. 

#### `$options.retrocursion`
**Type**: `boolean`  
**Default**: `false`  
**Descript**: When `$options.type` is:  
 - `true`: Property descriptor value's `type` stored.  
 - `false`: **No** property descriptor value's `type` stored. 

#### `$options.type`
**Type**: `boolean`  
**Default**: `true`  
**Descript**: When `$options.type` is:  
 - `true`: Property descriptor value's `type` stored.  
 - `false`: **No** property descriptor value's `type` stored. 

## `recursiveGetOwnPropertyDescriptors` Examples
### `recursiveGetOwnPropertyDescriptors` Example 1
```
const object = {
  propertyA: {
    propertyB: "2"
  }
}
const objectPDAST = recursiveGetOwnPropertyDescriptors(object)
```
*objectPDAST*  
```
{
  "propertyA": {
    "value": {
      "propertyB": {
        "value": "2",
        "writable": true,
        "enumerable": true,
        "configurable": true
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true
  }
}
```
### `recursiveGetOwnPropertyDescriptors` Example 2
```
const object = {
  propertyA: {
    propertyB: "2"
  }
}
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  type: true
})
```
*objectPDAST*  
```
{
  "propertyA": {
    "value": {
      "propertyB": {
        "value": "2",
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "type": "string"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "type": "object"
  }
}
```

### `recursiveGetOwnPropertyDescriptors` Example 3
```
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  type: true, 
})
```
*objectPDAST*  
```
{
  "propertyA": {
    "value": {
      "0": {
        "value": {
          "propertyC": {
            "value": 3,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "type": "object"
      },
      "1": {
        "value": {
          "propertyC": {
            "value": 33,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "type": "object"
      },
      "2": {
        "value": {
          "propertyC": {
            "value": 333,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "type": "object"
      },
      "length": {
        "value": 3,
        "writable": true,
        "enumerable": false,
        "configurable": false,
        "type": "number"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "type": "array"
  }
```


### `recursiveGetOwnPropertyDescriptors` Example 4
```
const object = {
  propertyA: [
    { propertyC: 3 },
    { propertyC: 33 },
    { propertyC: 333 },
  ]
}
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true
})
```
*objectPDAST*  
```
{
  "propertyA": {
    "value": {
      "0": {
        "value": {
          "propertyC": {
            "value": 3,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.0.propertyC",
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.0",
        "type": "object"
      },
      "1": {
        "value": {
          "propertyC": {
            "value": 33,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.1.propertyC",
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.1",
        "type": "object"
      },
      "2": {
        "value": {
          "propertyC": {
            "value": 333,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.2.propertyC",
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.2",
        "type": "object"
      },
      "length": {
        "value": 3,
        "writable": true,
        "enumerable": false,
        "configurable": false,
        "path": "propertyA.length",
        "type": "number"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyA",
    "type": "array"
  }
}
```

### `recursiveGetOwnPropertyDescriptors` Example 5
```
const object = {
  propertyA: {
    propertyB: 2,
  }
}
object.propertyA.propertyC = object.propertyA
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true,
  retrocursion: false,
})
```
*objectPDAST*  
```
{
  "propertyA": {
    "value": {
      "propertyB": {
        "value": 2,
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.propertyB",
        "type": "number"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyA",
    "type": "object"
  }
}
```

### `recursiveGetOwnPropertyDescriptors` Example 6
```
const object = {
  propertyA: {
    propertyB: 2,
  }
}
object.propertyA.propertyC = object.propertyA
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true,
  retrocursion: true,
  maxDepth: 5,
})
```
*objectPDAST*  
```
{
  "propertyA": {
    "value": {
      "propertyB": {
        "value": 2,
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.propertyB",
        "type": "number"
      },
      "propertyC": {
        "value": {
          "propertyB": {
            "value": 2,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.propertyC.propertyB",
            "type": "number"
          },
          "propertyC": {
            "value": {
              "propertyB": {
                "value": 2,
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.propertyC.propertyC.propertyB",
                "type": "number"
              },
              "propertyC": {
                "value": {
                  "propertyB": {
                    "value": 2,
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.propertyC.propertyC.propertyC.propertyB",
                    "type": "number"
                  },
                  "propertyC": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.propertyC.propertyC.propertyC.propertyC",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.propertyC.propertyC.propertyC",
                "type": "object"
              }
            },
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.propertyC.propertyC",
            "type": "object"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.propertyC",
        "type": "object"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyA",
    "type": "object"
  }
}
```

### `recursiveGetOwnPropertyDescriptors` Example 7
```
const object = {
  propertyA: {
    propertyB: 2,
  },
  propertyC: {
    propertyD: 4
  }
}
object.propertyA.propertyC = object.propertyC
object.propertyC.propertyA = object.propertyA
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true,
  retrocursion: false,
  maxDepth: 5,
})
const objectPDASTString = JSON.stringify(objectPDAST, null, 2)
```
***objectPDAST***  
```
{
  "propertyA": {
    "value": {
      "propertyB": {
        "value": 2,
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.propertyB",
        "type": "number"
      },
      "propertyC": {
        "value": {
          "propertyD": {
            "value": 4,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.propertyC.propertyD",
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.propertyC",
        "type": "object"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyA",
    "type": "object"
  },
  "propertyC": {
    "value": {
      "propertyD": {
        "value": 4,
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyC.propertyD",
        "type": "number"
      },
      "propertyA": {
        "value": {
          "propertyB": {
            "value": 2,
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyC.propertyA.propertyB",
            "type": "number"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyC.propertyA",
        "type": "object"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyC",
    "type": "object"
  }
}
```

### `recursiveGetOwnPropertyDescriptors` Example 8
```
const object = {
  propertyA: {},
}
object.propertyA.root = object // NO
object.propertyA.parent = object.propertyA // No
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true,
  retrocursion: false,
  maxDepth: 5,
})
```
***objectPDAST***  
```
{
  "propertyA": {
    "value": {},
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyA",
    "type": "object"
  }
}
```

### `recursiveGetOwnPropertyDescriptors` Example 9
```
const object = {
  propertyA: {},
}
object.propertyA.root = object
object.propertyA.parent = object.propertyA
const objectPDAST = recursiveGetOwnPropertyDescriptors(object, {
  path: true,
  type: true,
  retrocursion: true,
  maxDepth: 5,
})
```
***objectPDAST***  
```
{
  "propertyA": {
    "value": {
      "root": {
        "value": {
          "propertyA": {
            "value": {
              "root": {
                "value": {
                  "propertyA": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.root.propertyA.root.propertyA",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.root.propertyA.root",
                "type": "object"
              },
              "parent": {
                "value": {
                  "root": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.root.propertyA.parent.root",
                    "type": "object"
                  },
                  "parent": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.root.propertyA.parent.parent",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.root.propertyA.parent",
                "type": "object"
              }
            },
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.root.propertyA",
            "type": "object"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.root",
        "type": "object"
      },
      "parent": {
        "value": {
          "root": {
            "value": {
              "propertyA": {
                "value": {
                  "root": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.root.propertyA.root",
                    "type": "object"
                  },
                  "parent": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.root.propertyA.parent",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.parent.root.propertyA",
                "type": "object"
              }
            },
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.parent.root",
            "type": "object"
          },
          "parent": {
            "value": {
              "root": {
                "value": {
                  "propertyA": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.parent.root.propertyA",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.parent.parent.root",
                "type": "object"
              },
              "parent": {
                "value": {
                  "root": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.parent.parent.root",
                    "type": "object"
                  },
                  "parent": {
                    "value": {},
                    "writable": true,
                    "enumerable": true,
                    "configurable": true,
                    "path": "propertyA.parent.parent.parent.parent",
                    "type": "object"
                  }
                },
                "writable": true,
                "enumerable": true,
                "configurable": true,
                "path": "propertyA.parent.parent.parent",
                "type": "object"
              }
            },
            "writable": true,
            "enumerable": true,
            "configurable": true,
            "path": "propertyA.parent.parent",
            "type": "object"
          }
        },
        "writable": true,
        "enumerable": true,
        "configurable": true,
        "path": "propertyA.parent",
        "type": "object"
      }
    },
    "writable": true,
    "enumerable": true,
    "configurable": true,
    "path": "propertyA",
    "type": "object"
  }
}
```