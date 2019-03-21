const { strict: assert } = require('assert');
const { google } = require('googleapis');
const { docToArchieML } = require('../');

const expectedBasicOutput = require('./expected/basic');
const expectedExtensionsOutput = require('./expected/extensions');

const basicDocumentId = '1coln1etP5rT1MqmNtRT7lToGtCi1EAsDVzC5aq0LsIc';
const extensionsDocumentId = '1_v0gAswpNnGnDqAx7cU_1bFEK8J7fi8EBvfKvgGZubc';

const getAuth = async () =>
  await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
  });

describe('@newswire/doc-to-archieml', () => {
  it('should return a valid JavaScript object of basic ArchieML data', async () => {
    const auth = await getAuth();

    const actual = await docToArchieML({
      documentId: basicDocumentId,
      auth,
    });

    assert.deepStrictEqual(actual, expectedBasicOutput);
  });

  it('should return a valid JavaScript object of extended ArchieML data', async () => {
    const auth = await getAuth();

    const actual = await docToArchieML({
      documentId: extensionsDocumentId,
      auth,
    });

    assert.deepStrictEqual(actual, expectedExtensionsOutput);
  });
});
