import * as sinon from 'sinon';
import { test } from 'vitest';
import { VersionServerClient } from '@jirajs/server';

const config = { host: 'http://localhost' };

test('createIssue should accept follow parameters', ({ expect }) => {
  const client = new VersionServerClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.createIssue({
    fields: {
      summary: 'gg',
      project: {
        key: 'testProject',
      },
      description: 'hello',
      issuetype: {
        id: 10004,
      },
      labels: ['test label'],
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.data).toStrictEqual({
    fields: {
      summary: 'gg',
      project: {
        key: 'testProject',
      },
      description: {
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'hello',
                type: 'text',
              },
            ],
          },
        ],
        type: 'doc',
        version: 1,
      },
      issuetype: {
        id: 10004,
      },
      labels: ['test label'],
    },
    historyMetadata: undefined,
    properties: undefined,
    transition: undefined,
    update: undefined,
  });
});

test('editIssue should accept follow parameters', ({ expect }) => {
  const client = new VersionServerClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.editIssue({
    issueIdOrKey: 'issueId',
    notifyUsers: false,
    fields: {
      description: {
        version: 1,
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'desc',
                type: 'text',
              },
            ],
          },
        ],
      },
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/latest/issue/issueId');
  expect(callArgument.params).toStrictEqual({
    expand: undefined,
    notifyUsers: false,
    overrideEditableFlag: undefined,
    overrideScreenSecurity: undefined,
    returnIssue: undefined,
  });
  expect(callArgument.data).toStrictEqual({
    fields: {
      description: {
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: 'desc',
                type: 'text',
              },
            ],
          },
        ],
        type: 'doc',
        version: 1,
      },
    },
    historyMetadata: undefined,
    properties: undefined,
    transition: undefined,
    update: undefined,
  });
});

test('doTransition should accept follow parameters', ({ expect }) => {
  const client = new VersionServerClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.doTransition({
    issueIdOrKey: 'idOrKey',
    transition: {
      name: 'transition',
      id: '31',
      to: {
        id: '41',
        name: 'new transition',
      },
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/latest/issue/idOrKey/transitions');
  expect(callArgument.data).toStrictEqual({
    fields: undefined,
    historyMetadata: undefined,
    properties: undefined,
    transition: {
      id: '31',
      name: 'transition',
      to: {
        id: '41',
        name: 'new transition',
      },
    },
    update: undefined,
  });
});

test('deleteIssue should accept follow parameters', ({ expect }) => {
  const client = new VersionServerClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issues.deleteIssue({ issueIdOrKey: 'issueKey', deleteSubtasks: true });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/latest/issue/issueKey');
  expect(callArgument.params).toStrictEqual({ deleteSubtasks: true });
});
