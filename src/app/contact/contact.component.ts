import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'firebase';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() uid: string;
  contact: User;
  constructor(private userServices: UserService) { }

  ngOnInit() {
    console.log(this.uid);
    this.userServices.getUserById(this.uid).valueChanges().subscribe( (data: User) => {
      this.contact = data;
    });
  }

}
