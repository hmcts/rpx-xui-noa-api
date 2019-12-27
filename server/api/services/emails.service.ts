import L from '../../common/logger';
import {  NotifyClient } from 'notifications-node-client';
import { ConfirmationRequestOptionsModel, ConfirmationResponse, ConfirmationSuccessOptionsModel } from '../models/emails.model';

const notifyClient = new NotifyClient(process.env.GOVNOTIFY_API_KEY);

export class EmailsService {

    sendConfirmationRequest(emailAddress: string, options: ConfirmationRequestOptionsModel): Promise<ConfirmationResponse> {
        L.info(`send confirmation request email to ${emailAddress}`);
        return notifyClient.sendEmail('f712d6de-0f21-4b2e-888e-18142095a165', emailAddress, options);
    }

    sendConfirmComplete(emailAddress: string, solicitorType: string, options: ConfirmationSuccessOptionsModel): Promise<ConfirmationResponse> {
        L.info(`send confirmation success email to ${emailAddress}`);
        return notifyClient.sendEmail('19f34ae0-c616-47c1-b9aa-8db3f6b43f51', emailAddress, options);
    }
}

export default new EmailsService();
