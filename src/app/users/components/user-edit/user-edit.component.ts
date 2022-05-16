import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/users/models/user';
import { UsersService } from 'src/app/users/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;

	constructor(private __userService: UsersService, private __router:Router,   private __route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.__route.params.subscribe(params => {
      let id = params['id'];

      this.getUser(id);
    });
  }

  buildUserForm(user: User):void{
    this.userForm = new FormGroup({
      id:new FormControl(user.id,Validators.required),
      user_name:new FormControl(user.user_name,Validators.required),
      email:new FormControl(user.email,[Validators.required,Validators.email]),
      name:new FormControl(user.name,Validators.required),
      last_Name:new FormControl(user.last_Name,Validators.required),
      age:new FormControl(user.age,[Validators.required,Validators.max(100),Validators.min(1)]),
      password:new FormControl(user.password,Validators.required),
      is_active:new FormControl(user.is_active),

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


  getUser(id:any): void {
		this.__userService.getUser(id).subscribe((data: any) => {
      this.buildUserForm(data);
    },

    error => {
      console.log(<any>error);
    }
  );
	}

  update(): void {
    const user = this.getFormValues(this.userForm);
    if(this.userForm.status === 'VALID'){
       this.__userService.updateUser(user).subscribe((res:any) => {
         Swal.fire({
           icon:'success',
          title: 'User updated succesfully',
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
