
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


describe('TodoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
  afterEach(liveDelay('JSONPLACEHOLDER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JsonplaceholderSDK.test()
    const ent = testsdk.Todo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'todo.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set JSONPLACEHOLDER_TEST_TODO_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const todo_ref01_ent = client.Todo()
    let todo_ref01_data = setup.data.new.todo['todo_ref01']
    todo_ref01_data['user_id'] = setup.idmap['user01']

    todo_ref01_data = await todo_ref01_ent.create(todo_ref01_data)
    assert(null != todo_ref01_data.id)


    // LIST
    const todo_ref01_match: any = {}
    todo_ref01_match['user_id'] = setup.idmap['user01']

    const todo_ref01_list = await todo_ref01_ent.list(todo_ref01_match)

    assert(!isempty(select(todo_ref01_list, { id: todo_ref01_data.id })))


    // UPDATE
    const todo_ref01_data_up0: any = {}
    todo_ref01_data_up0.id = todo_ref01_data.id

    const todo_ref01_markdef_up0 = { name: 'title', value: 'Mark01-todo_ref01_' + setup.now }
    todo_ref01_data_up0 [todo_ref01_markdef_up0.name] = todo_ref01_markdef_up0.value

    const todo_ref01_resdata_up0 = await todo_ref01_ent.update(todo_ref01_data_up0)
    assert(todo_ref01_resdata_up0.id === todo_ref01_data_up0.id)

    assert(todo_ref01_resdata_up0[todo_ref01_markdef_up0.name] === todo_ref01_markdef_up0.value)


    // LOAD
    const todo_ref01_match_dt0: any = {}
    todo_ref01_match_dt0.id = todo_ref01_data.id
    const todo_ref01_data_dt0 = await todo_ref01_ent.load(todo_ref01_match_dt0)
    assert(todo_ref01_data_dt0.id === todo_ref01_data.id)


    // REMOVE
    const todo_ref01_match_rm0: any = { id: todo_ref01_data.id }
    await todo_ref01_ent.remove(todo_ref01_match_rm0)
  

    // LIST
    const todo_ref01_match_rt0: any = {}
    todo_ref01_match_rt0['user_id'] = setup.idmap['user01']

    const todo_ref01_list_rt0 = await todo_ref01_ent.list(todo_ref01_match_rt0)

    assert(isempty(select(todo_ref01_list_rt0, { id: todo_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/todo/TodoTestData.json')

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
    ['todo01','todo02','todo03','user01','user02','user03'],
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
  const idmapEnvVal = process.env['JSONPLACEHOLDER_TEST_TODO_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'JSONPLACEHOLDER_TEST_TODO_ENTID': idmap,
    'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
    'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JSONPLACEHOLDER_TEST_TODO_ENTID']

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
  
