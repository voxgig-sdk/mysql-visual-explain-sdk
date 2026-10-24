import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "query_analysi",
    "accessor": "QueryAnalysi",
    "op": "create",
    "method": "POST",
    "path": "/api/explain",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "visualization": {
        "nodes": [
          {
            "id": "x",
            "type": "x",
            "table": "x",
            "selectType": "x",
            "accessType": "x",
            "possibleKeys": [
              "x"
            ],
            "key": "x",
            "keyLen": "x",
            "ref": "x",
            "rows": 1,
            "filtered": 1,
            "extra": "x"
          }
        ],
        "edges": [
          {
            "from": "x",
            "to": "x"
          }
        ]
      },
      "explainOutput": {},
      "recommendations": [
        {
          "severity": "critical",
          "message": "x",
          "suggestion": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "system_info",
    "accessor": "SystemInfo",
    "op": "load",
    "method": "GET",
    "path": "/api/version",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "version": "8.0.29",
      "versionComment": "MySQL Community Server - GPL"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
