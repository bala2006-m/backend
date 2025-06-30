import { DbService } from './db.service';
export declare class DbController {
    private readonly dbService;
    constructor(dbService: DbService);
    getTables(): Promise<{
        tables: string[];
    }>;
}
