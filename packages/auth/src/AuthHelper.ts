class AuthHelper {
  static contextHelper = {
    getUserId: function (): string {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.payload.sub;
    }
  };
}

export { AuthHelper };
