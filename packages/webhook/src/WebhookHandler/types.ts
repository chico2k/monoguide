export type IRequestOrign = 'database' | 'clerk';

declare module 'http' {
  interface IncomingHttpHeaders {
    'webhook-id': string;
    'webhook-timestamp': string;
    'webhook-signature': string;
  }
}
