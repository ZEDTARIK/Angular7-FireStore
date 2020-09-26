import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/employee';
import { EmployeeService } from 'src/app/core/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees : Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getData().subscribe((data: any) =>{
      this.employees = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Employee;
      });
    });
  }

}
