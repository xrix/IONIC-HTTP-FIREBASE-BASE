// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.

import { IOdooConfig } from 'src/app/_interface/iodoo-config';

// The list of file replacements can be found in `angular.json`.
export function getConfig(env: 'dev' | 'prod' | 'demo' | 'demo13') {
  let server = '';
  let db = '';
  const ngrok = '81b527cb';
  if (env === 'prod') {
    server = 'http://167.99.67.203:8089';
    db = '12ION';
  } else if (env === 'demo') {
    server = `https://${ngrok}.ngrok.io`;
    db = '12ION';
  } else if (env === 'demo13') {
    server = 'http://192.168.43.156:8069';
    db = 'x3hrd';
  } else {
    server = 'http://192.168.43.156:8069';
    db = '12ION';
  }

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
  production: false,
  get firebase() {
    return getFireApi();
  },
  get odooDev() {
    return getConfig('dev');
  },
  get odooProd() {
    return getConfig('prod');
  },
  get odooDemo() {
    return getConfig('demo');
  },
  get odooDemo13() {
    return getConfig('demo13');
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
