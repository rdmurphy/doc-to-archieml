// packages
const { load } = require('archieml');
const { google: googleApisInstance } = require('googleapis');

// local
const { readElements } = require('./utils');

async function docToArchieML({
  auth,
  client,
  documentId,
  google = googleApisInstance,
}) {
  // create docs client if not provided
  if (!client) {
    client = google.docs({
      version: 'v1',
      auth,
    });
  }

  // pull the data out of the doc
  const { data } = await client.documents.get({
    documentId,
  });

  // convert the doc's content to text ArchieML will understand
  const text = readElements(data);

  // pass text to ArchieML and return results
  return load(text);
}

module.exports = { docToArchieML };
