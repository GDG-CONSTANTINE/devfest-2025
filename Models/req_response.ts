export default class ReqResponse {
  message: string;
  success: boolean;
  data: unknown | null;

  constructor(message: string, success: boolean, data: unknown | null) {
    this.message = message;
    this.success = success;
    this.data = data;
  }
}
