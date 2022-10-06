import { Component, Input , OnInit} from '@angular/core';
import { RegisterService } from '../register.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

//global variables
import {Globals} from '../globals'

@Component({
  selector: 'register.component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit{
  accountUsername:string = '';
  accountPassword:string = '';
  accountEmail:string = '';
  accountRepeatPassword:string = '';
  accountChangeUsernameEmail:string = ''
  accountChangeUsername:string = ''
  curUsers:any = []

  private globals: Globals = new Globals;
  private appcomp: AppComponent = new AppComponent();

  /*constructor(private http: HttpClient, private globals: Globals) {
    this.username = globals.username;
  }*/

  constructor(private http: HttpClient) {}
 
  ngOnInit() {
    console.log("Starting value of gloabl username is %s", this.globals.username)
    var request = this.http.get('http://localhost:8000/api/v1/accounts/')
    let i = 0
    request.subscribe((data: any) => {
      this.curUsers.push(data);
    })

  }

  /*constructor(private globals: Globals) {
    this.username = globals.username;
  }
  private updateCurrentUser() {
    this.globals.username = this.accountUsername
  }*/
 
  registerAccount() {
    if (this.accountUsername.length == 0 || this.accountPassword.length == 0 || this.accountRepeatPassword.length == 0 || this.accountEmail.length == 0) {
      alert("All fields must be fieled out.")
      return;
    }
    if (this.accountPassword != this.accountRepeatPassword) {
      alert("Passwords do not match.")
      return;
    }
    if (this.accountEmail.length < 11 || this.accountEmail.slice(-11) != "@purdue.edu") {
      alert("Must use a valid Purdue email.")
      return;
    }
    let i = 0
    console.log(this.curUsers[0].length)
    for (i = 0; i < this.curUsers[0].length; i++) {
      console.log(this.accountUsername)
      console.log(this.curUsers[0][i]['username'])
      console.log(this.accountEmail)
      console.log(this.curUsers[0][i]['email'])
      if (this.accountUsername == this.curUsers[0][i]['username']) {
        alert("Username exists already.")
        break;
      } else if (this.accountEmail == this.curUsers[0][i]['email']) {
        alert("Email in use already.")
        break;
      }
    }
    if (i >= this.curUsers[0].length) {
      var body = {
        username: this.accountUsername,
        password: this.accountPassword,
        email: this.accountEmail
      };
  
      var request = this.http.post<any>("http://localhost:8000/api/v1/accounts/", body, {observe: 'response'});
  
      request.subscribe((data: any) => {
        console.log(data)
      })
      alert("Account Created!")

      //saving current userdata
      //10/5 WILL SAVE ALL USERDATA AND NOT QUERY TO BACKEND YET
      //TODO: Delete globals vars, query and api to backend

      //myGlobals.username=this.accountUsername;
      this.globals.username = this.accountUsername
      this.appcomp.saveUsername(this.accountUsername)
      this.appcomp.savePassword(this.accountPassword)
      this.appcomp.saveEmail(this.accountEmail)
      console.log('Global username is now %s', this.globals.username)
    }
  }
  changeUsername() {
    // console.log(this.curUsers[0].length)
    var found = false
    var validUser = false
    let j = 0
    for (let i = 0; i < this.curUsers[0].length; i++) {
      console.log(this.curUsers[0][i]['email'])
      if (this.accountChangeUsernameEmail == this.curUsers[0][i]['email']) {
        found = true
        console.log("Found!")
        break;
      }
    }
    for (j = 0; j < this.curUsers[0].length; j++) {
      if (this.accountChangeUsername == this.curUsers[0][j]['username']) {
        break;
      }
    }
    if (j >= this.curUsers[0].length) {
      validUser = true
    }
    if (found == false && validUser == false) {
      alert("Invalid Email and Username is taken")
    } else if (found == false && validUser == true) {
      alert("Invalid Email")
    } else if (found == true && validUser == false) {
      alert("Username is taken")
    }
    if (found == true && validUser == true) {
      var body = {
        username: this.accountChangeUsername,
        email: this.accountEmail
      };
  
      var request = this.http.patch<any>("http://localhost:8000/api/v1/accounts/", body, {observe: 'response'});
  
      request.subscribe((data: any) => {
        console.log(data)
      })
      alert("Username Changed!")
    }
  }
}