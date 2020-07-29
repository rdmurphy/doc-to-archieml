import { JWT } from 'google-auth-library';

export interface DocToArchieMLOptions {
  client?: JWT;
  documentId: string;
}

declare function docToArchieML({
  client,
  documentId,
}: DocToArchieMLOptions): Promise<unknown>;

export { docToArchieML };
