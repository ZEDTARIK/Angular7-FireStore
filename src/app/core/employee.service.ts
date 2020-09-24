import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  EmployeeList: AngularFireList<Employee>;

  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.EmployeeList = this.firebase.list('Angular7-FireStore');
    return this.EmployeeList;
  }

  insertEmployee(employee: Employee) {
    this.EmployeeList.push({
      fullName: employee.fullName,
      emailEmp: employee.emailEmp,
      phone: employee.phone
    });
  }
}
