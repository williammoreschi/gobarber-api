import IParseMailTeplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTeplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTeplateDTO): Promise<string>;
}
