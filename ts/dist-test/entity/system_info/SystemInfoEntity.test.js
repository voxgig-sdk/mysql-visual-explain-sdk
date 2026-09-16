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
(0, node_test_1.describe)('SystemInfoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MYSQL_VISUAL_EXPLAIN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MYSQL_VISUAL_EXPLAIN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MysqlVisualExplainSDK.test();
        const ent = testsdk.SystemInfo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MYSQL_VISUAL_EXPLAIN_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'system_info.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "version", "req": false, "short": "MySQL version string", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "versionComment", "req": false, "short": "Additional version information", "type": "`$STRING`", "index$": 1 }], "name": "system_info", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /api/version", "json": "{\"operationId\":\"getMySQLVersion\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"version\":{\"description\":\"MySQL version string\",\"example\":\"8.0.29\",\"type\":\"string\"},\"versionComment\":{\"description\":\"Additional version information\",\"example\":\"MySQL Community Server - GPL\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved MySQL version\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Failed to retrieve version information\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/version", "segments": [{ "lit": "api" }, { "lit": "version" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "system_info", "name__orig": "system_info", "Name": "SystemInfo", "name_": "system_info", "name-": "system-info", "NAME": "SYSTEM_INFO", "index$": 1 }, { "active": true, "entity": "system_info", "key$": "BasicSystemInfoFlow", "kind": "basic", "name": "BasicSystemInfoFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "system_info_ref01", "srcdatavar": "system_info_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-system_info_ref01" } }], "index$": 0 }] }, 'SystemInfo');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let system_info_ref01_data = Object.values(setup.data.existing.system_info)[0];
        // LOAD
        const system_info_ref01_ent = client.SystemInfo();
        const system_info_ref01_match_dt0 = {};
        const system_info_ref01_data_dt0 = (await system_info_ref01_ent.load(system_info_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != system_info_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/system_info/SystemInfoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MysqlVisualExplainSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['system_info01', 'system_info02', 'system_info03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MYSQL_VISUAL_EXPLAIN_TEST_SYSTEM_INFO_ENTID': idmap,
        'MYSQL_VISUAL_EXPLAIN_TEST_LIVE': 'FALSE',
        'MYSQL_VISUAL_EXPLAIN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MYSQL_VISUAL_EXPLAIN_TEST_SYSTEM_INFO_ENTID'];
    const live = 'TRUE' === env.MYSQL_VISUAL_EXPLAIN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MYSQL_VISUAL_EXPLAIN_TEST_SYSTEM_INFO_ENTID'];
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
//# sourceMappingURL=SystemInfoEntity.test.js.map