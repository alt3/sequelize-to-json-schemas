# JSON Schema Draft-07

These schemas were automatically generated on 2020-01-17
using [these Sequelize models](../test/models) and the most recent version of
sequelize-to-json-schemas. To confirm that these are indeed all valid schemas use:

- [JSON Schema Validator](https://www.jsonschemavalidator.net/)
- [ajv](https://github.com/epoberezkin/ajv)

## User Model

<!-- prettier-ignore-start -->
```json
{
  "$schema": "https://json-schema.org/draft-07/schema#",
  "$id": "https://api.example.com/user.json",
  "title": "Custom Title",
  "description": "Custom Description",
  "type": "object",
  "properties": {
    "id": {
      "$id": "https://api.example.com/properties/id",
      "type": "integer",
      "format": "int32"
    },
    "createdAt": {
      "$id": "https://api.example.com/properties/createdAt",
      "type": "string",
      "format": "date-time"
    },
    "updatedAt": {
      "$id": "https://api.example.com/properties/updatedAt",
      "type": "string",
      "format": "date-time"
    },
    "ARRAY_INTEGERS": {
      "$id": "https://api.example.com/properties/ARRAY_INTEGERS",
      "type": "array",
      "items": {
        "type": "integer",
        "format": "int32"
      }
    },
    "ARRAY_TEXTS": {
      "$id": "https://api.example.com/properties/ARRAY_TEXTS",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "ARRAY_ALLOWNULL": {
      "$id": "https://api.example.com/properties/ARRAY_ALLOWNULL",
      "type": [
        "array",
        "null"
      ],
      "items": {
        "type": "string"
      }
    },
    "CITEXT": {
      "$id": "https://api.example.com/properties/CITEXT",
      "type": "string"
    },
    "INTEGER": {
      "$id": "https://api.example.com/properties/INTEGER",
      "type": "integer",
      "format": "int32",
      "default": 0
    },
    "STRING": {
      "$id": "https://api.example.com/properties/STRING",
      "type": "string",
      "default": "Default value for STRING"
    },
    "STRING_ALLOWNULL": {
      "$id": "https://api.example.com/properties/STRING_ALLOWNULL",
      "type": [
        "string",
        "null"
      ]
    },
    "STRING_1234": {
      "$id": "https://api.example.com/properties/STRING_1234",
      "type": "string",
      "maxLength": 1234
    },
    "STRING_DOT_BINARY": {
      "$id": "https://api.example.com/properties/STRING_DOT_BINARY",
      "type": "string",
      "format": "binary"
    },
    "TEXT": {
      "$id": "https://api.example.com/properties/TEXT",
      "type": "string"
    },
    "UUIDV4": {
      "$id": "https://api.example.com/properties/UUIDV4",
      "type": "string",
      "format": "uuid"
    },
    "JSON": {
      "$id": "https://api.example.com/properties/JSON",
      "type": "object"
    },
    "JSONB_ALLOWNULL": {
      "$id": "https://api.example.com/properties/JSONB_ALLOWNULL",
        "anyOf": [
          { "type": "object" },
          { "type": "array" },
          { "type": "boolean" },
          { "type": "integer" },
          { "type": "number" },
          { "type": "string" },
          { "type": "null" }
        ]
    },
    "VIRTUAL": {
      "$id": "https://api.example.com/properties/VIRTUAL",
      "type": "boolean"
    },
    "VIRTUAL_DEPENDENCY": {
      "$id": "https://api.example.com/properties/VIRTUAL_DEPENDENCY",
      "type": "integer",
      "format": "int32"
    },
    "CUSTOM_DESCRIPTION": {
      "$id": "https://api.example.com/properties/CUSTOM_DESCRIPTION",
      "type": "string",
      "description": "Custom attribute description"
    },
    "CUSTOM_COMMENT": {
      "$id": "https://api.example.com/properties/CUSTOM_COMMENT",
      "type": "string",
      "$comment": "Custom comment"
    },
    "CUSTOM_EXAMPLES": {
      "$id": "https://api.example.com/properties/CUSTOM_EXAMPLES",
      "type": "string",
      "examples": [
        "Custom example 1",
        "Custom example 2"
      ]
    },
    "CUSTOM_READONLY": {
      "$id": "https://api.example.com/properties/CUSTOM_READONLY",
      "type": "string",
      "readOnly": true
    },
    "CUSTOM_WRITEONLY": {
      "$id": "https://api.example.com/properties/CUSTOM_WRITEONLY",
      "type": "string",
      "writeOnly": true
    },
    "companyId": {
      "$id": "https://api.example.com/properties/companyId",
      "type": [
        "integer",
        "null"
      ],
      "format": "int32"
    },
    "bossId": {
      "$id": "https://api.example.com/properties/bossId",
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
    "INTEGER",
    "STRING",
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
  "$schema": "https://json-schema.org/draft-07/schema#",
  "$id": "https://api.example.com/profile.json",
  "title": "Profile",
  "type": "object",
  "properties": {
    "id": {
      "$id": "https://api.example.com/properties/id",
      "type": "integer",
      "format": "int32"
    },
    "name": {
      "$id": "https://api.example.com/properties/name",
      "type": "string"
    },
    "userId": {
      "$id": "https://api.example.com/properties/userId",
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
  "$schema": "https://json-schema.org/draft-07/schema#",
  "$id": "https://api.example.com/document.json",
  "title": "Document",
  "type": "object",
  "properties": {
    "id": {
      "$id": "https://api.example.com/properties/id",
      "type": "integer",
      "format": "int32"
    },
    "name": {
      "$id": "https://api.example.com/properties/name",
      "type": "string"
    },
    "userId": {
      "$id": "https://api.example.com/properties/userId",
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
  "$schema": "https://json-schema.org/draft-07/schema#",
  "$id": "https://api.example.com/company.json",
  "title": "Company",
  "type": "object",
  "properties": {
    "id": {
      "$id": "https://api.example.com/properties/id",
      "type": "integer",
      "format": "int32"
    },
    "name": {
      "$id": "https://api.example.com/properties/name",
      "type": "string"
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
  "$schema": "https://json-schema.org/draft-07/schema#",
  "$id": "https://api.example.com/friendship.json",
  "title": "Friendship",
  "type": "object",
  "properties": {
    "isBestFriend": {
      "$id": "https://api.example.com/properties/isBestFriend",
      "type": "boolean",
      "default": false
    },
    "userId": {
      "$id": "https://api.example.com/properties/userId",
      "type": "integer",
      "format": "int32"
    },
    "friendId": {
      "$id": "https://api.example.com/properties/friendId",
      "type": "integer",
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
example of how to integrate the generated model schemas into a full JSON Schema Draft-07
document (by adding model schemas to `definitions`).

<!-- prettier-ignore-start -->
```json
{
  "$schema": "https://json-schema.org/draft-07/schema#",
  "definitions": {
    "user": {
      "$schema": "https://json-schema.org/draft-07/schema#",
      "$id": "https://api.example.com/user.json",
      "title": "Custom Title",
      "description": "Custom Description",
      "type": "object",
      "properties": {
        "id": {
          "$id": "https://api.example.com/properties/id",
          "type": "integer",
          "format": "int32"
        },
        "createdAt": {
          "$id": "https://api.example.com/properties/createdAt",
          "type": "string",
          "format": "date-time"
        },
        "updatedAt": {
          "$id": "https://api.example.com/properties/updatedAt",
          "type": "string",
          "format": "date-time"
        },
        "ARRAY_INTEGERS": {
          "$id": "https://api.example.com/properties/ARRAY_INTEGERS",
          "type": "array",
          "items": {
            "type": "integer",
            "format": "int32"
          }
        },
        "ARRAY_TEXTS": {
          "$id": "https://api.example.com/properties/ARRAY_TEXTS",
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "ARRAY_ALLOWNULL": {
          "$id": "https://api.example.com/properties/ARRAY_ALLOWNULL",
          "type": [
            "array",
            "null"
          ],
          "items": {
            "type": "string"
          }
        },
        "CITEXT": {
          "$id": "https://api.example.com/properties/CITEXT",
          "type": "string"
        },
        "INTEGER": {
          "$id": "https://api.example.com/properties/INTEGER",
          "type": "integer",
          "format": "int32",
          "default": 0
        },
        "STRING": {
          "$id": "https://api.example.com/properties/STRING",
          "type": "string",
          "default": "Default value for STRING"
        },
        "STRING_ALLOWNULL": {
          "$id": "https://api.example.com/properties/STRING_ALLOWNULL",
          "type": [
            "string",
            "null"
          ]
        },
        "STRING_1234": {
          "$id": "https://api.example.com/properties/STRING_1234",
          "type": "string",
          "maxLength": 1234
        },
        "STRING_DOT_BINARY": {
          "$id": "https://api.example.com/properties/STRING_DOT_BINARY",
          "type": "string",
          "format": "binary"
        },
        "TEXT": {
          "$id": "https://api.example.com/properties/TEXT",
          "type": "string"
        },
        "UUIDV4": {
          "$id": "https://api.example.com/properties/UUIDV4",
          "type": "string",
          "format": "uuid"
        },
        "JSON": {
          "$id": "https://api.example.com/properties/JSON",
          "type": "object"
        },
        "JSONB_ALLOWNULL": {
          "$id": "https://api.example.com/properties/JSONB_ALLOWNULL",
          "anyOf": [
            { "type": "object" },
            { "type": "array" },
            { "type": "boolean" },
            { "type": "integer" },
            { "type": "number" },
            { "type": "string" },
            { "type": "null" }
          ]
        },
        "VIRTUAL": {
          "$id": "https://api.example.com/properties/VIRTUAL",
          "type": "boolean"
        },
        "VIRTUAL_DEPENDENCY": {
          "$id": "https://api.example.com/properties/VIRTUAL_DEPENDENCY",
          "type": "integer",
          "format": "int32"
        },
        "CUSTOM_DESCRIPTION": {
          "$id": "https://api.example.com/properties/CUSTOM_DESCRIPTION",
          "type": "string",
          "description": "Custom attribute description"
        },
        "CUSTOM_COMMENT": {
          "$id": "https://api.example.com/properties/CUSTOM_COMMENT",
          "type": "string",
          "$comment": "Custom comment"
        },
        "CUSTOM_EXAMPLES": {
          "$id": "https://api.example.com/properties/CUSTOM_EXAMPLES",
          "type": "string",
          "examples": [
            "Custom example 1",
            "Custom example 2"
          ]
        },
        "CUSTOM_READONLY": {
          "$id": "https://api.example.com/properties/CUSTOM_READONLY",
          "type": "string",
          "readOnly": true
        },
        "CUSTOM_WRITEONLY": {
          "$id": "https://api.example.com/properties/CUSTOM_WRITEONLY",
          "type": "string",
          "writeOnly": true
        },
        "companyId": {
          "$id": "https://api.example.com/properties/companyId",
          "type": [
            "integer",
            "null"
          ],
          "format": "int32"
        },
        "bossId": {
          "$id": "https://api.example.com/properties/bossId",
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
        "INTEGER",
        "STRING",
        "CUSTOM_READONLY",
        "CUSTOM_WRITEONLY"
      ]
    },
    "profile": {
      "$schema": "https://json-schema.org/draft-07/schema#",
      "$id": "https://api.example.com/profile.json",
      "title": "Profile",
      "type": "object",
      "properties": {
        "id": {
          "$id": "https://api.example.com/properties/id",
          "type": "integer",
          "format": "int32"
        },
        "name": {
          "$id": "https://api.example.com/properties/name",
          "type": "string"
        },
        "userId": {
          "$id": "https://api.example.com/properties/userId",
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
      "$schema": "https://json-schema.org/draft-07/schema#",
      "$id": "https://api.example.com/document.json",
      "title": "Document",
      "type": "object",
      "properties": {
        "id": {
          "$id": "https://api.example.com/properties/id",
          "type": "integer",
          "format": "int32"
        },
        "name": {
          "$id": "https://api.example.com/properties/name",
          "type": "string"
        },
        "userId": {
          "$id": "https://api.example.com/properties/userId",
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
      "$schema": "https://json-schema.org/draft-07/schema#",
      "$id": "https://api.example.com/company.json",
      "title": "Company",
      "type": "object",
      "properties": {
        "id": {
          "$id": "https://api.example.com/properties/id",
          "type": "integer",
          "format": "int32"
        },
        "name": {
          "$id": "https://api.example.com/properties/name",
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    },
    "friendship": {
      "$schema": "https://json-schema.org/draft-07/schema#",
      "$id": "https://api.example.com/friendship.json",
      "title": "Friendship",
      "type": "object",
      "properties": {
        "isBestFriend": {
          "$id": "https://api.example.com/properties/isBestFriend",
          "type": "boolean",
          "default": false
        },
        "userId": {
          "$id": "https://api.example.com/properties/userId",
          "type": "integer",
          "format": "int32"
        },
        "friendId": {
          "$id": "https://api.example.com/properties/friendId",
          "type": "integer",
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
