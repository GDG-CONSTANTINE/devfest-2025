export default class ReqResponse{
    message: string;
    success: boolean;
    data: any | null;

    constructor(message: string, success: boolean, data: any | null) {
        this.message = message;
        this.success = success;
        this.data = data
    }
}