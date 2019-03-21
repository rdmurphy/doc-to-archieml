<h1 align="center">
  @newswire/doc-to-archieml
</h1>
<p align="center">
  <a href="https://circleci.com/gh/rdmurphy/doc-to-archieml"><img src="https://badgen.net/circleci/github/rdmurphy/doc-to-archieml/"></a>
  <a href="https://www.npmjs.org/package/@newswire/doc-to-archieml"><img src="https://badgen.net/npm/v/@newswire/doc-to-archieml" alt="npm"></a>
  <a href="https://david-dm.org/rdmurphy/doc-to-archieml"><img src="https://badgen.net/david/dep/rdmurphy/doc-to-archieml" alt="dependencies"></a>
  <a href="https://packagephobia.now.sh/result?p=@newswire/doc-to-archieml"><img src="https://badgen.net/packagephobia/install/@newswire/doc-to-archieml" alt="install size"></a>
</p>

`@newswire/doc-to-archieml` is a simple wrapper around the [Google Docs API](https://developers.google.com/docs/api/) and [ArchieML](http://archieml.org) for easily converting the contents of a Google Doc into a ArchieML-produced data structure.

## Key features

- ⚙️ Produces identical output to **[ArchieML's example Google Drive export method](https://github.com/newsdev/archieml-js/tree/master#using-with-google-documents)** without the use of an HTML parser
- 👩‍🔧 Does not prescribe any rules for authenticating with Google — **use the authenticated Google API instance, Google Docs client or [authentication method](https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization) you are already using**

## Installation

`@newswire/doc-to-archieml` is available via `npm`.

```sh
npm install --save-dev @newswire/doc-to-archieml
# or
yarn add --dev @newswire/doc-to-archieml
```

## Usage

`@newswire/doc-to-archieml` exports a single function - `docToArchieML`.

```js
const { docToArchieML } = require('@newswire/doc-to-archieml');
```

`docToArchieML` only has one required parameter — `documentId`. But authentication with the Google API can be handled in one of three ways:

### Passing authentication

`docToArchieML` doesn't limit authentication to only OAuth2 (although it certainly supports it!) and will accept any authenticated client that the Google Docs API supports.

After establishing authentication [using one of the methods](https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization) supported by `google-api-nodejs-client`, you can pass this auth directly to `docToArchieML` and it'll handle the rest.

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

### Passing an authenticated Google Docs API client

Maybe you're already working with the Google Docs API and have already set up an authenticated instance of the Google Docs API client. `docToArchieML` will accept that!

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

### Passing an authenticated Google APIs instance

Maybe you're using multiple Google API services and are [setting authentication across all Google APIs globally](https://github.com/googleapis/google-api-nodejs-client#setting-global-or-service-level-auth). `docToArchieML` can accept the authenticated `googleApisInstance` and use that to create the Google Docs API client internally, no additional passing of `auth` necessary.

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

## API

## License

MIT
