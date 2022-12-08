import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { UserInfo } from '../models/UserInfo.dto';
import { ENDPOINT } from '../secrets';
import { User } from '../models/User.dto';

@Injectable({
  providedIn: 'root',
})
export class CrendetialsService {
  userCredentials!: User;
  private userCredentialsSource = new BehaviorSubject<User | null>(null);
  userCredentials$ = this.userCredentialsSource.asObservable();
  constructor(private http: HttpClient) {}

  signup(credentials: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    console.log(credentials);
    this.http.post(ENDPOINT, credentials).subscribe({
      next: (res: any) => {
        console.log(res);
        const { idToken, email } = res;
        this.userCredentials = { idToken, email };
        console.log('CREDENTIALS: ', idToken, email);
        localStorage.setItem('token', idToken);
        this.userCredentialsSource.next(this.userCredentials);
      },
      error: (err) => console.log(err.message),
    });
  }

  logout(): boolean {
    localStorage.clear();
    return false;
  }
}

/* {
    "kind": "identitytoolkit#SignupNewUserResponse",
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MWMwOGM1MTZhZTM1MmI4OWU0ZDJlMGUxNDA5NmY3MzQ5NDJhODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtaHR0cC1tb3ZpZXMtZmViNGMiLCJhdWQiOiJyZWFjdC1odHRwLW1vdmllcy1mZWI0YyIsImF1dGhfdGltZSI6MTY3MDQ1MTQ3MCwidXNlcl9pZCI6IlFWOXVvbUtRdklkbkY3cTFTWHZxY3VVWVpzdjEiLCJzdWIiOiJRVjl1b21LUXZJZG5GN3ExU1h2cWN1VVlac3YxIiwiaWF0IjoxNjcwNDUxNDcwLCJleHAiOjE2NzA0NTUwNzAsImVtYWlsIjoid2lsbGlhbWxvcGVzNjRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIndpbGxpYW1sb3BlczY0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.URoV-5fcze7i9k_9x-yGys1VxfvwN2LaxjUTFPVNJqNLitEmxUWLbXp_7N7POJp7us1HzTHoP1yxGByEGAS0wy3vT5vEtAv0vm2IRmTC2EzaLABic27U22wdQ4SjDbtx9sV4FoPsNNSkg-Z9SAUf3CkIfQ04nSGRC2Rv70zKe3QKnfFvtLeGBK9QjNGkoYR1MNZtg29PLjvzer1zI2YF1BXDVNXkL9Oe1sl03mKlLInaWo8Zu9kOu7aWFJT9oz0ySwqkmBrUPvMQusM3Fsa2zG8rLLNVtdFwPT4uqaxc7-YV880-4TCoPxbLQ36kB-UX9df3SqS0n2RZktnKa4fTtQ",
    "email": "williamlopes64@gmail.com",
    "refreshToken": "AOkPPWQpNAFbgy87jCQDTRXeRhNlHOSmT-McoAsazQv8ftjVduXI9BUd2DFCQC_0TffCxk0opaCCwRB09lnVs9NXU_pPtDtxcQ81CVmBJHuF2B9oz4RajdWsmwzUF-cO1BUb04mg-SsBHIaJ9D3QPBOjCNsb4FFW2ji3dVQzjSaCjjtAsVB5JYY66Dxz4XCMuFO16L-1prg3cgHeKTJjKXbi0_dFPahj4UThBNtjvrY9N4jDP8i-amw",
    "expiresIn": "3600",
    "localId": "QV9uomKQvIdnF7q1SXvqcuUYZsv1"
} */
