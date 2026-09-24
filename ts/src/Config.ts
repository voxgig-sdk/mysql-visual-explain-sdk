
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Explain Output",
          "type": "`$OBJECT`",
          "short": "Raw EXPLAIN output from MySQL"
        },
        {
          "name": "mysqlVersion",
          "title": "Mysql Version",
          "type": "`$STRING`",
          "short": "MySQL version for compatibility (e.g., 8.0, 5.7)"
        },
        {
          "name": "query",
          "title": "Query",
          "type": "`$STRING`",
          "req": true,
          "short": "The SQL query to analyze and visualize"
        },
        {
          "name": "recommendations",
          "title": "Recommendations",
          "type": "`$ARRAY`",
          "short": "Performance optimization recommendations"
        },
        {
          "name": "visualization",
          "title": "Visualization",
          "type": "`$OBJECT`",
          "short": "The visual representation data of the query execution plan"
        }
      ],
      "name": "query_analysi",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
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
              "parts": [
                "api",
                "explain"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "title": "Version",
          "type": "`$STRING`",
          "short": "MySQL version string"
        },
        {
          "name": "versionComment",
          "title": "Version Comment",
          "type": "`$STRING`",
          "short": "Additional version information"
        }
      ],
      "name": "system_info",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "api",
                "version"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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

