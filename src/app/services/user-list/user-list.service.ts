import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.user_endpoint).pipe(
      catchError(_ => of([])));
  }

  createUser(userToCreate: User): Observable<{ result: string, user: User }> {
    return this.httpClient.post<User>(environment.user_endpoint, JSON.stringify(userToCreate),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).pipe(
        map(result => ({ result: 'success', user: result })),
        catchError((error: HttpErrorResponse) => of({ result: error.message, user: userToCreate }))
      );
  }

  modifyUser(userToModify: User): Observable<string> {
    return this.httpClient.put<User>(`${environment.user_endpoint}/${userToModify.id}`, JSON.stringify(userToModify),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }).pipe(
        map(_ => 'success'),
        catchError((error: HttpErrorResponse) => of(error.message))
      );
  }

  deleteUser(userid: number): Observable<string> {
    return this.httpClient.delete(`${environment.user_endpoint}/${userid}`).pipe(
      map(_ => 'success'),
      catchError((error: HttpErrorResponse) => of(error.message)));
  }
}
