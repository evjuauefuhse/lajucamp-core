 
/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6bgrn3ycrw2x96x",
    "created": "2024-03-06 14:37:33.212Z",
    "updated": "2024-03-06 14:37:33.212Z",
    "name": "locations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ucfnv9ih",
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
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.manageLocations=true",
    "updateRule": "@request.auth.manageLocations=true",
    "deleteRule": "@request.auth.manageLocations=true && @collection.events.location != id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6bgrn3ycrw2x96x");

  return dao.deleteCollection(collection);
})
