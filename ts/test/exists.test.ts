
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { JsonplaceholderSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await JsonplaceholderSDK.test()
    equal(null !== testsdk, true)
  })

})
