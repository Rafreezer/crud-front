import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/users/models/user';
import { UsersService } from 'src/app/users/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];


	constructor(private __route: ActivatedRoute, private __userService: UsersService,private __router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
		this.__userService.getUsers().subscribe((data: any) => {
      this.users = data;
    },

    error => {
      console.log(<any>error);
    }
  );
	}

  deleteUser(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.__userService.deleteUser(id).subscribe((res:any) => {
          this.ngOnInit();
        },
        error => {
          console.log(<any>error);
        });
      }
    })


    }

  addUser(){
      this.__router.navigate(['/crud/add']);
  }

  editUser(id: any){
    this.__router.navigate(['/crud/edit/'+id]);
}



}
