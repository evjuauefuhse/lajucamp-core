/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
    const dao = new Dao(db)
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_")
  
    collection.options = {
      "allowEmailAuth": true,
      "allowOAuth2Auth": false,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": "@request.auth.manageUsers=true",
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": true
    }
  
    // add
    collection.schema.addField(new SchemaField({
      "system": false,
      "id": "2yiwcs4l",
      "name": "manageKeys",
      "type": "bool",
      "required": false,
      "presentable": false,
      "unique": false,
      "options": {}
    }))
  
    // add
    collection.schema.addField(new SchemaField({
      "system": false,
      "id": "3bza8o4z",
      "name": "managePages",
      "type": "bool",
      "required": false,
      "presentable": false,
      "unique": false,
      "options": {}
    }))
  
    return dao.saveCollection(collection)
  }, (db) => {
    const dao = new Dao(db)
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_")
  
    collection.options = {
      "allowEmailAuth": true,
      "allowOAuth2Auth": false,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": "@request.auth.manageUsers=true",
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "requireEmail": true
    }
  
    // remove
    collection.schema.removeField("2yiwcs4l")
  
    // remove
    collection.schema.removeField("3bza8o4z")
  
    return dao.saveCollection(collection)
  })