export default class APIException  {
    public readonly statusCode: number;
    public readonly status: string;
    constructor(public message: string, public res: Response) {
        this.statusCode = res.status;
        this.status = res.statusText;
    }
}