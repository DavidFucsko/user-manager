import { Address } from './address.model';
import { Company } from './company.model';

export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;

    constructor() {
        this.id = null;
        this.name = '';
        this.username = '';
        this.email = '';
        this.phone = '';
        this.website = '';
        this.company = new Company();
        this.address = new Address();
    }
}
