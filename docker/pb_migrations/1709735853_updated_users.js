/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = "id = @request.auth.id || @request.auth.manageUsers=true"
  collection.viewRule = "id = @request.auth.id || @request.auth.manageUsers=true"
  collection.createRule = "@request.auth.manageUsers=true"
  collection.updateRule = "id = @request.auth.id || @request.auth.manageUsers=true"
  collection.deleteRule = "id = @request.auth.id || @request.auth.manageUsers=true"
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n4nyn9el",
    "name": "team",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "t9tg9af67iipacg",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bat9nczt",
    "name": "manageAllEvents",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ovxi8xub",
    "name": "manageCategories",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2zjgaw46",
    "name": "manageLocations",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fdnpyapg",
    "name": "manageSongs",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fgng2b50",
    "name": "manageWelcome",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nedfvss1",
    "name": "managePosts",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w2c7jdj6",
    "name": "manageTeams",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0gfmq5ms",
    "name": "superadmin",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "emoh2eme",
    "name": "manageUsers",
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

  collection.listRule = "id = @request.auth.id"
  collection.viewRule = "id = @request.auth.id"
  collection.createRule = ""
  collection.updateRule = "id = @request.auth.id"
  collection.deleteRule = "id = @request.auth.id"
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": true,
    "exceptEmailDomains": null,
    "manageRule": null,
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "onlyVerified": false,
    "requireEmail": false
  }

  // remove
  collection.schema.removeField("n4nyn9el")

  // remove
  collection.schema.removeField("bat9nczt")

  // remove
  collection.schema.removeField("ovxi8xub")

  // remove
  collection.schema.removeField("2zjgaw46")

  // remove
  collection.schema.removeField("fdnpyapg")

  // remove
  collection.schema.removeField("fgng2b50")

  // remove
  collection.schema.removeField("nedfvss1")

  // remove
  collection.schema.removeField("w2c7jdj6")

  // remove
  collection.schema.removeField("0gfmq5ms")

  // remove
  collection.schema.removeField("emoh2eme")

  return dao.saveCollection(collection)
})
