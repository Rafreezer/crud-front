import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userUrl = 'http://localhost:8080/api';

  constructor(private __http: HttpClient) {   }

  /** GET users from the server */
  getUsers(): Observable<any> {
    return this.__http.get(this.userUrl+'/users', httpOptions);
  }

  /** GET user by id */
  getUser(id: any): Observable<any> {
    return this.__http.get(this.userUrl+'/users/'+id, httpOptions);
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<any> {
    return this.__http.post(this.userUrl + '/users', user, httpOptions);
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.__http.put(this.userUrl + '/users/'+user.id,user, httpOptions);
  }


  /** DELETE: delete the user from the server */
  deleteUser(id:any): Observable<any> {
	  return this.__http.delete(this.userUrl+'/users/'+id, httpOptions);
  }

}
