import { Geo } from './geo.model';

export class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;

    constructor() {
        this.suite = '';
        this.street = '';
        this.city = '';
        this.geo = new Geo();
        this.zipcode = '';
    }
}
