import { Injectable } from '@angular/core';
import { IBlogs, IUsers } from '../interfaces/add-data.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskdataService {
  users: Array<IUsers> = [{
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin'
  }];

  blogs: Array<IBlogs> = [{
    id: 1,
    postedBy: this.users[0].username,
    topic: 'First post',
    date: new Date('2020-05-22 10:00'),
    message: 'Sign up to create your account and start to use Angular Blog',
    checkRights: false
  }];

  constructor() { }

  getUsers(): Array<IUsers> {
    return this.users;
  }
  getBlogs(): Array<IBlogs> {
    return this.blogs;
  }
  addUser(newUser: IUsers): void {
    this.users.push(newUser);
  }
  addBlog(newBlog: IBlogs): void {
    this.blogs.push(newBlog);
  }
}
