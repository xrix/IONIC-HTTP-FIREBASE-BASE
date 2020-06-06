import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { IOdooConfig } from '../_interface/iodoo-config';
import { User } from '../_model/model.user';
import { HTTP } from '@ionic-native/http/ngx';
import { IUserCredential } from '../_interface/iuser-credential';
import { IOdooHttpResponse } from '../_interface/iodoo-http-response';
import { IRestParam } from '../_interface/irest-param';
import { parseParamLiteral } from '../_model/base';

@Injectable({
  providedIn: 'root'
})
export class OdooService {

  private params = {
    login: '',
    password: '',
    db: '',
  };
  private config: IOdooConfig;

  constructor(
    private user: User,
    private http: HTTP) {
      this.config = environment.odooProd;
    }

  async login(usr: IUserCredential): Promise<IOdooHttpResponse> {
    this.params.login = usr.login;
    this.params.password = usr.password;
    this.params.db = this.config.db;
    let result: IOdooHttpResponse;
    const headers = await this.getHeaders('login');
    await this.http
      .sendRequest(
        this.config.auth,
        {
          method: 'get',
          headers,
          params: this.params,
        })
      .then((response) => {
        result = response; })
      .catch((error) => {
        result = error;
      });
    if (result.status === 200) {
      this.user.set(JSON.parse(result.data));
    }
    return result;
  }

  async logout(): Promise<void> {
    let result: IOdooHttpResponse;
    const headers = await this.getHeaders('logout');
    this.user.logout();
    try {
      await this.http.delete(
        this.config.auth,
        this.params,
        headers)
      .then((response) => result = response)
      .catch((error) => result = error);
    } catch (error) {
      console.error(error);
    }
  }

  async reads(params: IRestParam): Promise<IOdooHttpResponse> {
    const headers = await this.getHeaders();
    const readPayload = parseParamLiteral(params);
    let result: IOdooHttpResponse;
    await this.http
      .get(this.config.api + params.model, readPayload, headers)
      .then((res) => {
        result = res;
      })
      .catch((error) => {
        result = error;
      });
    return result;
  }

  async read(params: IRestParam): Promise<IOdooHttpResponse> {
    const headers = await this.getHeaders();
    const path = this.config.api + params.model + '/' + params.id;
    const readPayload = parseParamLiteral(params);
    let result: IOdooHttpResponse;
    await this.http.get(path, {fields: readPayload.fields}, headers)
      .then(v => {
        result = v;
      })
      .catch(error => {
        result = error;
      });
    return result;
  }

  async searchCount(params: IRestParam): Promise<IOdooHttpResponse> {
    const headers = await this.getHeaders();
    const readPayload = parseParamLiteral(params);
    const path = this.config.api + 'summary/' + params.model + '/getcount';
    return await this.http.get(
      path, {domain: readPayload.domain}, headers)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  async patch(params: IRestParam): Promise<IOdooHttpResponse> {
    const headers = await this.getHeaders();
    const path = this.config.api + params.model + '/' + params.id;
    const body = {
      model: params.model,
      id: params.id,
      action: params.action
    };
    let result: IOdooHttpResponse;
    await this.http.patch(path, body, headers)
      .then(v => {
        result = v;
      })
      .catch(error => {
        result = error;
      });
    return result;
  }

  async put(params: IRestParam): Promise<IOdooHttpResponse> {
    const headers = await this.getHeaders();
    const path = this.config.api + params.model + '/' + params.id;
    const body = params.data || {};
    let result: IOdooHttpResponse;
    await this.http.put(path, body, headers)
      .then(v => {
        result = v;
      })
      .catch(error => {
        result = error;
      });
    return result;
  }

  async post(params: IRestParam): Promise<IOdooHttpResponse> {
    const headers = await this.getHeaders();
    const path = this.config.api + params.model;
    const body = params.data || {};
    let result: IOdooHttpResponse;
    await this.http.post(path, body, headers)
      .then(v => {
        result = v;
      })
      .catch(error => {
        result = error;
      });
    return result;
  }

  async getHeaders(usage?: 'login'|'logout') {
    let result;
    if (usage === 'logout') {
      await this.user.getAccess().then(token => {
        result = {'access-token': token};
      });
    } else if (usage === 'login') {
      result = {
        'content-type': 'application/x-www-form-urlencoded',
        charset: 'utf-8'
      };
    } else {
      await this.user.getAccess().then(token => {
        result = {
          'content-type': 'application/x-www-form-urlencoded',
          charset: 'utf-8',
          'access-token': token
        };
      });
    }
    return result;
  }

}
