import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { Project } from 'src/app/models/Project';
import { ProjectRespose } from 'src/app/models/ProjectResponse';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  projectName!: string;
  edit: boolean = false;
  _projectResponse!: ProjectRespose;

  @Input() set editProject(data: ProjectRespose) {
    this.setProjectData(data);
  }

  @Output() onCreateProject = new EventEmitter<{ data: ProjectRespose; edit?: boolean}>();

  constructor() { }

  ngOnInit(): void {
  }

  createProject(form: NgForm) {
    if (form.valid) {
      let emitBody: { data: ProjectRespose; edit?: boolean};
      if (this.edit) {
        const item = _.cloneDeep(this._projectResponse);
        item.name = this.projectName;
        emitBody = {
          data: item,
          edit: true
        }
      } else {
        emitBody = {
          data: {
            name: this.projectName
          }
        }
      }
      this.onCreateProject.emit(emitBody);
      this.edit = false;
      form.reset();
    } else {
      form.reset();
      return;
    }
  }

  setProjectData(data: ProjectRespose) {
    if (data && Object.keys(data).length > 0) {
      this.projectName = data.name;
      this.edit = true;
      this._projectResponse = data;
    }
  }

}
