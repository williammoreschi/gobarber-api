import IParseMailTeplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTeplateDTO';

interface IMailConstact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailConstact;
  from?: IMailConstact;
  subject: string;
  templateData: IParseMailTeplateDTO;
}
