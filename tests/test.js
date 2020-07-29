const { strict: assert } = require('assert');
const { GoogleAuth } = require('google-auth-library');
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
  let client;

  before(async () => {
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/documents.readonly'],
    });

    client = await auth.getClient();
  });

  it('should return a valid JavaScript object of basic ArchieML data', async () => {
    const actual = await docToArchieML({
      documentId: basicDocumentId,
      client,
    });

    assert.deepStrictEqual(actual, expectedBasicOutput);
  });

  it('should return a valid JavaScript object of extended ArchieML data', async () => {
    const actual = await docToArchieML({
      documentId: extensionsDocumentId,
      client,
    });

    assert.deepStrictEqual(actual, expectedExtensionsOutput);
  });

  it('should be able to set up a minimal client if one is not passed', async () => {
    const actual = await docToArchieML({
      documentId: basicDocumentId,
    });

    assert.deepStrictEqual(actual, expectedBasicOutput);
  });
});
