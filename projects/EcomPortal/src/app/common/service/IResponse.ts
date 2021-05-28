export interface IResponse {    // this is the interface for incoming response from backend
  status: string;
  message: string;
  data: any;
  role?: string;
  count?: number;     // '?' means optional
}
