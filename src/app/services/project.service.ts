import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, Subject } from 'rxjs';
import { Project } from '../models/Project';
import { environment } from 'src/environments/environment';
import { ProjectRespose } from '../models/ProjectResponse';

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})

export class ProjectService {


  constructor(private httpClient: HttpClient) { }
  

  getProjects(): Observable<ProjectRespose[]> {
    const url = `${apiUrl}/project`;
    return this.httpClient.get<ProjectRespose[]>(url).pipe(
      map((data: any) => {
        return data.data;
      })
    );
  }

  addProject(project: ProjectRespose): Observable<ProjectRespose> {
    const url =  `${apiUrl}/project`;
    return this.httpClient.post<any>(url, project).pipe(
      map((data: any) => {
        return data.data;
      })
    );
  }
  
  editProject(project: ProjectRespose): Observable<ProjectRespose> {
    const url =  `${apiUrl}/project`;
    return this.httpClient.put<ProjectRespose>(url, project).pipe(
      map((data: any) => {
        return data.data;
      })
    );
  }

  deleteProject(id: string): Observable<ProjectRespose> {
    const url =  `${apiUrl}/project`;
    let httpParams = new HttpParams().set('_id', id);
    let options = { params: httpParams }; 

    return this.httpClient.delete<ProjectRespose>(url, options).pipe(
      map((data: any) => {
        return data.data;
      })
    );
  }

}