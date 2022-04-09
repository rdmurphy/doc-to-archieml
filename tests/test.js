const { strict: assert } = require('assert');
const google = require('@googleapis/docs');
const { docToArchieML } = require('../');

const expectedBasicOutput = require('./expected/basic');
const expectedExtensionsOutput = require('./expected/extensions');

const basicDocumentId =
  process.env.BASIC_DOCUMENT_ID ||
  '1coln1etP5rT1MqmNtRT7lToGtCi1EAsDVzC5aq0LsIc';
const extensionsDocumentId =
  process.env.EXTENSIONS_DOCUMENT_ID ||
  '1_v0gAswpNnGnDqAx7cU_1bFEK8J7fi8EBvfKvgGZubc';

describe('@newswire/doc-to-archieml', () => {
  let auth;

  before(async () => {
    auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/documents.readonly'],
    });
  });

  it('should return a valid JavaScript object of basic ArchieML data', async () => {
    const actual = await docToArchieML({
      documentId: basicDocumentId,
      auth,
    });

    assert.deepStrictEqual(actual, expectedBasicOutput);
  });

  it('should return a valid JavaScript object of extended ArchieML data', async () => {
    const actual = await docToArchieML({
      documentId: extensionsDocumentId,
      auth,
    });

    assert.deepStrictEqual(actual, expectedExtensionsOutput);
  });
});
