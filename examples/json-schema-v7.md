### JSON Schema Draft-07

 Please note that sequelize-to-json-schemas only generated the content of `definitions`.

 ```json
 {
  "$schema": "https://json-schema.org/draft-07/schema#",
  "definitions": {
    "users": {
      "$schema": "https://json-schema.org/draft-07/schema#",
      "$id": "https://api.example.com/user.json",
      "title": "User",
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
        "profile": {
          "$ref": "#/definitions/profiles"
        },
        "documents": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "$ref": "#/definitions/documents"
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
    "documents": {
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
  }
}
 ```
 