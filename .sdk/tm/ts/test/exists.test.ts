
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { JsonplaceholderSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = JsonplaceholderSDK.test()
    equal(testsdk instanceof JsonplaceholderSDK, true,
      'JsonplaceholderSDK.test() must return a client synchronously')
  })

})
