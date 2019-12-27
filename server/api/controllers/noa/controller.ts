import EmailsService from '../../services/emails.service';
import { Request, Response } from 'express';
import { ConfirmationRequestOptionsModel, ConfirmationSuccessOptionsModel } from '../../models/emails.model';
import L from '../../../common/logger';
import NoACreateService from '../../services/noa-create.service';
import { NoARequestParams, NoARequest } from '../../models/noa.model';
import NoAConfirmService from '../../services/noa-confirm.service';

export class Controller {

  create(req: Request, res: Response): void {
    // {
    //   requester: {
    //     name: "Sally Solicitor",
    //     orgName: "Sue Grabbit and Runne LLP",
    //     email: "sally@sgrllp.com"
    //     idam: "1223-2324-2324-2324"
    //   },
    //   requestType: "NEWREP", // or "CHANGEREP"
    //   caseJurisdiction: "DIVORCE",
    //   caseType: "Divorce 123"
    //   originatorEmail: "origin@solictor.com" // if CHANGEREP
    //   originatorIdam: "666-666-66-6" // Citizen or current legal rep
    //   contact: {
    //      method: "email", // or "post" 
    //      address: {
    //        addressLine1: "The Fubar Building",
    //        addressLine2: "100 Thud Street",
    //        townCity: "Futon"
    //        county: "Barshire"
    //        postcode: "FU8 AR"
    //      }
    //   }
    // }

    const { caseid, email } = req.params;

    const noARequestParams: NoARequestParams = req.body;

    NoACreateService.validateNoA(caseid, email).then((validationResult) => {

      if (validationResult[0]) {


        const noARequest: NoARequest = {
          address: noARequestParams.contact.address,
          appellantEmail: email,
          contactMethod: noARequestParams.contact.method,
          privatecaseId: caseid,
          requestType: noARequestParams.requestType,
          requester: noARequestParams.requester
        };

        NoACreateService.createNoA(caseid, email, noARequest).then((creationResult) => {

          if (creationResult[0]) {

            switch (noARequestParams.contact.method) {
              case 'email':
                const options: ConfirmationRequestOptionsModel = {
                  personalisation: {
                    client_name: 'Generic Client Name', // TODO: should come from NoACreateService.createNoA
                    solicitor_name: noARequestParams.requester.name,
                    solicitor_organization: noARequestParams.requester.orgName,
                    case_id: caseid,
                    short_link: 'abcd1234' // TODO: should come from NoACreateService.createNoA
                  },
                  reference: `NOA_${Date.now()}`
                };

                EmailsService.sendConfirmationRequest(email, options).then(result => {
                  if (result) res.json(result);
                  else res.status(404).end();
                }).catch(err => L.error(err));

                break;
              case 'post':
                // TODO: handle snail mail

                break;
              default:
                break;
            }
          }
        });
      }
    });
  }

  confirm(req: Request, res: Response): void {
    
    const { uuid } = req.params;

    NoAConfirmService.confirmRequest(uuid).then((confirmationResult) => {

      if (confirmationResult[0]) {

        const options: ConfirmationSuccessOptionsModel = {
          personalisation: {
            client_name: 'Generic Client Name', // TODO: should come from NoAConfirmService.confirmRequest
            solicitor_name: 'Generic Solicitor Name', // TODO: should come from NoAConfirmService.confirmRequest
            case_id: '1111-1111-1111-1111' // TODO: should come from NoAConfirmService.confirmRequest
          },
          reference: `NOA_${Date.now()}`
        };

        const email = 'adnan.akgun@hmcts.net';  // TODO: should come from NoAConfirmService.confirmRequest

        EmailsService.sendConfirmComplete(email, 'new', options).then(result => {
          if (result) res.json(result);
          else res.status(404).end();
        }).catch(err => L.error(err));
        
      }
    });
  }
}
export default new Controller();
