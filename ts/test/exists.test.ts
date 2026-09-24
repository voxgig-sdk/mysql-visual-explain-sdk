
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MysqlVisualExplainSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MysqlVisualExplainSDK.test()
    equal(testsdk instanceof MysqlVisualExplainSDK, true,
      'MysqlVisualExplainSDK.test() must return a client synchronously')
  })

})
