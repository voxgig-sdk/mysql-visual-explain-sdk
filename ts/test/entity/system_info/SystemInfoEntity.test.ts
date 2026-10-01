

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"version":{"a":true,"h":"Version","n":"version","r":false,"sh":"MySQL version string","t":"`$STRING`","key$":"version","index$":0},"versionComment":{"a":true,"h":"Version Comment","n":"versionComment","r":false,"sh":"Additional version information","t":"`$STRING`","key$":"versionComment","index$":1}},"name":"system_info","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/version","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/version","q":{},"r":{},"s":[{"lit":"api"},{"lit":"version"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"system_info","name__orig":"system_info","Name":"SystemInfo","name_":"system_info","name-":"system-info","NAME":"SYSTEM_INFO","index$":1}, {"active":true,"entity":"system_info","key$":"BasicSystemInfoFlow","kind":"basic","name":"BasicSystemInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"system_info_ref01","srcdatavar":"system_info_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-system_info_ref01"}}],"index$":0}]}, 'SystemInfo', {"GET /api/version":{"protocol":"http","parameters":[]}})
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
  
