import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User[];
  query: string = '';
  friendEmail: string = '';
  user: User;


  constructor(private userServices: UserService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private modalService: NgbModal,
              private requestService: RequestsService) { 
    this.userServices.getUsers().valueChanges()
    .subscribe( (data: User[]) => {
      this.friends = data;
    }, (error) => {
      console.log(error);
    });
    this.authenticationService.getStatus().subscribe( (status) => {
      this.userServices.getUserById(status.uid).valueChanges().subscribe( (data: User) => {
        this.user = data;
      })
    })
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logOut().then( (data) => {
      alert('Session Cerrada');
      this.router.navigate(['login']);
    })
    .then( (error) => {
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
     
    });
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    };
    this.requestService.createRequest(request).then( () => {
      alert('Solicitud enviada');
    }).catch( (error) => {
      console.log(error);
    });
  }

}
