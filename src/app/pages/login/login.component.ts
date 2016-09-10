import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Http, Headers, HTTP_PROVIDERS } from '@angular/http';
 import {Router} from '@angular/router';

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public http;
  public router; 

  constructor(http: Http, fb:FormBuilder, router: Router) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
    this.http = http;
    this.router = router;
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      let headers = new Headers();
    headers.append('Content-Type', 'application/json');
      this.http.post('auth/index/login', this.form.value,
      {
      headers: headers
      })
        .subscribe(
          data => {
           console.log('success response:');
           console.log(data);
          },
          err =>  {
           console.log('error response:');
           console.log(err);
           debugger;
           this.router.navigate(['/pages/dashboard']);
          },
          () => console.log('Authentication Complete')
        );
      // your code goes here
      // console.log(values);
    }
  }
}
