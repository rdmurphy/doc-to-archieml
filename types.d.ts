import { GoogleApis, docs_v1 } from 'googleapis';

export interface BaseDocToArchieMLOptions {
  documentId: docs_v1.Params$Resource$Documents$Get['documentId'];
}

export interface AuthDocToArchieMLOptions extends BaseDocToArchieMLOptions {
  auth: docs_v1.Params$Resource$Documents$Get['auth'];
}

export interface ClientDocToArchieMLOptions extends BaseDocToArchieMLOptions {
  client: docs_v1.Docs;
}

export interface GoogleDocToArchieMLOptions extends BaseDocToArchieMLOptions {
  google: GoogleApis;
}

export type DocToArchieMLOptions =
  | AuthDocToArchieMLOptions
  | ClientDocToArchieMLOptions
  | GoogleDocToArchieMLOptions;

declare function docToArchieML({
  auth,
  client,
  documentId,
  google,
}: DocToArchieMLOptions): Promise<unknown>;

export { docToArchieML };
