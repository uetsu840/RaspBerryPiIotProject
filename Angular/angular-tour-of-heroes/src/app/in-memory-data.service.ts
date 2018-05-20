import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const heroes = [
            { id: 1, name: '11', position:0 },
            { id: 2, name: '12', position:0 },
            { id: 3, name: '21', position:0 },
            { id: 4, name: '22', position:0 },
        ];
        return { heroes };
    }
}