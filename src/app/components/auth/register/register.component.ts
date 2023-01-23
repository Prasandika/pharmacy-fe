import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserRole } from 'src/app/enums/user-role.enum';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    if (localStorage.getItem('authToken')) {
      this.router.navigateByUrl('/dashboard');
    }

    this.registerFormGroup = this.fb.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      role: new FormControl(UserRole.Regular),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.userService.register(this.registerFormGroup.value);
  }
}
