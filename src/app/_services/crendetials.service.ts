import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { UserInfo } from '../models/UserInfo.dto';
import { ENDPOINT } from '../secrets';

@Injectable({
  providedIn: 'root',
})
export class CrendetialsService {
  constructor(private http: HttpClient) {}

  signup(credentials: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    console.log(credentials);
    this.http.post(ENDPOINT, credentials).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err.message),
    });
  }
}

/* {
    "kind": "identitytoolkit#SignupNewUserResponse",
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MWMwOGM1MTZhZTM1MmI4OWU0ZDJlMGUxNDA5NmY3MzQ5NDJhODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtaHR0cC1tb3ZpZXMtZmViNGMiLCJhdWQiOiJyZWFjdC1odHRwLW1vdmllcy1mZWI0YyIsImF1dGhfdGltZSI6MTY3MDQ1MTE0NywidXNlcl9pZCI6Ino3WVNzWHhNRnNaTFhXMmViTDR0M3htZFBFajEiLCJzdWIiOiJ6N1lTc1h4TUZzWkxYVzJlYkw0dDN4bWRQRWoxIiwiaWF0IjoxNjcwNDUxMTQ3LCJleHAiOjE2NzA0NTQ3NDcsImVtYWlsIjoid2lsbGlhbS5zdGVpbmtlZGVtZWxsb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2lsbGlhbS5zdGVpbmtlZGVtZWxsb0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.q6pe693mf85O010x1CYNnD05pBCppQ_OibLBtU15YpAbzlhJ4N2JlmNrLoTKvp0zF4EQF0pZ7mOaipsY-E3i9M_YiRzqZ_RauA4A5UGdveBzQWESb-z_jspNaIvS7qj-jMKkZWMCSnW-CEQOQRaF83rU1LFJKyDlo9TqLfVNR4TgJX6gf_Suh-5X8CdQwtz471jf3g3xl2hGTaKdNE9M_Fgtz4jE2E7M01vYm30RWYOpbDkESCRTZE4v6HkbtXS3cZZROW1EqmhpJ-aY_2U5Fov3Pk1pnZ4mFcECgg0cM-vW5D8bXJb31eoFA47-Dj5_jz8c9yZIBDzk7FUlnHX1jA",
    "email": "william.steinkedemello@gmail.com",
    "refreshToken": "AOkPPWT1GUMMoxWM61t20Pi4tOc4z4FPiee0N2oaGAHt0XZeydf48h3iNsv_cgjq7HxZtnkcOv6S4VYD8Bb5O9PXTzZFdveHd3nxRdaeH3wJ85mKJ-S-kDx1dXY6i4IGaClwkZOP51hMIZSIqhoqHV3RhxHO1Bexu-YIVqI2woBT-51DkRszvTkpJ0Vkl-zBJ8F3vxC07kxWYEZ7RPtcaQY4BVdl8GvKl_5m9bBe63xEEIuXIV0W_6CXZBAqO-SDJQY_zZclN5Ey",
    "expiresIn": "3600",
    "localId": "z7YSsXxMFsZLXW2ebL4t3xmdPEj1"
} */

/* {
    "kind": "identitytoolkit#SignupNewUserResponse",
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1MWMwOGM1MTZhZTM1MmI4OWU0ZDJlMGUxNDA5NmY3MzQ5NDJhODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtaHR0cC1tb3ZpZXMtZmViNGMiLCJhdWQiOiJyZWFjdC1odHRwLW1vdmllcy1mZWI0YyIsImF1dGhfdGltZSI6MTY3MDQ1MTQ3MCwidXNlcl9pZCI6IlFWOXVvbUtRdklkbkY3cTFTWHZxY3VVWVpzdjEiLCJzdWIiOiJRVjl1b21LUXZJZG5GN3ExU1h2cWN1VVlac3YxIiwiaWF0IjoxNjcwNDUxNDcwLCJleHAiOjE2NzA0NTUwNzAsImVtYWlsIjoid2lsbGlhbWxvcGVzNjRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIndpbGxpYW1sb3BlczY0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.URoV-5fcze7i9k_9x-yGys1VxfvwN2LaxjUTFPVNJqNLitEmxUWLbXp_7N7POJp7us1HzTHoP1yxGByEGAS0wy3vT5vEtAv0vm2IRmTC2EzaLABic27U22wdQ4SjDbtx9sV4FoPsNNSkg-Z9SAUf3CkIfQ04nSGRC2Rv70zKe3QKnfFvtLeGBK9QjNGkoYR1MNZtg29PLjvzer1zI2YF1BXDVNXkL9Oe1sl03mKlLInaWo8Zu9kOu7aWFJT9oz0ySwqkmBrUPvMQusM3Fsa2zG8rLLNVtdFwPT4uqaxc7-YV880-4TCoPxbLQ36kB-UX9df3SqS0n2RZktnKa4fTtQ",
    "email": "williamlopes64@gmail.com",
    "refreshToken": "AOkPPWQpNAFbgy87jCQDTRXeRhNlHOSmT-McoAsazQv8ftjVduXI9BUd2DFCQC_0TffCxk0opaCCwRB09lnVs9NXU_pPtDtxcQ81CVmBJHuF2B9oz4RajdWsmwzUF-cO1BUb04mg-SsBHIaJ9D3QPBOjCNsb4FFW2ji3dVQzjSaCjjtAsVB5JYY66Dxz4XCMuFO16L-1prg3cgHeKTJjKXbi0_dFPahj4UThBNtjvrY9N4jDP8i-amw",
    "expiresIn": "3600",
    "localId": "QV9uomKQvIdnF7q1SXvqcuUYZsv1"
} */