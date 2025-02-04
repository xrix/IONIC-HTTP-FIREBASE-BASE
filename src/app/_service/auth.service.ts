import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { first } from 'rxjs/operators';
import { User } from '../_model/model.user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userId: string;
  constructor(
    private afAuth: AngularFireAuth,
    private user: User,
    private firestore: AngularFirestore
  ) {}

  getUser(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.user.set(res.user, 'fireUser');
        return res;
      });
  }

  async signup(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    try {
      const newUserCredential: firebase.auth.UserCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.firestore
        .doc(`userProfile/${newUserCredential.user.uid}`)
        .set({ email });
      return newUserCredential;
    } catch (error) {
      throw error;
    }
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  logout(): Promise<void> {
    this.user.logout();
    return this.afAuth.signOut();
  }

}
