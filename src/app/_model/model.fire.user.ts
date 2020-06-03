import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FireUser {
    uid: string;
    email: string;
    displayName: string;
    alias: string;
    customer: boolean;
    vendor: boolean;

    constructor() {}
}
