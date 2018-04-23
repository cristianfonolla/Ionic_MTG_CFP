export class Token {
  access_token: string;
  token_type: string;
  expires_in: number;

  constructor(access_token: string, token_type: string, expires_in: number) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.expires_in = expires_in;
  }

}
