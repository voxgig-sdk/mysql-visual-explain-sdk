"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('QueryAnalysiEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MYSQL_VISUAL_EXPLAIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MYSQL_VISUAL_EXPLAIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MysqlVisualExplainSDK.test();
        const ent = testsdk.QueryAnalysi();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MYSQL_VISUAL_EXPLAIN_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'query_analysi.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "explainOutput", "req": false, "short": "Raw EXPLAIN output from MySQL", "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "mysqlVersion", "req": false, "short": "MySQL version for compatibility (e.g., 8.0, 5.7)", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "query", "req": true, "short": "The SQL query to analyze and visualize", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "recommendations", "req": false, "short": "Performance optimization recommendations", "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "visualization", "req": false, "short": "The visual representation data of the query execution plan", "type": "`$OBJECT`", "index$": 4 }], "name": "query_analysi", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/explain", "json": "{\"operationId\":\"generateVisualExplain\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"joinQuery\":{\"summary\":\"Query with JOIN\",\"value\":{\"mysqlVersion\":\"8.0\",\"query\":\"SELECT u.*, o.* FROM users u JOIN orders o ON u.id = o.user_id WHERE u.status = 'active'\"}},\"simpleQuery\":{\"summary\":\"Simple SELECT query\",\"value\":{\"mysqlVersion\":\"8.0\",\"query\":\"SELECT * FROM users WHERE id = 1\"}},\"subqueryExample\":{\"summary\":\"Query with subquery\",\"value\":{\"mysqlVersion\":\"8.0\",\"query\":\"SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 100)\"}}},\"schema\":{\"properties\":{\"mysqlVersion\":{\"description\":\"MySQL version for compatibility (e.g., 8.0, 5.7)\",\"example\":\"8.0\",\"type\":\"string\"},\"query\":{\"description\":\"The SQL query to analyze and visualize\",\"example\":\"SELECT * FROM users WHERE id = 1\",\"type\":\"string\"}},\"required\":[\"query\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"explainOutput\":{\"description\":\"Raw EXPLAIN output from MySQL\",\"type\":\"object\"},\"recommendations\":{\"description\":\"Performance optimization recommendations\",\"items\":{\"properties\":{\"message\":{\"type\":\"string\"},\"severity\":{\"enum\":[\"critical\",\"warning\",\"info\"],\"type\":\"string\"},\"suggestion\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"visualization\":{\"description\":\"The visual representation data of the query execution plan\",\"properties\":{\"edges\":{\"items\":{\"properties\":{\"from\":{\"type\":\"string\"},\"to\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"nodes\":{\"items\":{\"properties\":{\"accessType\":{\"type\":\"string\"},\"extra\":{\"type\":\"string\"},\"filtered\":{\"type\":\"number\"},\"id\":{\"type\":\"string\"},\"key\":{\"type\":\"string\"},\"keyLen\":{\"type\":\"string\"},\"possibleKeys\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"ref\":{\"type\":\"string\"},\"rows\":{\"type\":\"integer\"},\"selectType\":{\"type\":\"string\"},\"table\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successfully generated visual explanation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"details\":{\"type\":\"string\"},\"error\":{\"example\":\"Invalid SQL syntax\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid SQL query or request format\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Failed to generate explanation\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/explain", "segments": [{ "lit": "api" }, { "lit": "explain" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "query_analysi", "name__orig": "query_analysi", "Name": "QueryAnalysi", "name_": "query_analysi", "name-": "query-analysi", "NAME": "QUERY_ANALYSI", "index$": 0 }, { "active": true, "entity": "query_analysi", "key$": "BasicQueryAnalysiFlow", "kind": "basic", "name": "BasicQueryAnalysiFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "query_analysi_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'QueryAnalysi');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const query_analysi_ref01_ent = client.QueryAnalysi();
        let query_analysi_ref01_data = setup.data.new.query_analysi['query_analysi_ref01'];
        query_analysi_ref01_data = (await query_analysi_ref01_ent.create(query_analysi_ref01_data)).data();
        (0, node_assert_1.default)(null != query_analysi_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/query_analysi/QueryAnalysiTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MysqlVisualExplainSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['query_analysi01', 'query_analysi02', 'query_analysi03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MYSQL_VISUAL_EXPLAIN_TEST_QUERY_ANALYSI_ENTID': idmap,
        'MYSQL_VISUAL_EXPLAIN_TEST_LIVE': 'FALSE',
        'MYSQL_VISUAL_EXPLAIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MYSQL_VISUAL_EXPLAIN_TEST_QUERY_ANALYSI_ENTID'];
    const live = 'TRUE' === env.MYSQL_VISUAL_EXPLAIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MYSQL_VISUAL_EXPLAIN_TEST_QUERY_ANALYSI_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MysqlVisualExplainSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.MYSQL_VISUAL_EXPLAIN_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=QueryAnalysiEntity.test.js.map