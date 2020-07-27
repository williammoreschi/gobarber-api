import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailConstant {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailConstant;
  from?: IMailConstant;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
