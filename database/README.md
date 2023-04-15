```
{
    "rules": {
      "items": {
        "comment": "// Allow anyone to read items",
        ".read": "true",
        
        "comment": "// Allow anyone to create new items, but prevent overwriting existing items",
        ".write": "!data.exists()",
        
        "$itemId": {
          "comment": "// Allow anyone to read an individual item",
          ".read": "true",
          
          "comment": "// Allow anyone to update an existing item, but prevent creating new items this way",
          ".write": "data.exists() && newData.exists()",
          
          "comment": "// Allow anyone to delete an item",
          ".validate": "newData.exists() || !data.exists()"
        }
      }
    }
  }
  ```