
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'MysqlVisualExplain',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://mysqlexplain.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      query_analysi: {
      },

      system_info: {
      },

    }
  }


  entity = {
    "query_analysi": {
      "fields": [
        {
          "name": "explainOutput",
          "type": "`$OBJECT`"
        },
        {
          "name": "mysqlVersion",
          "type": "`$STRING`"
        },
        {
          "name": "query",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "recommendations",
          "type": "`$ARRAY`"
        },
        {
          "name": "visualization",
          "type": "`$OBJECT`"
        }
      ],
      "name": "query_analysi",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/api/explain",
              "parts": [
                "api",
                "explain"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "system_info": {
      "fields": [
        {
          "name": "version",
          "type": "`$STRING`"
        },
        {
          "name": "versionComment",
          "type": "`$STRING`"
        }
      ],
      "name": "system_info",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/version",
              "parts": [
                "api",
                "version"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

