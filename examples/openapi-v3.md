# OpenAPI 3.0

These schemas were automatically generated on 2019-11-01
using [these Sequelize models](../test/models/) and the most recent version of
sequelize-to-json-schemas. To confirm that these are indeed all valid schemas use:

- [Swagger Editor](https://editor.swagger.io/)
- [Online Swagger & OpenAPI Validator](https://apidevtools.org/swagger-parser/online)
- [Swagger Parser](https://github.com/swagger-api/swagger-parser)

## User Model

<!-- prettier-ignore-start -->
```json
{
  "title": "Custom Title",
  "description": "Custom Description",
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
    "STRING_ALLOWNULL": {
      "type": "string",
      "nullable": true
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
      "type": "object"
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
      "type": "string"
    },
    "CUSTOM_EXAMPLES": {
      "type": "string",
      "example": [
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
    "profile": {
      "$ref": "#/components/schemas/profiles"
    },
    "documents": {
      "type": "array",
      "items": {
        "oneOf": [
          {
            "$ref": "#/components/schemas/documents"
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
  "title": "Profile",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int32"
    },
    "name": {
      "type": "string"
    },
    "userId": {
      "type": "integer",
      "format": "int32",
      "nullable": true
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
  "title": "Document",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int32"
    },
    "name": {
      "type": "string"
    },
    "userId": {
      "type": "integer",
      "format": "int32",
      "nullable": true
    }
  },
  "required": [
    "id"
  ]
}
```
<!-- prettier-ignore-end -->

## Full Schema

Please note that sequelize-to-json-schemas does NOT generate full schemas. This is just an
example of how to integrate the generated model schemas into a full OpenAPI 3.0 document
(by adding model schemas to `components.schemas`).

<!-- prettier-ignore-start -->
```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "Fake API",
    "version": "0.0.1"
  },
  "paths": {
    "/users": {
      "get": {
        "parameters": [],
        "responses": {
          "404": {
            "description": "not found"
          }
        }
      }
    },
    "/profiles": {
      "get": {
        "responses": {
          "404": {
            "description": "not found"
          }
        }
      }
    },
    "/documents": {
      "get": {
        "responses": {
          "404": {
            "description": "not found"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "users": {
        "title": "Custom Title",
        "description": "Custom Description",
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
          "STRING_ALLOWNULL": {
            "type": "string",
            "nullable": true
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
            "type": "object"
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
            "type": "string"
          },
          "CUSTOM_EXAMPLES": {
            "type": "string",
            "example": [
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
          "profile": {
            "$ref": "#/components/schemas/profiles"
          },
          "documents": {
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "$ref": "#/components/schemas/documents"
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
      "profiles": {
        "title": "Profile",
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "name": {
            "type": "string"
          },
          "userId": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          }
        },
        "required": [
          "id"
        ]
      },
      "documents": {
        "title": "Document",
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int32"
          },
          "name": {
            "type": "string"
          },
          "userId": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          }
        },
        "required": [
          "id"
        ]
      }
    }
  }
}
```
<!-- prettier-ignore-end -->
