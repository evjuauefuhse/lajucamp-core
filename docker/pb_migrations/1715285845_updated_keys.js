/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yliy1kr35l8ji41")

  collection.listRule = "@request.auth.manageKeys=true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yliy1kr35l8ji41")

  collection.listRule = null

  return dao.saveCollection(collection)
})