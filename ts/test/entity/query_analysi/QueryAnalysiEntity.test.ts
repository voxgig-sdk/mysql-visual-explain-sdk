

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MysqlVisualExplainSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('QueryAnalysiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MYSQL_VISUAL_EXPLAIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('MYSQL_VISUAL_EXPLAIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MysqlVisualExplainSDK.test()
    const ent = testsdk.QueryAnalysi()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MYSQL_VISUAL_EXPLAIN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'query_analysi.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"explainOutput":{"a":true,"h":"Explain Output","n":"explainOutput","r":false,"sh":"Raw EXPLAIN output from MySQL","t":"`$OBJECT`","key$":"explainOutput","index$":0},"mysqlVersion":{"a":true,"h":"Mysql Version","n":"mysqlVersion","r":false,"sh":"MySQL version for compatibility (e.g., 8.0, 5.7)","t":"`$STRING`","key$":"mysqlVersion","index$":1},"query":{"a":true,"h":"Query","n":"query","r":true,"sh":"The SQL query to analyze and visualize","t":"`$STRING`","key$":"query","index$":2},"recommendations":{"a":true,"h":"Recommendations","n":"recommendations","r":false,"sh":"Performance optimization recommendations","t":"`$ARRAY`","key$":"recommendations","index$":3},"visualization":{"a":true,"h":"Visualization","n":"visualization","r":false,"sh":"The visual representation data of the query execution plan","t":"`$OBJECT`","key$":"visualization","index$":4}},"name":"query_analysi","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/explain","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/explain","q":{},"r":{},"s":[{"lit":"api"},{"lit":"explain"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"query_analysi","name__orig":"query_analysi","Name":"QueryAnalysi","name_":"query_analysi","name-":"query-analysi","NAME":"QUERY_ANALYSI","index$":0}, {"active":true,"entity":"query_analysi","key$":"BasicQueryAnalysiFlow","kind":"basic","name":"BasicQueryAnalysiFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"query_analysi_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'QueryAnalysi', {"POST /api/explain":{"protocol":"http","operationId":"generateVisualExplain","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["query"],"properties":{"query":{"type":"string","description":"The SQL query to analyze and visualize","example":"SELECT * FROM users WHERE id = 1","key$":"query"},"mysqlVersion":{"type":"string","description":"MySQL version for compatibility (e.g., 8.0, 5.7)","example":"8.0","key$":"mysqlVersion"}},"index$":1},"examples":{"simpleQuery":{"summary":"Simple SELECT query","value":{"query":"SELECT * FROM users WHERE id = 1","mysqlVersion":"8.0"}},"joinQuery":{"summary":"Query with JOIN","value":{"query":"SELECT u.*, o.* FROM users u JOIN orders o ON u.id = o.user_id WHERE u.status = 'active'","mysqlVersion":"8.0"}},"subqueryExample":{"summary":"Query with subquery","value":{"query":"SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 100)","mysqlVersion":"8.0"}}}}}},"responses":{"200":{"description":"Successfully generated visual explanation","content":{"application/json":{"schema":{"type":"object","properties":{"visualization":{"type":"object","description":"The visual representation data of the query execution plan","properties":{"nodes":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"type":{"type":"string"},"table":{"type":"string"},"selectType":{"type":"string"},"accessType":{"type":"string"},"possibleKeys":{"type":"array","items":{"type":"string"}},"key":{"type":"string"},"keyLen":{"type":"string"},"ref":{"type":"string"},"rows":{"type":"integer"},"filtered":{"type":"number"},"extra":{"type":"string"}}}},"edges":{"type":"array","items":{"type":"object","properties":{"from":{"type":"string"},"to":{"type":"string"}}}}},"key$":"visualization"},"explainOutput":{"type":"object","description":"Raw EXPLAIN output from MySQL","key$":"explainOutput"},"recommendations":{"type":"array","description":"Performance optimization recommendations","items":{"type":"object","properties":{"severity":{"type":"string","enum":["critical","warning","info"]},"message":{"type":"string"},"suggestion":{"type":"string"}}},"key$":"recommendations"}},"index$":0}}}},"400":{"description":"Invalid SQL query or request format","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Invalid SQL syntax"},"details":{"type":"string"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Failed to generate explanation"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const query_analysi_ref01_ent = client.QueryAnalysi()
    let query_analysi_ref01_data = setup.data.new.query_analysi['query_analysi_ref01']

    query_analysi_ref01_data = (await query_analysi_ref01_ent.create(query_analysi_ref01_data)).data()
    assert(null != query_analysi_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/query_analysi/QueryAnalysiTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MysqlVisualExplainSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['query_analysi01','query_analysi02','query_analysi03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MYSQL_VISUAL_EXPLAIN_TEST_QUERY_ANALYSI_ENTID': idmap,
    'MYSQL_VISUAL_EXPLAIN_TEST_LIVE': 'FALSE',
    'MYSQL_VISUAL_EXPLAIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MYSQL_VISUAL_EXPLAIN_TEST_QUERY_ANALYSI_ENTID']

  const live = 'TRUE' === env.MYSQL_VISUAL_EXPLAIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MYSQL_VISUAL_EXPLAIN_TEST_QUERY_ANALYSI_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MysqlVisualExplainSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
