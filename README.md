<h1 align="center">
  @newswire/doc-to-archieml
</h1>
<p align="center">
  <a href="https://circleci.com/gh/rdmurphy/doc-to-archieml"><img src="https://badgen.net/circleci/github/rdmurphy/doc-to-archieml/"></a>
  <a href="https://www.npmjs.org/package/@newswire/doc-to-archieml"><img src="https://badgen.net/npm/v/@newswire/doc-to-archieml" alt="npm"></a>
  <a href="https://david-dm.org/rdmurphy/doc-to-archieml"><img src="https://badgen.net/david/dep/rdmurphy/doc-to-archieml" alt="dependencies"></a>
  <a href="https://packagephobia.now.sh/result?p=@newswire/doc-to-archieml"><img src="https://badgen.net/packagephobia/install/@newswire/doc-to-archieml" alt="install size"></a>
</p>

`@newswire/doc-to-archieml` is a simple wrapper around the [Google Docs API](https://developers.google.com/docs/api/) and [ArchieML](http://archieml.org) for converting the contents of a Google Doc into a ArchieML-produced data structure.

## Key features

- ⚙️ Produces identical output to **[ArchieML's example Google Drive export method](https://github.com/newsdev/archieml-js/tree/master#using-with-google-documents)** (including support for converting links to `<a>` tags) without the use of an HTML parser
- 👩‍🔧 Does not expect any particular method of authenticating with Google — **use the authenticated Google API instance, Google Docs client or [authentication method](https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization) you are already using**

## Installation

`@newswire/doc-to-archieml` requires a version of Node.js **8 or higher**. It is available via `npm`.

```sh
npm install --save-dev @newswire/doc-to-archieml
# or
yarn add --dev @newswire/doc-to-archieml
```

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Usage](#usage)
- [Authentication](#authentication)
  - [1) Passing authentication](#1-passing-authentication)
  - [2) Passing an authenticated Google Docs API client](#2-passing-an-authenticated-google-docs-api-client)
  - [3) Passing an authenticated Google APIs instance](#3-passing-an-authenticated-google-apis-instance)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

`@newswire/doc-to-archieml` exports a single function - `docToArchieML`.

```js
const { docToArchieML } = require('@newswire/doc-to-archieml');
const { google } = require('googleapis');

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables to establish authentication
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
  });

  // pass in the valid authentication and ID of the document you want to process
  const results = await docToArchieML({ documentId: '...', auth });

  console.log(results); // `results` is your ArchieML-produced JavaScript object
}

main().catch(console.error);
```

## Authentication

`docToArchieML` has one required parameter — `documentId`. But the authentication you provide with the Google API may be handled in one of the three ways detailed below.

_Acquiring_ this authentication is beyond the scope of this project's documentation, but two good starting points are [Google's official Node.js quickstart guide for the Google Docs API](https://developers.google.com/docs/api/quickstart/nodejs) and the [client library's authentication documentation](https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization).

### 1) Passing authentication

`docToArchieML` doesn't limit authentication to only OAuth2 (although it certainly supports it!) and will accept any authenticated client that the Google Docs API supports.

After establishing authentication [using one of the methods](https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization) supported by `googleapis`, you can pass this auth directly to `docToArchieML` and it'll handle the rest.

```js
const { docToArchieML } = require('@newswire/doc-to-archieml');
const { google } = require('googleapis');

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables to establish authentication
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
  });

  // pass in the valid authentication, which is used to create a Google Docs API client internally
  const results = await docToArchieML({ documentId: '...', auth });
}

main().catch(console.error);
```

> (This example uses the [service-to-service authentication](https://github.com/googleapis/google-api-nodejs-client#service-to-service-authentication) method.)

### 2) Passing an authenticated Google Docs API client

Maybe you've been working with the Google Docs API and have already set up an authenticated instance of the Google Docs API client that has access to the docs you'd like to work with. `docToArchieML` will accept that and use it!

```js
const { docToArchieML } = require('@newswire/doc-to-archieml');
const { google } = require('googleapis');

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables to establish authentication
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
  });

  // create your own Google Docs API client
  const client = google.docs({
    version: 'v1',
    auth,
  });

  // pass in the authenticated Google Docs API client
  const results = await docToArchieML({ documentId: '...', client });
}

main().catch(console.error);
```

> (This example uses the [service-to-service authentication](https://github.com/googleapis/google-api-nodejs-client#service-to-service-authentication) method.)

### 3) Passing an authenticated Google APIs instance

Maybe you've been using multiple Google API services and have [set authentication across all Google APIs globally](https://github.com/googleapis/google-api-nodejs-client#setting-global-or-service-level-auth). `docToArchieML` can accept the authenticated `googleApisInstance` and use that to create the Google Docs API client - no passing of `auth` necessary.

```js
const { docToArchieML } = require('@newswire/doc-to-archieml');
const { google } = require('googleapis');

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables to establish authentication
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
  });

  // set auth as a global default
  google.options({ auth });

  // pass in the GoogleApisInstance, which will be used to connect to the Google Docs API
  const results = await docToArchieML({ documentId: '...', google });
}

main().catch(console.error);
```

> (This example uses the [service-to-service authentication](https://github.com/googleapis/google-api-nodejs-client#service-to-service-authentication) method.)

## Contributing

First clone the repo to your local device and install the dependencies.

```sh
yarn
```

After making any changes, you'll need to run the tests. But this is a little tricky because we perform an integration test against live Google Doc files. To make the tests work for you locally, you'll need to do a few extra steps.

First make a copy of the two test doc files:

[Click here to make a copy of the basic test doc file](https://docs.google.com/document/d/1coln1etP5rT1MqmNtRT7lToGtCi1EAsDVzC5aq0LsIc/copy)
[Click here to make a copy of the extensions test doc file](https://docs.google.com/document/d/1_v0gAswpNnGnDqAx7cU_1bFEK8J7fi8EBvfKvgGZubc/copy)

Once you have both files, you'll need to get their IDs and set the correct environment variables so the test runner finds them. To get the IDs **look at the URLs of the files** in your browser - it is the long string of random characters and numbers near the end.

https://<span></span>docs.google.com/document/d/**1coln1etP5rT1MqmNtRT7lToGtCi1EAsDVzC5aq0LsIc**/edit

Set the following environmental variables in your shell:

```sh
export BASIC_DOCUMENT_ID=<basic_doc_id>
export EXTENSIONS_DOCUMENT_ID=<extensions_doc_id>
```

Next you'll need to create a service account (or use an existing one) and give it access to your two copies of the docs. Typically this is done by sharing those files with the email of the service account in the document sharing interface.

Finally, we need to tell the test runner how to use the service account authentication to communicate with the API. The best method for doing this is the [service-to-service authentication method](https://github.com/googleapis/google-api-nodejs-client#service-to-service-authentication). Typically this means setting the `GOOGLE_APPLICATION_CREDENTIALS` environmental variable and pointing it at the location of your service account authentication JSON file.

```sh
export GOOGLE_APPLICATION_CREDENTIALS=<path_to_json_file>
```

And... now you're ready to go! You should be able to run the tests.

```sh
yarn test
```

If anyone has any suggestions on how to make this a smoother process, please let me know!

## License

MIT
