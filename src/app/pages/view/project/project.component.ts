import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { Project } from 'src/app/models/Project';
import { ProjectRespose, Task } from 'src/app/models/ProjectResponse';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  _project!: Project;
  _projectRespose!: ProjectRespose;
  taskValue: string = '';

  @Input() set project(data: ProjectRespose) {
    this.setProjectData(data);
  }
  
  @Output() editProject = new EventEmitter<ProjectRespose>();
  @Output() editTasks = new EventEmitter<ProjectRespose>();
  @Output() deleteProject = new EventEmitter<string>();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  setProjectData(data: ProjectRespose) {
    this._projectRespose = data;
    const setProject: any = {};
    setProject.name = data.name;
    setProject.toDo = data.tasks ? data.tasks.filter((task: Task) => !task.completedDate ) : [];
    setProject.done = data.tasks ? data.tasks.filter((task: Task) => task.completedDate ) : [];
    this._project = setProject;
  }

  onEditProject() {
    this.editProject.emit(this._projectRespose);
  }

  onDeleteProject() {
    this.deleteProject.emit(this._projectRespose._id);
  }

  onUpdate(index: number, type: string, task: Task) {
    const project = _.cloneDeep(this._project);
    if (type === 'todo') {
      task.completedDate = new Date();
      project.toDo.splice(index, 1);
      project.done.push(task);
    } else {
      task.completedDate = null;
      project.done.splice(index, 1);
      project.toDo.push(task);
    }
    this.updateProject(project);
  }

  onDeleteTasks(index: number, type: string, task: Task) {
    const project = _.cloneDeep(this._project);
    if (type === 'todo') {
      task.completedDate = new Date();
      project.toDo.splice(index, 1);
    }

    this.updateProject(project);
  }

  updateProject(project: Project) {
    const tasks = [
      ...project.toDo,
      ...project.done,
    ]

    const _projectRespose = _.cloneDeep(this._projectRespose);
    _projectRespose.tasks = tasks;

    this.editTasks.emit(_projectRespose);
  }

  addTask(form: NgForm) {
    if (form.valid) {
      const task: Task = {
        name: this.taskValue,
        completedDate: null,
        creationDate: new Date(),
        expirationDate: this.getExpirationDate()
      }

      const project = _.cloneDeep(this._project);
      
      project.toDo.push(task);
      this.updateProject(project);
    } 

    form.reset();

  }

  getExpirationDate() {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }



}
