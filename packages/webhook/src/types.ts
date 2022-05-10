declare module 'http' {
  interface IncomingHttpHeaders {
    'webhook-id': string;
    'webhook-timestamp': string;
    'webhook-signature': string;
  }
}

export {};
