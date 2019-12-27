import L from '../../common/logger';
import { NoARequest } from '../models/noa.model';

export class NoACreateService {

    validateNoA(caseId: string, appellantEmail: string): Promise<[boolean, string, object]> {
        L.info(`Validate NoA`);
        const validationResult = new Promise<[boolean, string, object]>((resolve, reject) => { // TODO: replace fake data
            resolve([true, '', {}]);
        });
        return validationResult;
    }

    createNoA(caseId: string, appellantEmail: string, request: NoARequest): Promise<[boolean, string]> {
        L.info(`Ceate NoA`);
        const creationResult = new Promise<[boolean, string]>((resolve, reject) => { // TODO: replace fake data
            resolve([true, '']);
        });
        return creationResult;
    }
}

export default new NoACreateService();
