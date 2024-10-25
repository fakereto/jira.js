import * as sinon from 'sinon';
import { test } from 'vitest';
import { Myself, VersionServerClient } from '@jirajs/server';

const client = new VersionServerClient({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const myself = new Myself(client);

test('getCurrentUser should calls without parameters', ({ expect }) => {
  myself.getCurrentUser();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});
