interface ITemplateVariable {
  [key: string]: string | number;
}
export default interface IParseMailTeplateDTO {
  file: string;
  variables: ITemplateVariable;
}
