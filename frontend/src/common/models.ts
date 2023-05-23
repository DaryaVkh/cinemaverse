export interface DecodedJwtToken {
  id: string;
  name: string;
}

export enum ErrorCode {
  REQUIRED = 'required',
  EMAIL = 'email',
}
