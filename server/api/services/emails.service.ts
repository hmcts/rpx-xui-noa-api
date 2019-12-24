import L from '../../common/logger';
import {  NotifyClient } from 'notifications-node-client';
import { ConfirmationRequestOptionsModel, ConfirmationResponse } from '../models/emails.model';

const notifyClient = new NotifyClient(process.env.GOVNOTIFY_API_KEY);

export class EmailsService {

    sendConfirmationRequest(emailAddress: string, options: ConfirmationRequestOptionsModel): Promise<ConfirmationResponse> {
        L.info(`send confirmation email to ${emailAddress}`);
        return notifyClient.sendEmail('f712d6de-0f21-4b2e-888e-18142095a165', emailAddress, options);
    }
}

export default new EmailsService();
