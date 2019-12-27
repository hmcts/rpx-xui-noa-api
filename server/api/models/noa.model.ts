export interface ProfessionalContact {
  name: string;
  orgName: string;
  email: string;
}

export interface PostalAddress {
   addressLine1: string;
   addressLine2: string;
   townCity: string;
   county: string;
   postcode: string;
}

export interface NoARequest {
  privatecaseId: string;
  appellantEmail: string;
  requester: ProfessionalContact;
  requestType: string;
  contactMethod: string;
  address: PostalAddress;
}

export interface NoARequestParamsRequester extends ProfessionalContact {
  idam: string;
}

export interface NoARequestParamsContact {
  method: string;
  address: NoARequestParamsAddress;
}

export interface NoARequestParamsAddress {
  addressLine1: string;
  addressLine2: string;
  townCity: string;
  county: string;
  postcode: string;
}

export interface NoARequestParams {
  requester: NoARequestParamsRequester;
  requestType: string;
  caseJurisdiction: string;
  caseType: string;
  originatorEmail: string;
  originatorIdam: string;
  contact: NoARequestParamsContact;
}
