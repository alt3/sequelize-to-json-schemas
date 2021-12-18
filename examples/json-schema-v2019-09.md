# JSON Schema Draft 2019-09

These schemas were automatically generated on 2021-12-18
using [these Sequelize models](../test/models) and the most recent version of
sequelize-to-json-schemas. To confirm that these are indeed all valid schemas use:

- [JSON Schema Validator](https://www.jsonschemavalidator.net/)
- [ajv](https://github.com/epoberezkin/ajv)

## User Model

<!-- prettier-ignore-start -->
```json
{
  "$schema": "https://json-schema.org/draft/2019-09/schema#",
  "$id": "https://api.example.com/user.json",
  "title": "Custom User Title",
  "description": "Custom User Description",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int32"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "type": "string",
      "format": "date-time"
    },
    "ARRAY_INTEGERS": {
      "type": "array",
      "items": {
        "type": "integer",
        "format": "int32"
      }
    },
    "ARRAY_TEXTS": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "ARRAY_ALLOWNULL_EXPLICIT": {
      "type": [
        "array",
        "null"
      ],
      "items": {
        "type": "string"
      }
    },
    "ARRAY_ALLOWNULL_IMPLICIT": {
      "type": [
        "array",
        "null"
      ],
      "items": {
        "type": "string"
      }
    },
    "ARRAY_ENUM_STRINGS": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "hello",
          "world"
        ]
      }
    },
    "BLOB": {
      "type": "string",
      "contentEncoding": "base64"
    },
    "CITEXT": {
      "type": "string"
    },
    "INTEGER": {
      "type": "integer",
      "format": "int32",
      "default": 0
    },
    "STRING": {
      "type": "string",
      "default": "Default value for STRING"
    },
    "STRING_ALLOWNULL_EXPLICIT": {
      "type": [
        "string",
        "null"
      ]
    },
    "STRING_ALLOWNULL_IMPLICIT": {
      "type": [
        "string",
        "null"
      ]
    },
    "STRING_1234": {
      "type": "string",
      "maxLength": 1234
    },
    "STRING_DOT_BINARY": {
      "type": "string",
      "format": "binary"
    },
    "TEXT": {
      "type": "string"
    },
    "UUIDV4": {
      "type": "string",
      "format": "uuid"
    },
    "JSON": {
      "anyOf": [
        {
          "type": "object"
        },
        {
          "type": "array"
        },
        {
          "type": "boolean"
        },
        {
          "type": "integer"
        },
        {
          "type": "number"
        },
        {
          "type": "string"
        }
      ],
      "type": "object"
    },
    "JSONB_ALLOWNULL": {
      "anyOf": [
        {
          "type": "object"
        },
        {
          "type": "array"
        },
        {
          "type": "boolean"
        },
        {
          "type": "integer"
        },
        {
          "type": "number"
        },
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "VIRTUAL": {
      "type": "boolean"
    },
    "VIRTUAL_DEPENDENCY": {
      "type": "integer",
      "format": "int32"
    },
    "CUSTOM_DESCRIPTION": {
      "type": "string",
      "description": "Custom attribute description"
    },
    "CUSTOM_COMMENT": {
      "type": "string",
      "$comment": "Custom comment"
    },
    "CUSTOM_EXAMPLES": {
      "type": "string",
      "examples": [
        "Custom example 1",
        "Custom example 2"
      ]
    },
    "CUSTOM_READONLY": {
      "type": "string",
      "readOnly": true
    },
    "CUSTOM_WRITEONLY": {
      "type": "string",
      "writeOnly": true
    },
    "companyId": {
      "type": [
        "integer",
        "null"
      ],
      "format": "int32"
    },
    "bossId": {
      "type": [
        "integer",
        "null"
      ],
      "format": "int32"
    },
    "profile": {
      "$ref": "#/definitions/profile"
    },
    "company": {
      "$ref": "#/definitions/company"
    },
    "documents": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/document"
      }
    },
    "boss": {
      "$ref": "#/definitions/user"
    },
    "friends": {
      "type": "array",
      "items": {
        "allOf": [
          {
            "$ref": "#/definitions/user"
          },
          {
            "type": "object",
            "properties": {
              "friendships": {
                "$ref": "#/definitions/friendship"
              }
            }
          }
        ]
      }
    }
  },
  "required": [
    "id",
    "createdAt",
    "updatedAt",
    "ARRAY_INTEGERS",
    "ARRAY_TEXTS",
    "ARRAY_ENUM_STRINGS",
    "BLOB",
    "CITEXT",
    "INTEGER",
    "STRING",
    "STRING_1234",
    "STRING_DOT_BINARY",
    "TEXT",
    "UUIDV4",
    "JSON",
    "VIRTUAL",
    "VIRTUAL_DEPENDENCY",
    "CUSTOM_DESCRIPTION",
    "CUSTOM_COMMENT",
    "CUSTOM_EXAMPLES",
    "CUSTOM_READONLY",
    "CUSTOM_WRITEONLY"
  ]
}
```
<!-- prettier-ignore-end -->

## Profile Model

<!-- prettier-ignore-start -->
```json
{
  "$schema": "https://json-schema.org/draft/2019-09/schema#",
  "$id": "https://api.example.com/profile.json",
  "title": "Profile",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int32"
    },
    "name": {
      "type": [
        "string",
        "null"
      ]
    },
    "userId": {
      "type": [
        "integer",
        "null"
      ],
      "format": "int32"
    }
  },
  "required": [
    "id"
  ]
}
```
<!-- prettier-ignore-end -->

## Document Model

<!-- prettier-ignore-start -->
```json
{
  "$schema": "https://json-schema.org/draft/2019-09/schema#",
  "$id": "https://api.example.com/document.json",
  "title": "Document",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int32"
    },
    "name": {
      "type": [
        "string",
        "null"
      ]
    },
    "userId": {
      "type": [
        "integer",
        "null"
      ],
      "format": "int32"
    }
  },
  "required": [
    "id"
  ]
}
```
<!-- prettier-ignore-end -->

## Company Model

<!-- prettier-ignore-start -->
```json
{
  "$schema": "https://json-schema.org/draft/2019-09/schema#",
  "$id": "https://api.example.com/company.json",
  "title": "Company",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int32"
    },
    "name": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "required": [
    "id"
  ]
}
```
<!-- prettier-ignore-end -->

## Friendship Model

<!-- prettier-ignore-start -->
```json
{
  "$schema": "https://json-schema.org/draft/2019-09/schema#",
  "$id": "https://api.example.com/friendship.json",
  "title": "Friendship",
  "type": "object",
  "properties": {
    "isBestFriend": {
      "type": [
        "boolean",
        "null"
      ],
      "default": false
    },
    "userId": {
      "type": [
        "integer",
        "null"
      ],
      "format": "int32"
    },
    "friendId": {
      "type": [
        "integer",
        "null"
      ],
      "format": "int32"
    }
  },
  "required": [
    "isBestFriend"
  ]
}
```
<!-- prettier-ignore-end -->

## Full Schema

Please note that sequelize-to-json-schemas does NOT generate full schemas. This is just an
example of how to integrate the generated model schemas into a full JSON Schema Draft 2019-09
document (by adding model schemas to `definitions`).

<!-- prettier-ignore-start -->
```json
{
  "$schema": "https://json-schema.org/draft-07/schema#",
  "definitions": {
    "user": {
      "$schema": "https://json-schema.org/draft/2019-09/schema#",
      "$id": "https://api.example.com/user.json",
      "title": "Custom User Title",
      "description": "Custom User Description",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32"
        },
        "createdAt": {
          "type": "string",
          "format": "date-time"
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time"
        },
        "ARRAY_INTEGERS": {
          "type": "array",
          "items": {
            "type": "integer",
            "format": "int32"
          }
        },
        "ARRAY_TEXTS": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "ARRAY_ALLOWNULL_EXPLICIT": {
          "type": [
            "array",
            "null"
          ],
          "items": {
            "type": "string"
          }
        },
        "ARRAY_ALLOWNULL_IMPLICIT": {
          "type": [
            "array",
            "null"
          ],
          "items": {
            "type": "string"
          }
        },
        "ARRAY_ENUM_STRINGS": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "hello",
              "world"
            ]
          }
        },
        "BLOB": {
          "type": "string",
          "contentEncoding": "base64"
        },
        "CITEXT": {
          "type": "string"
        },
        "INTEGER": {
          "type": "integer",
          "format": "int32",
          "default": 0
        },
        "STRING": {
          "type": "string",
          "default": "Default value for STRING"
        },
        "STRING_ALLOWNULL_EXPLICIT": {
          "type": [
            "string",
            "null"
          ]
        },
        "STRING_ALLOWNULL_IMPLICIT": {
          "type": [
            "string",
            "null"
          ]
        },
        "STRING_1234": {
          "type": "string",
          "maxLength": 1234
        },
        "STRING_DOT_BINARY": {
          "type": "string",
          "format": "binary"
        },
        "TEXT": {
          "type": "string"
        },
        "UUIDV4": {
          "type": "string",
          "format": "uuid"
        },
        "JSON": {
          "anyOf": [
            {
              "type": "object"
            },
            {
              "type": "array"
            },
            {
              "type": "boolean"
            },
            {
              "type": "integer"
            },
            {
              "type": "number"
            },
            {
              "type": "string"
            }
          ],
          "type": "object"
        },
        "JSONB_ALLOWNULL": {
          "anyOf": [
            {
              "type": "object"
            },
            {
              "type": "array"
            },
            {
              "type": "boolean"
            },
            {
              "type": "integer"
            },
            {
              "type": "number"
            },
            {
              "type": "string"
            },
            {
              "type": "null"
            }
          ]
        },
        "VIRTUAL": {
          "type": "boolean"
        },
        "VIRTUAL_DEPENDENCY": {
          "type": "integer",
          "format": "int32"
        },
        "CUSTOM_DESCRIPTION": {
          "type": "string",
          "description": "Custom attribute description"
        },
        "CUSTOM_COMMENT": {
          "type": "string",
          "$comment": "Custom comment"
        },
        "CUSTOM_EXAMPLES": {
          "type": "string",
          "examples": [
            "Custom example 1",
            "Custom example 2"
          ]
        },
        "CUSTOM_READONLY": {
          "type": "string",
          "readOnly": true
        },
        "CUSTOM_WRITEONLY": {
          "type": "string",
          "writeOnly": true
        },
        "companyId": {
          "type": [
            "integer",
            "null"
          ],
          "format": "int32"
        },
        "bossId": {
          "type": [
            "integer",
            "null"
          ],
          "format": "int32"
        },
        "profile": {
          "$ref": "#/definitions/profile"
        },
        "company": {
          "$ref": "#/definitions/company"
        },
        "documents": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/document"
          }
        },
        "boss": {
          "$ref": "#/definitions/user"
        },
        "friends": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "$ref": "#/definitions/user"
              },
              {
                "type": "object",
                "properties": {
                  "friendships": {
                    "$ref": "#/definitions/friendship"
                  }
                }
              }
            ]
          }
        }
      },
      "required": [
        "id",
        "createdAt",
        "updatedAt",
        "ARRAY_INTEGERS",
        "ARRAY_TEXTS",
        "ARRAY_ENUM_STRINGS",
        "BLOB",
        "CITEXT",
        "INTEGER",
        "STRING",
        "STRING_1234",
        "STRING_DOT_BINARY",
        "TEXT",
        "UUIDV4",
        "JSON",
        "VIRTUAL",
        "VIRTUAL_DEPENDENCY",
        "CUSTOM_DESCRIPTION",
        "CUSTOM_COMMENT",
        "CUSTOM_EXAMPLES",
        "CUSTOM_READONLY",
        "CUSTOM_WRITEONLY"
      ]
    },
    "profile": {
      "$schema": "https://json-schema.org/draft/2019-09/schema#",
      "$id": "https://api.example.com/profile.json",
      "title": "Profile",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32"
        },
        "name": {
          "type": [
            "string",
            "null"
          ]
        },
        "userId": {
          "type": [
            "integer",
            "null"
          ],
          "format": "int32"
        }
      },
      "required": [
        "id"
      ]
    },
    "document": {
      "$schema": "https://json-schema.org/draft/2019-09/schema#",
      "$id": "https://api.example.com/document.json",
      "title": "Document",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32"
        },
        "name": {
          "type": [
            "string",
            "null"
          ]
        },
        "userId": {
          "type": [
            "integer",
            "null"
          ],
          "format": "int32"
        }
      },
      "required": [
        "id"
      ]
    },
    "company": {
      "$schema": "https://json-schema.org/draft/2019-09/schema#",
      "$id": "https://api.example.com/company.json",
      "title": "Company",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int32"
        },
        "name": {
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "id"
      ]
    },
    "friendship": {
      "$schema": "https://json-schema.org/draft/2019-09/schema#",
      "$id": "https://api.example.com/friendship.json",
      "title": "Friendship",
      "type": "object",
      "properties": {
        "isBestFriend": {
          "type": [
            "boolean",
            "null"
          ],
          "default": false
        },
        "userId": {
          "type": [
            "integer",
            "null"
          ],
          "format": "int32"
        },
        "friendId": {
          "type": [
            "integer",
            "null"
          ],
          "format": "int32"
        }
      },
      "required": [
        "isBestFriend"
      ]
    }
  }
}
```
<!-- prettier-ignore-end -->
