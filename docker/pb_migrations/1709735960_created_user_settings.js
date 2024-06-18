/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3dp2s3pj18mc1gw",
    "created": "2024-03-06 14:39:20.933Z",
    "updated": "2024-03-06 14:39:20.933Z",
    "name": "user_settings",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rkx1ezxm",
        "name": "user",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "vtzvrowl",
        "name": "setting",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "gwv7n3q5",
        "name": "content",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id=user.id || @request.auth.manageUsers=true",
    "viewRule": "@request.auth.id=user.id",
    "createRule": "@request.auth.id=user.id || @request.auth.manageUsers=true",
    "updateRule": "@request.auth.id=user.id",
    "deleteRule": "@request.auth.id=user.id || @request.auth.manageUsers=true",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3dp2s3pj18mc1gw");

  return dao.deleteCollection(collection);
})
