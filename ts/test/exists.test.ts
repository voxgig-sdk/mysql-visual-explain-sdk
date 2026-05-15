
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MysqlVisualExplainSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MysqlVisualExplainSDK.test()
    equal(null !== testsdk, true)
  })

})
