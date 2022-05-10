export const awsConfig = {
  Auth: {
    region: 'us-east-1',
    // endpoint: 'http://localhost:4566',
    userPoolId: 'us-east-1_VjmmunHUE',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    userPoolWebClientId: '4hvb480dfls99hf2l2v1a72rfq',
    oauth: {
      domain: 'sportguide-staging.auth.us-east-1.amazoncognito.com',
      scope: [
        'phone',
        'email',
        'profile',
        'openid',
        'aws.cognito.signin.user.admin'
      ],

      redirectSignIn: 'http://localhost:3000/redirect',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  },
  ssr: true
};
