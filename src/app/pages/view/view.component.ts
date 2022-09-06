import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectRespose } from 'src/app/models/ProjectResponse';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/services/project.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  projects: ProjectRespose[] = [];
  selected!: Project;
  editProject!: ProjectRespose;

  constructor(private projectService: ProjectService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (projectData: ProjectRespose[]) => {
        this.projects = projectData;
      }
    )
  }

  getUser(): User[] {
    return []
  }

  onDeleteProject(id: string) {
    const projects = _.cloneDeep(this.projects);
    this.projectService.deleteProject(id).subscribe(
      (deletedData: ProjectRespose) => {
        const index = projects.findIndex((val: ProjectRespose) => val._id === deletedData._id );
        projects.splice(index, 1);
        this.projects = projects;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onCreateProject(data: { data: ProjectRespose; edit?: boolean}) {
    const projects = _.cloneDeep(this.projects);
    if (data.edit) {
      this.projectService.editProject(data.data).subscribe(
        (editedData: ProjectRespose) => {
          const index = projects.findIndex((val: ProjectRespose) => val._id === editedData._id );
          projects[index] = data.data;
          this.projects = projects;
          this.changeDetection.detectChanges();

        },
        (error) => {
          console.log(error)
        }
      );
    } else {
      this.projectService.addProject(data.data).subscribe(
        (addedData: ProjectRespose) => {
          projects.push(addedData);
          this.projects = projects;
        },
        (error) => {
          console.log(error)
        }
      );
    }
    
  }

  onEditTask(data: ProjectRespose) {
    const projects = _.cloneDeep(this.projects);
    this.projectService.editProject(data).subscribe(
      (editedData: ProjectRespose) => {
        const index = projects.findIndex((val: ProjectRespose) => val._id === data._id );
        projects[index] = data;
        this.projects = projects;
        this.changeDetection.detectChanges();
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onEditProjectName(data: ProjectRespose) {
    this.editProject = data;
  }

}
