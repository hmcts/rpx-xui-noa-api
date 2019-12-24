export interface ConfirmationResponse {
    id: string;
    reference: string;
    content: {
      subject: string,
      body: string,
      from_email: string
    };
    uri: string;
    template: {
      id: string,
      version: number,
      uri: string
    };
  }

export interface ConfirmationRequestPersonalisationModel {
    client_name: string;
    solicitor_name: string;
    solicitor_organization: string;
    case_id: string;
    short_link: string;
}

export interface ConfirmationRequestOptionsModel {
    personalisation: ConfirmationRequestPersonalisationModel;
    reference: string;
    emailReplyToId?: string;
}
