// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
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
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
