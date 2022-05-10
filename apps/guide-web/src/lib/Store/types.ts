export interface State {
  modalState: ModalState;
  userState: UserState;
  loadingState: LoadingState;
}

export interface UserState {
  username: string;
  pool: Pool;
  Session?: null;
  client: Client;
  signInUserSession: SignInUserSession;
  authenticationFlowType: string;
  storage: Storage;
  keyPrefix: string;
  userDataKey: string;
  attributes: Attributes;
  preferredMFA: string;
}
export interface Pool {
  userPoolId: string;
  clientId: string;
  client: Client;
  advancedSecurityDataCollectionFlag: boolean;
  storage: Storage;
}
export interface Client {
  endpoint: string;
  fetchOptions: FetchOptions;
}
export interface FetchOptions {}
export interface Storage {
  cookies: Cookies;
  store: any;
}
export interface Cookies {
  changeListeners?: null[] | null;
  HAS_DOCUMENT_COOKIE: boolean;
  cookies: any;
}

export interface SignInUserSession {
  idToken: IdToken;
  refreshToken: RefreshToken;
  accessToken: AccessToken;
  clockDrift: number;
}
export interface IdToken {
  jwtToken: string;
  payload: Payload;
}
export interface Payload {
  sub: string;
  email_verified: boolean;
  iss: string;
  'cognito:username': string;
  preferred_username: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  name: string;
  exp: number;
  iat: number;
  email: string;
}
export interface RefreshToken {
  token: string;
}
export interface AccessToken {
  jwtToken: string;
  payload: Payload1;
}
export interface Payload1 {
  sub: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
  client_id: string;
  username: string;
}
export interface Attributes {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  email: string;
}

export enum ModalSize {
  'small',
  'medium',
  'full',
}

export interface ModalState {
  open: boolean;
  modalType?: string;
  modalProps?: object;
  originURL?: string;
  modalTargetURL?: string;
  size: ModalSize;
  title: string;
}

interface LoadingState {
  isLoading: boolean;
}
