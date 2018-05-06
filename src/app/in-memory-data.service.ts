import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = {
      _embedded:{
        heroes: [
          { id: 11, name: 'Mr. Nice', _links: { self: { href: "api/heroes/11" } } },
          { id: 12, name: 'Narco', _links: { self: { href: "api/heroes/12" } }  },
          { id: 13, name: 'Bombasto', _links: { self: { href: "api/heroes/13" } }  },
          { id: 14, name: 'Celeritas', _links: { self: { href: "api/heroes/14" } }  },
          { id: 15, name: 'Magneta', _links: { self: { href: "api/heroes/15" } }  },
          { id: 16, name: 'RubberMan', _links: { self: { href: "api/heroes/16" } }  },
          { id: 17, name: 'Dynama', _links: { self: { href: "api/heroes/17" } }  },
          { id: 18, name: 'Dr IQ', _links: { self: { href: "api/heroes/18" } }  },
          { id: 19, name: 'Magma', _links: { self: { href: "api/heroes/19" } }  },
          { id: 20, name: 'Tornado', _links: { self: { href: "api/heroes/20" } }  }
        ]
      }
    };
    return {heroes};
  }
}