import { Url } from 'url';

export class HalElement {
    _links: { 
        self: Url,
        curies: [{
            name: string
        }]
     };
}
