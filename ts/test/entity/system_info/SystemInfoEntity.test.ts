

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('SystemInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MYSQL_VISUAL_EXPLAIN_TEST_LIVE=TRUE.
  afterEach(liveDelay('MYSQL_VISUAL_EXPLAIN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MysqlVisualExplainSDK.test()
    const ent = testsdk.SystemInfo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MYSQL_VISUAL_EXPLAIN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'system_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"version","req":false,"short":"MySQL version string","type":"`$STRING`","index$":0},{"active":true,"name":"versionComment","req":false,"short":"Additional version information","type":"`$STRING`","index$":1}],"name":"system_info","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /api/version","json":"{\"operationId\":\"getMySQLVersion\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"version\":{\"description\":\"MySQL version string\",\"example\":\"8.0.29\",\"type\":\"string\"},\"versionComment\":{\"description\":\"Additional version information\",\"example\":\"MySQL Community Server - GPL\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully retrieved MySQL version\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Failed to retrieve version information\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/version","segments":[{"lit":"api"},{"lit":"version"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"system_info","name__orig":"system_info","Name":"SystemInfo","name_":"system_info","name-":"system-info","NAME":"SYSTEM_INFO","index$":1}, {"active":true,"entity":"system_info","key$":"BasicSystemInfoFlow","kind":"basic","name":"BasicSystemInfoFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"system_info_ref01","srcdatavar":"system_info_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-system_info_ref01"}}],"index$":0}]}, 'SystemInfo')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let system_info_ref01_data = Object.values(setup.data.existing.system_info)[0] as any

    // LOAD
    const system_info_ref01_ent = client.SystemInfo()
    const system_info_ref01_match_dt0: any = {}
    const system_info_ref01_data_dt0 = (await system_info_ref01_ent.load(system_info_ref01_match_dt0)).data()
    assert(null != system_info_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/system_info/SystemInfoTestData.json')

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
    ['system_info01','system_info02','system_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MYSQL_VISUAL_EXPLAIN_TEST_SYSTEM_INFO_ENTID': idmap,
    'MYSQL_VISUAL_EXPLAIN_TEST_LIVE': 'FALSE',
    'MYSQL_VISUAL_EXPLAIN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MYSQL_VISUAL_EXPLAIN_TEST_SYSTEM_INFO_ENTID']

  const live = 'TRUE' === env.MYSQL_VISUAL_EXPLAIN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MYSQL_VISUAL_EXPLAIN_TEST_SYSTEM_INFO_ENTID']
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
  
