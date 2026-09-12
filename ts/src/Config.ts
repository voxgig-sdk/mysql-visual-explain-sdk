
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MysqlVisualExplain',
        slug: "mysql-visual-explain",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "short": "Raw EXPLAIN output from MySQL",
          "type": "`$OBJECT`"
        },
        {
          "name": "mysqlVersion",
          "short": "MySQL version for compatibility (e.g., 8.0, 5.7)",
          "type": "`$STRING`"
        },
        {
          "name": "query",
          "req": true,
          "short": "The SQL query to analyze and visualize",
          "type": "`$STRING`"
        },
        {
          "name": "recommendations",
          "short": "Performance optimization recommendations",
          "type": "`$ARRAY`"
        },
        {
          "name": "visualization",
          "short": "The visual representation data of the query execution plan",
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
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "explain"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "explain"
              ]
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
          "short": "MySQL version string",
          "type": "`$STRING`"
        },
        {
          "name": "versionComment",
          "short": "Additional version information",
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
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "version"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "version"
              ]
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
  config,
  FEATURE_PLUGINS,
}

