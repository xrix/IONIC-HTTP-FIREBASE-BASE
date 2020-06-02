export interface IRestParam {
    model: string;
    id?: number;
    limit?: number;
    fields?: Array<string> | 'default';
    domain?: any;
    offset?: number | 'none';
    order?: string;
    action?: string;
}
