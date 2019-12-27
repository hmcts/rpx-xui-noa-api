import L from '../../common/logger';

export class NoAConfirmService {

    confirmRequest(uuid: string): Promise<[boolean, string]> {
        L.info(`Confirm NoA`);
        const confirmationResult = new Promise<[boolean, string]>((resolve, reject) => { // TODO: replace fake data
            resolve([true, '']);
        });
        return confirmationResult;
    }

}

export default new NoAConfirmService();
