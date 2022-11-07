import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Projects } from "../assets/projects";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
      'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
      'User-Agent': 'custom/non-standard'
      
    })
  };

  // get all projects
  getProjects(): Observable<Projects> {
    return this.http.get<Projects>(this.apiURL + '/proyectos', this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  // get project by id
  getProjectById(id: any): Observable<Projects>{
    return this.http.get<Projects>(this.apiURL + '/proyectos/' + id).pipe(retry(1), catchError(this.handleError));
  }

  // create project
  createProject(id: any): Observable<Projects>{
    return this.http.post<Projects>(this.apiURL + '/proyectos', JSON.stringify(id), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  //update project
  updateProject(id: any, data: any): Observable<Projects>{
    return this.http.put<Projects>(this.apiURL + '/proyectos/' + id, JSON.stringify(data), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  // delete project
  deleteProject(id: any): Observable<Projects>{
    return this.http.delete<Projects>(this.apiURL + '/proyectos/' + id, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  // handleError
  handleError(error: any){
    let errorMessage = '';

    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error code: ${error.status} \nMessage: ${error.message}`
    }

    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    })
  }
}