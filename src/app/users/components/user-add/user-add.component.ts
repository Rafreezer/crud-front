import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;

	constructor(private __userService: UsersService, private __router:Router) { }


  ngOnInit(): void {
    this.buildUserForm();
  }

  buildUserForm():void{
    this.userForm = new FormGroup({
      user_name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      name:new FormControl('',Validators.required),
      last_Name:new FormControl('',Validators.required),
      age:new FormControl('',[Validators.required,Validators.max(100),Validators.min(1)]),
      password:new FormControl('',Validators.required),
      is_active:new FormControl(false),

    })
  }

  getFormValues(form:any):any{
    let obj:any={};
    Object.keys(form.controls).forEach((res)=>{
      obj[res]=form.controls[res].value
    })
    return obj;
  }

  checkControl(control):boolean{
    return control.dirty && control.invalid ? false: true;
  }

  validateForm(form:FormGroup):boolean{
    return form.status === 'VALID' ? true: false;
  }

  save(): void {
    console.log('jellow')
    const user = this.getFormValues(this.userForm);
    if(this.userForm.status === 'VALID'){
       this.__userService.addUser(user).subscribe((res:any) => {
         console.log(res);
         Swal.fire({
          icon:'success',
         title: 'User added succesfully',
         confirmButtonText: 'Ok',
        }).then((result) =>{
         this.__router.navigate(['/crud/users']);
        });
    },

    error => {
      console.log(<any>error);
    }
  );
    }
	}

  back(){
    this.__router.navigate(['/crud/users']);
  }

}
