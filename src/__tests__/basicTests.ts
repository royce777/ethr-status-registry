import 'jest-extended'

import { EthrStatusRegistry } from '../index'
import * as HttpProvider from 'ethjs-provider-http'

test('should be able to instantiate Status using infura ID', () => {
  expect(new EthrStatusRegistry({ infuraProjectId: 'none' })).not.toBeNil()
})

test('should be able to instantiate Status using single network definition', () => {
  expect(new EthrStatusRegistry({ rpcUrl: 'example.com' })).not.toBeNil()
})

test('should be able to instantiate Status using multiple network definitions', () => {
  expect(
    new EthrStatusRegistry({
      networks: [
        { name: 'mainnet', rpcUrl: 'example.com' },
        { name: 'rinkeby', rpcUrl: 'rinkeby.example.com' },
        { name: 'local', provider: new HttpProvider('http://localhost:8545') }
      ]
    })
  ).not.toBeNil()
})

test('asMethodName should have proper signature', () => {
  let mapping = new EthrStatusRegistry({ infuraProjectId: 'none' })
    .asStatusMethod
  expect(mapping['EthrStatusRegistry2019']).toBeFunction
})

test(`should reject unknown status method`, async () => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NzI5NjY3ODAsInN0YXR1cyI6eyJ0eXBlIjoidW5rbm93biIsImlkIjoic29tZXRoaW5nIHNvbWV0aGluZyJ9LCJpc3MiOiJkaWQ6ZXRocjoweGYzYmVhYzMwYzQ5OGQ5ZTI2ODY1ZjM0ZmNhYTU3ZGJiOTM1YjBkNzQifQ.WO4kUEYy3xzZR1VlofOm3e39e1XM227uIr-Z7Yb9YQcJJ-2PRcnQmecW5fDjIfF3EInS3rRd4TZmuVQOnhaKQAE'
  const statusChecker = new EthrStatusRegistry({ infuraProjectId: 'none' })
  expect(statusChecker.checkStatus(token))
    .rejects.toEqual({
      error: 'unsupported credential status method'
    })
    .catch()
})
