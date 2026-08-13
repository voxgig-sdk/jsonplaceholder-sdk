
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { JsonplaceholderSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('PhotoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
  afterEach(liveDelay('JSONPLACEHOLDER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JsonplaceholderSDK.test()
    const ent = testsdk.Photo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'photo.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_PHOTO_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const photo_ref01_ent = client.Photo()
    let photo_ref01_data = setup.data.new.photo['photo_ref01']
    photo_ref01_data['album_id'] = setup.idmap['album01']

    photo_ref01_data = (await photo_ref01_ent.create(photo_ref01_data)).data()
    assert(null != photo_ref01_data.id)


    // LIST
    const photo_ref01_match: any = {}

    const photo_ref01_list = (await photo_ref01_ent.list(photo_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(photo_ref01_list, { id: photo_ref01_data.id })))


    // UPDATE
    const photo_ref01_data_up0: any = {}
    photo_ref01_data_up0.id = photo_ref01_data.id

    const photo_ref01_markdef_up0 = { name: 'thumbnailUrl', value: 'Mark01-photo_ref01_' + setup.now }
    ;(photo_ref01_data_up0 as any)[photo_ref01_markdef_up0.name] = photo_ref01_markdef_up0.value

    const photo_ref01_resdata_up0 = (await photo_ref01_ent.update(photo_ref01_data_up0)).data()
    assert(photo_ref01_resdata_up0.id === photo_ref01_data_up0.id)

    assert((photo_ref01_resdata_up0 as any)[photo_ref01_markdef_up0.name] === photo_ref01_markdef_up0.value)


    // LOAD
    const photo_ref01_match_dt0: any = {}
    photo_ref01_match_dt0.id = photo_ref01_data.id
    const photo_ref01_data_dt0 = (await photo_ref01_ent.load(photo_ref01_match_dt0)).data()
    assert(photo_ref01_data_dt0.id === photo_ref01_data.id)


    // REMOVE
    const photo_ref01_match_rm0: any = { id: photo_ref01_data.id }
    await photo_ref01_ent.remove(photo_ref01_match_rm0)
  

    // LIST
    const photo_ref01_match_rt0: any = {}

    const photo_ref01_list_rt0 = (await photo_ref01_ent.list(photo_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(photo_ref01_list_rt0, { id: photo_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/photo/PhotoTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = JsonplaceholderSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['photo01','photo02','photo03','album01','album02','album03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['JSONPLACEHOLDER_TEST_PHOTO_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'JSONPLACEHOLDER_TEST_PHOTO_ENTID': idmap,
    'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
    'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JSONPLACEHOLDER_TEST_PHOTO_ENTID']

  const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE

  if (live) {
    client = new JsonplaceholderSDK(merge([
      {
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.JSONPLACEHOLDER_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
