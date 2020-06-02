import { IOdooConfig } from 'src/app/_interface/iodoo-config';

export function getConfig() {
  const server = 'http://167.99.67.203:8089';
  const db = '12ION';
  const api = server + '/api/';
  const auth = api + 'auth/token';
  const setdb = server + '/web?db=' + db;
  const result: IOdooConfig = {server, api, auth, db, setdb};
  return result;
}

export function getFireApi() {
  return {
    apiKey: 'AIzaSyBOkRcnk9wJxqqDlS1RuapGGwzaVs3ktB8',
    authDomain: 'macio-20aff.firebaseapp.com',
    databaseURL: 'https://macio-20aff.firebaseio.com',
    projectId: 'macio-20aff',
    storageBucket: 'macio-20aff.appspot.com',
    messagingSenderId: '473916629508',
    appId: '1:473916629508:web:60cd6b5238105b6e16cb51'
  };
}

export const environment = {
  production: true,
  get firebase() {
    return getFireApi();
  },
  get odooDev() {
    return getConfig();
  },
  get odooProd() {
    return getConfig();
  },
  get odooDemo() {
    return getConfig();
  },
  get odooDemo13() {
    return getConfig();
  }
};
