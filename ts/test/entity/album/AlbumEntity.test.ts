

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { JsonplaceholderSDK, BaseFeature, stdutil } from '../../..'

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


describe('AlbumEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when JSONPLACEHOLDER_TEST_LIVE=TRUE.
  afterEach(liveDelay('JSONPLACEHOLDER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = JsonplaceholderSDK.test()
    const ent = testsdk.Album()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.JSONPLACEHOLDER_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'album.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Album ID","t":"`$INTEGER`","key$":"id","index$":0},"title":{"a":true,"h":"Title","n":"title","op":{"create":{"req":true,"type":"`$STRING`"},"patch":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Album title","t":"`$STRING`","key$":"title","index$":1},"userId":{"a":true,"h":"User Id","n":"userId","op":{"create":{"req":true,"type":"`$INTEGER`"},"patch":{"req":true,"type":"`$INTEGER`"},"update":{"req":true,"type":"`$INTEGER`"}},"r":false,"sh":"User ID who created the album","t":"`$INTEGER`","key$":"userId","index$":2}},"id":{"field":"id","name":"id"},"name":"album","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /albums","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/albums","q":{},"r":{},"s":[{"lit":"albums"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /albums","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"user_id","or":"user_id","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/albums","q":{"exist":["user_id"]},"r":{},"s":[{"lit":"albums"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /users/{id}/albums","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"user_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/users/{id}/albums","q":{"exist":["user_id"]},"r":{"param":{"id":"user_id"}},"s":[{"lit":"users"},{"var":"user_id"},{"lit":"albums"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /albums/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/albums/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"albums"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"co":{"id":"PATCH /albums/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PATCH","o":"/albums/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"albums"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /albums/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/albums/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"albums"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /albums/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/albums/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"albums"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.user"]]},"key$":"album","name__orig":"album","Name":"Album","name_":"album","name-":"album","NAME":"ALBUM","index$":0}, {"active":true,"entity":"album","key$":"BasicAlbumFlow","kind":"basic","name":"BasicAlbumFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"album_ref01"},"m":{"user_id":"user01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"user_id":"user01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"album_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"album_ref01","srcdatavar":"album_ref01_data","suffix":"_up0","textfield":"title"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-album_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"album_ref01","srcdatavar":"album_ref01_data","suffix":"_dt0"},"m":{"id":"album01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-album_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"album_ref01","suffix":"_rm0"},"m":{"id":"album01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"user_id":"user01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"album_ref01"}}],"index$":5}]}, 'Album', {"POST /albums":{"protocol":"http","operationId":"createAlbum","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["userId","title"],"properties":{"userId":{"type":"integer","description":"User ID who created the album","key$":"userId"},"title":{"type":"string","description":"Album title","key$":"title"}},"x-ref":"#/components/schemas/AlbumInput","index$":1}}}},"responses":{"201":{"description":"Album created successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Album ID","key$":"id"},"userId":{"type":"integer","description":"User ID who created the album","key$":"userId"},"title":{"type":"string","description":"Album title","key$":"title"}},"x-ref":"#/components/schemas/Album"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /albums":{"protocol":"http","operationId":"getAlbums","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Album ID","key$":"id"},"userId":{"type":"integer","description":"User ID who created the album","key$":"userId"},"title":{"type":"string","description":"Album title","key$":"title"}},"x-ref":"#/components/schemas/Album","index$":0}}}}}},"parameters":[{"name":"userId","in":"query","description":"Filter albums by user ID","required":false,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"GET /users/{id}/albums":{"protocol":"http","operationId":"getUserAlbums","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Album ID","key$":"id"},"userId":{"type":"integer","description":"User ID who created the album","key$":"userId"},"title":{"type":"string","description":"Album title","key$":"title"}},"x-ref":"#/components/schemas/Album","index$":0}}}}}},"parameters":[{"name":"id","in":"path","description":"User ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"GET /albums/{id}":{"protocol":"http","operationId":"getAlbumById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Album ID","key$":"id"},"userId":{"type":"integer","description":"User ID who created the album","key$":"userId"},"title":{"type":"string","description":"Album title","key$":"title"}},"x-ref":"#/components/schemas/Album","index$":0}}}},"404":{"description":"Album not found"}},"parameters":[{"name":"id","in":"path","description":"Album ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"PATCH /albums/{id}":{"protocol":"http","operationId":"patchAlbum","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["userId","title"],"properties":{"userId":{"type":"integer","description":"User ID who created the album","key$":"userId"},"title":{"type":"string","description":"Album title","key$":"title"}},"x-ref":"#/components/schemas/AlbumInput","index$":1}}}},"responses":{"200":{"description":"Album updated successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Album ID","key$":"id"},"userId":{"type":"integer","description":"User ID who created the album","key$":"userId"},"title":{"type":"string","description":"Album title","key$":"title"}},"x-ref":"#/components/schemas/Album","index$":0}}}}},"parameters":[{"name":"id","in":"path","description":"Album ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"DELETE /albums/{id}":{"protocol":"http","operationId":"deleteAlbum","responses":{"200":{"description":"Album deleted successfully"}},"parameters":[{"name":"id","in":"path","description":"Album ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"},"PUT /albums/{id}":{"protocol":"http","operationId":"updateAlbum","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["userId","title"],"properties":{"userId":{"type":"integer","description":"User ID who created the album","key$":"userId"},"title":{"type":"string","description":"Album title","key$":"title"}},"x-ref":"#/components/schemas/AlbumInput","index$":1}}}},"responses":{"200":{"description":"Album updated successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Album ID","key$":"id"},"userId":{"type":"integer","description":"User ID who created the album","key$":"userId"},"title":{"type":"string","description":"Album title","key$":"title"}},"x-ref":"#/components/schemas/Album","index$":0}}}}},"parameters":[{"name":"id","in":"path","description":"Album ID","required":true,"schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const album_ref01_ent = client.Album()
    let album_ref01_data = setup.data.new.album['album_ref01']
    album_ref01_data['user_id'] = setup.idmap['user01']

    album_ref01_data = (await album_ref01_ent.create(album_ref01_data)).data()
    assert(null != album_ref01_data.id)


    // LIST
    const album_ref01_match: any = {}
    album_ref01_match['user_id'] = setup.idmap['user01']

    const album_ref01_list = (await album_ref01_ent.list(album_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(album_ref01_list, { id: album_ref01_data.id })))


    // UPDATE
    const album_ref01_data_up0: any = {}
    album_ref01_data_up0.id = album_ref01_data.id

    const album_ref01_markdef_up0 = { name: 'title', value: 'Mark01-album_ref01_' + setup.now }
    ;(album_ref01_data_up0 as any)[album_ref01_markdef_up0.name] = album_ref01_markdef_up0.value

    const album_ref01_resdata_up0 = (await album_ref01_ent.update(album_ref01_data_up0)).data()
    assert(album_ref01_resdata_up0.id === album_ref01_data_up0.id)

    assert((album_ref01_resdata_up0 as any)[album_ref01_markdef_up0.name] === album_ref01_markdef_up0.value)


    // LOAD
    const album_ref01_match_dt0: any = {}
    album_ref01_match_dt0.id = album_ref01_data.id
    const album_ref01_data_dt0 = (await album_ref01_ent.load(album_ref01_match_dt0)).data()
    assert(album_ref01_data_dt0.id === album_ref01_data.id)


    // REMOVE
    const album_ref01_match_rm0: any = { id: album_ref01_data.id }
    await album_ref01_ent.remove(album_ref01_match_rm0)
  

    // LIST
    const album_ref01_match_rt0: any = {}
    album_ref01_match_rt0['user_id'] = setup.idmap['user01']

    const album_ref01_list_rt0 = (await album_ref01_ent.list(album_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(album_ref01_list_rt0, { id: album_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/album/AlbumTestData.json')

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
    ['album01','album02','album03','user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'JSONPLACEHOLDER_TEST_ALBUM_ENTID': idmap,
    'JSONPLACEHOLDER_TEST_LIVE': 'FALSE',
    'JSONPLACEHOLDER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['JSONPLACEHOLDER_TEST_ALBUM_ENTID']

  const live = 'TRUE' === env.JSONPLACEHOLDER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['JSONPLACEHOLDER_TEST_ALBUM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new JsonplaceholderSDK(merge([
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
    explain: 'TRUE' === env.JSONPLACEHOLDER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
