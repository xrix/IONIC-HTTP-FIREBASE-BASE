export interface IUserRestData {
    uid: number;
    username: string;
    user_context: {
      uid: number;
      lang: string;
      tz: string;
      [key: string]: any;
    };
    company_id: number;
    access_token: string;
    expires_in: number;
}
