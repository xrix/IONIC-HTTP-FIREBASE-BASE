export interface IPartnerFields {
    id: number;
    barcode: string;
    name?: string;
    display_name?: string;
    category_ids?: any[];
    address_id?: any;
    work_location?: string;
    work_email?: string;
    mobile_phone?: string;
    work_phone?: string;
    department_id?: any;
    job_id?: any;
    resource_calendar_id?: any;
    identification_id?: string;
    gender: 'male' | 'female' | 'other';
    remaining_leaves?: number;
}
