/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
    const dao = new Dao(db)
    const collection = dao.findCollectionByNameOrId("j6ai6y4ijwfwu42")
  
    collection.createRule = "@request.auth.managePages=true"
    collection.updateRule = "@request.auth.managePages=true"
    collection.deleteRule = "@request.auth.managePages=true"
  
    return dao.saveCollection(collection)
  }, (db) => {
    const dao = new Dao(db)
    const collection = dao.findCollectionByNameOrId("j6ai6y4ijwfwu42")
  
    collection.createRule = null
    collection.updateRule = null
    collection.deleteRule = null
  
    return dao.saveCollection(collection)
  })
  