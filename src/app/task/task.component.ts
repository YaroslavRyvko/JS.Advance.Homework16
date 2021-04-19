import { Component, OnInit } from '@angular/core';
import { IBlogs, IUsers } from '../shared/interfaces/add-data.interface';
import { TaskdataService } from '../shared/services/taskdata.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  userstatus: boolean;
  username: string;
  email: string;
  password: string;
  users: Array<IUsers> = [];
  userexist: boolean;
  usernotexist: boolean;
  signInEmail: string;
  signInPassword: string;
  OnlineUser: string;
  buttonsUpdate: boolean;
  blogs: Array<IBlogs> = [];
  topic: string;
  message: string;
  blogId: number;
  editIndex: number;
  constructor(private taskService: TaskdataService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getBlogs();
  }

  getUsers(): void {
    this.users = this.taskService.getUsers();
  }

  getBlogs(): void {
    this.blogs = this.taskService.getBlogs();
    console.log(this.blogs);
  }

  addUser(): void {
    const USER: IUsers = {
      id: +this.taskService.users.slice(-1)[0].id + 1,
      username: this.username,
      email: this.email,
      password: this.password
    };
    for (let i = 0; i < this.taskService.users.length; i++) {
      if ((USER.email != this.taskService.users[i].email && USER.username != this.taskService.users[i].username)) {
        this.userexist = false;
      }
      else {
        this.userexist = true;
        break;
      }
    }
    if ((!this.userexist) && (this.password) && (this.email) && (this.username)) {
      this.taskService.addUser(USER);
    }
    this.username = '';
    this.password = '';
    this.email = '';
    console.log(this.users);
  }

  addBlog(): void {
    if (this.taskService.blogs.length > 0) {
      this.blogId = +this.taskService.blogs.slice(-1)[0].id + 1;
    }
    else {
      this.blogId = 1;
    }
    const Blog: IBlogs = {
      id: this.blogId,
      postedBy: this.OnlineUser,
      topic: this.topic,
      date: new Date(),
      message: this.message,
      checkRights: false
    };
    this.taskService.addBlog(Blog);
    this.checkRights();
    this.message = '';
    this.topic = '';
  }

  editBlog(index: number): void {
    this.message = this.blogs[index].message;
    this.topic = this.blogs[index].topic;
    this.editIndex = index;
  }
  saveEditPost(): void {
    this.blogs[this.editIndex].message = this.message;
    this.blogs[this.editIndex].topic = this.topic;
    this.message = '';
    this.topic = '';
  }
  deleteBlog(index: number): void {
    this.blogs.splice(index, 1);
  }

  signIn(event: any): void {
    for (let i = 0; i < this.taskService.users.length; i++) {
      if (this.signInEmail == this.taskService.users[i].email && this.signInPassword == this.taskService.users[i].password) {
        this.userstatus = true;
        this.OnlineUser = this.taskService.users[i].username;
        this.signInPassword = '';
        this.signInEmail = '';
        this.usernotexist = false;
        event.target.parentElement.firstChild.click();
        this.buttonsUpdate = true
        break;
      }
      else {
        this.usernotexist = true;
      }
    }
    console.log(this.OnlineUser);
    this.checkRights();
  }

  private checkRights(): void {
    for (let j = 0; j < this.blogs.length; j++) {
      if (this.OnlineUser == 'admin') {
        this.blogs[j].checkRights = true;
      }
      if (this.OnlineUser == this.blogs[j].postedBy) {
        this.blogs[j].checkRights = true;
      }
    }
  }

  signOut(): void {
    for (let j = 0; j < this.blogs.length; j++) {
      this.blogs[j].checkRights = false;
    }
    this.buttonsUpdate = false;
    this.userstatus = false;
    this.OnlineUser = '';
  }
}

