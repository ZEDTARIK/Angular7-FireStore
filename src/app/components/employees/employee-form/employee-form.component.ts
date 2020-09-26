import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/employee.service';
import { Employee } from '../../../core/employee';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
  employeeId = null;

  validationMessages = {
    fullName: {
      required: 'Full Name is Required',
      minlength: 'Full Name must be greater than 2 carateres',
      maxlength: 'Full Name must be less than 30 Carateres'
    },
    emailEmp: {
      required: 'Email is Required',
      email: 'Invalid Email'
    },
    phone: {
      required: 'Phone is Required'
    }
  };

  formErros = {
    fullName: '',
    emailEmp: '',
    phone: ''
  };


  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      emailEmp: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  logValidationErrors(group: FormGroup = this.employeeForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErros[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErros[key] += messages[errorKey] + ' ';
          }
        }
      }
      // FormGroup
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onSubmit(employeeForm: FormGroup = this.employeeForm) {
    const EmployeeData = JSON.parse(JSON.stringify(this.employeeForm.value));
    if (employeeForm.valid) {
      if (this.employeeId == null) {
        this.employeeService.insertEmployee(EmployeeData);
      } else {
        this.employeeService.updateEmployee(this.employeeId, EmployeeData);
      }
    }
    this.onResetForm(employeeForm);
  }

  onResetForm(employeeForm?: FormGroup): void {
    employeeForm.reset();
  }
  onLoadData(): void {
    this.employeeForm.setValue({
      fullName: 'Zouhair ETTARAK',
      emailEmp: 'ettarak.zouhair@gmail.com',
      phone: '0648697460'
    });
  }

}
