import { TemplateResult } from 'lit-html';

const getRenderString = (data: TemplateResult): string => {
  const { strings, values }: TemplateResult = data;
  const v: any[] = [...values, ''];
  return strings.reduce((acc, s, i) => acc + s + v[i], '');
};

export default getRenderString;
