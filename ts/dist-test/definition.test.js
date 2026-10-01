"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "query_analysi",
        "accessor": "QueryAnalysi",
        "op": "create",
        "method": "POST",
        "path": "/api/explain",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
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
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "version": "8.0.29",
            "versionComment": "MySQL Community Server - GPL"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map