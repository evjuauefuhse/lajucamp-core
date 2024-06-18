/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
    const dao = new Dao(db)
    const collection = dao.findCollectionByNameOrId("yliy1kr35l8ji41")
  
    collection.createRule = "@request.auth.manageKeys=true"
    collection.updateRule = "@request.auth.manageKeys=true"
    collection.deleteRule = "@request.auth.manageKeys=true"
  
    return dao.saveCollection(collection)
  }, (db) => {
    const dao = new Dao(db)
    const collection = dao.findCollectionByNameOrId("yliy1kr35l8ji41")
  
    collection.createRule = null
    collection.updateRule = null
    collection.deleteRule = null
  
    return dao.saveCollection(collection)
  })
  