import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserListService } from './user-list.service';
import { User } from 'src/app/models/user.model';

describe('UserListService', () => {
  let service: UserListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserListService]
    });

    service = TestBed.inject(UserListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers = [
        new User(),
        new User()
      ];

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
    it('should return empty array on error', () => {
      service.getUsers().subscribe(() => { }, users => {
        expect(users.length).toBe(0);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(new HttpErrorResponse({ error: 'Bad Request', status: 400 }));
    });
  });

  describe('createUser', () => {
    const dummyUser = { name: 'Test' };
    it('should return an Observable<{ result: string, user: User }>', () => {

      service.createUser(dummyUser as User).subscribe(user => {
        expect(user.result).toBe('success');
        expect(user.user.name).toEqual('Test');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(dummyUser);
      req.flush(dummyUser);
    });
    it('should return an error Observable<{ result: string, user: User }>', () => {
      service.getUsers().subscribe(() => { }, error => {
        expect(error.result).toBe('Bad Request');
        expect(error.user.name).toEqual('Test');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(new HttpErrorResponse({ error: 'Bad Request', status: 400 }));
    });
  });

  describe('modifyUser', () => {
    const dummyUser = { id: 1 };
    it('should return success string', () => {

      service.modifyUser(dummyUser as User).subscribe(result => {
        expect(result).toBe('success');
      });

      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/${dummyUser.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(dummyUser);
      req.flush(dummyUser);
    });

    it('should return an error message', () => {
      service.getUsers().subscribe(() => { }, error => {
        expect(error).toBe('Bad Request');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(new HttpErrorResponse({ error: { message: 'Bad Request' }, status: 400 }));
    });
  });

  describe('deleteUser', () => {
    const dummyUser = { id: 1 };
    it('should return success string', () => {

      service.deleteUser(dummyUser.id).subscribe(result => {
        expect(result).toBe('success');
      });

      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/${dummyUser.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyUser);
    });

    it('should return an error message', () => {
      service.getUsers().subscribe(() => { }, error => {
        expect(error).toBe('Bad Request');
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(new HttpErrorResponse({ error: { message: 'Bad Request' }, status: 400 }));
    });
  });
});
