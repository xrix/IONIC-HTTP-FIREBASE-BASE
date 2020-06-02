import { EPartnerFields } from '../_enum/epartner-fields.enum';
import { IDomainParam } from '../_interface/idomain-param';
import { IRestParam } from '../_interface/irest-param';

export function fieldsOf(model: string): string {
    const res: Array<string> = [];
    switch (model) {
      case 'res.partner': {
        Object.keys(EPartnerFields).map((k) => res.push(k));
        break;
      }
      default: {
        res.push('id');
        break;
      }
    }
    return JSON.stringify(res);
}
function parseValue(val: any) {
  const tipe = typeof val;
  let result: string;
  switch (tipe) {
    case 'number': {
      break;
    }
    case 'boolean': {
      result = tipe === 'boolean' ? 'True' : 'False';
      break;
    }
    case 'string': {
      result = '\'' + val + '\'';
      break;
    }
    default: {
      result = val;
      break;
    }
  }
  return result;
}
export function getDomainLiteral(dom: IDomainParam): string {
  const xo =
    '[(\'' +
    dom.field +
    '\', \'' +
    dom.operand +
    '\', ' +
    parseValue(dom.value) +
    ')]';
  return xo.toString();
}

export function parseParamLiteral(param: IRestParam) {
  const result = {
    limit: '',
    fields: '',
    domain: '',
    offset: '',
    order: '',
  };
  if (param.limit > 0) {
    result.limit = JSON.stringify(param.limit);
  } else {
    result.limit = '1000';
  }
  if (param.offset > 0 || param.offset !== 'none') {
    result.offset = JSON.stringify(param.offset);
  }
  if (param.domain) {
    try {
      result.domain = getDomainLiteral(param.domain);
    } catch (e) {
      console.log('domain discharged', e);
    }
  }
  if (param.fields === undefined) {
    result.fields = '';
  } else if (param.fields === 'default') {
    result.fields = fieldsOf(param.model);
  } else if (!!param.fields) {
    result.fields = JSON.stringify(param.fields);
  }
  if (!!param.order) {
    result.order = param.order;
  }
  return result;
}
