import { Injectable } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  EmployeeList: AngularFireList<Employee>;

  constructor(private firebase: AngularFirestore) { }

  getData() {
    return this.firebase.collection('Angular7-FireStore').snapshotChanges();
  }

  insertEmployee(employee: Employee) {
    return this.firebase.collection('Angular7-FireStore').add(employee);
  }

  updateEmployee(employeeId, employee: Employee) {
    //delete employee;
    this.firebase.doc('Angular7-FireStore/' + employeeId).update(employee);
  }
}
