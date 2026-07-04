
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


describe('CommentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
  afterEach(liveDelay('JSONPLACEHOLDER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JsonplaceholderSDK.test()
    const ent = testsdk.Comment()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'comment.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_COMMENT_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const comment_ref01_ent = client.Comment()
    let comment_ref01_data = setup.data.new.comment['comment_ref01']
    comment_ref01_data['post_id'] = setup.idmap['post01']

    comment_ref01_data = await comment_ref01_ent.create(comment_ref01_data)
    assert(null != comment_ref01_data.id)


    // LIST
    const comment_ref01_match: any = {}
    comment_ref01_match['post_id'] = setup.idmap['post01']

    const comment_ref01_list = await comment_ref01_ent.list(comment_ref01_match)

    assert(!isempty(select(comment_ref01_list, { id: comment_ref01_data.id })))


    // UPDATE
    const comment_ref01_data_up0: any = {}
    comment_ref01_data_up0.id = comment_ref01_data.id

    const comment_ref01_markdef_up0 = { name: 'body', value: 'Mark01-comment_ref01_' + setup.now }
    comment_ref01_data_up0 [comment_ref01_markdef_up0.name] = comment_ref01_markdef_up0.value

    const comment_ref01_resdata_up0 = await comment_ref01_ent.update(comment_ref01_data_up0)
    assert(comment_ref01_resdata_up0.id === comment_ref01_data_up0.id)

    assert(comment_ref01_resdata_up0[comment_ref01_markdef_up0.name] === comment_ref01_markdef_up0.value)


    // LOAD
    const comment_ref01_match_dt0: any = {}
    comment_ref01_match_dt0.id = comment_ref01_data.id
    const comment_ref01_data_dt0 = await comment_ref01_ent.load(comment_ref01_match_dt0)
    assert(comment_ref01_data_dt0.id === comment_ref01_data.id)


    // REMOVE
    const comment_ref01_match_rm0: any = { id: comment_ref01_data.id }
    await comment_ref01_ent.remove(comment_ref01_match_rm0)
  

    // LIST
    const comment_ref01_match_rt0: any = {}
    comment_ref01_match_rt0['post_id'] = setup.idmap['post01']

    const comment_ref01_list_rt0 = await comment_ref01_ent.list(comment_ref01_match_rt0)

    assert(isempty(select(comment_ref01_list_rt0, { id: comment_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/comment/CommentTestData.json')

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
    ['comment01','comment02','comment03','post01','post02','post03'],
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
  const idmapEnvVal = process.env['JSONPLACEHOLDER_TEST_COMMENT_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'JSONPLACEHOLDER_TEST_COMMENT_ENTID': idmap,
    'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
    'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JSONPLACEHOLDER_TEST_COMMENT_ENTID']

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
  
