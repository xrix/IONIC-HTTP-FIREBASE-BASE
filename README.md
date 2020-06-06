# IONIC-HTTP-FIREBASE-STARTED
Ionic starter for Odoo and Firebase
Using Ionic 5 and Angular. 

# Compatibility
1. Odoo version 12 or 13
2. Firebase

# Getting Started
1. clone this repo
2. navigate to working folder
3. `nmp install`
4. `ionic cordova run [device]`

# configure Odoo
* The server configuration can be found in folder *./src/environments/*
* Android http permission configuration can be found in: *./resources/android/xml/network_security_config.xml*
* Set Odoo local or production server in this line this.config = environment.**odooProd;**
```
  constructor(
    private user: User,
    private http: HTTP) {
      this.config = environment.odooProd;
    }
 ``` 
 
   available :
   
     *odooProd, odooDev, odooDemo, odooDemo13*
     
     if not sure just let default or append `--prod` when run/build
     
# configure Firebase
* The server configuration can be found in folder *./src/environments/*

