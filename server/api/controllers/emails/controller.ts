import EmailsService from '../../services/emails.service';
import { Request, Response } from 'express';
import { ConfirmationRequestOptionsModel } from '../../models/emails.model';
import L from '../../../common/logger';

export class Controller {

  sendConfirmationRequest(req: Request, res: Response): void {
    
    const { 
      clientName,
      solicitorName,
      solicitorOrganization,
      caseId,
      shortLink,
      emailAddress
    } = req.body;

    const options: ConfirmationRequestOptionsModel = {
      personalisation: {
        client_name: clientName,
        solicitor_name: solicitorName,
        solicitor_organization: solicitorOrganization,
        case_id: caseId,
        short_link: shortLink
      },
      reference: `NOA_${Date.now()}`
    }

    EmailsService.sendConfirmationRequest(emailAddress, options).then(result => {
      if (result) res.json(result);
      else res.status(404).end();
    }).catch(err => L.error(err));
  }

  sendConfirmComplete(req: Request, res: Response): void {
    return null;
  }
}
export default new Controller();
