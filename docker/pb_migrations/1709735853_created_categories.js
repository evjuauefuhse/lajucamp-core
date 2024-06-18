 /// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "82isa46qhzcnd50",
    "created": "2024-03-06 14:37:33.211Z",
    "updated": "2024-03-06 14:37:33.211Z",
    "name": "categories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "khhek5fc",
        "name": "name",
        "type": "text",
        "required": false,
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
        "id": "wfpdu7ic",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.manageCategories=true",
    "updateRule": "@request.auth.manageCategories=true",
    "deleteRule": "@request.auth.manageCategories=true && @collection.events.category != id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("82isa46qhzcnd50");

  return dao.deleteCollection(collection);
})
