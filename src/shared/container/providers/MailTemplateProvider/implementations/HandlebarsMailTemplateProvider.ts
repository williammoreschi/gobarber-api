import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTeplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTeplateDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTeplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
export default HandlebarsMailTemplateProvider;
