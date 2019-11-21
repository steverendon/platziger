import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  friendId: any;
  friend:User;
  user: User;
  conversation_id: string;
  textMessage: string;
  conversation: any[];

  constructor(private activatedRoute: ActivatedRoute,
              private userServices: UserService,
              private conversationService: ConversationService,
              private authenticationService: AuthenticationService) {

    this.friendId = activatedRoute.snapshot.params['uid'];
    
    this.authenticationService.getStatus().subscribe( (session) => {
      this.userServices.getUserById(session.uid).valueChanges().subscribe( (user: User) => {
        this.user = user;
        this.userServices.getUserById(this.friendId).valueChanges()
        .subscribe( (data: User) => {
          this.friend = data;
          const ids = [this.user.uid, this.friend.uid].sort();
          this.conversation_id = ids.join('|');
          this.getConversation();
        }, (error) => {
          console.log(error);
        });
      });
    });

   }

  ngOnInit() {
  }

  sendMessage() {
    const message = {
      uid: this.conversation_id,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };
    this.conversationService.createConversation(message).
    then( () => {
      this.textMessage = '';
    });
  }

  getConversation() {
    this.conversationService.getConversation(this.conversation_id).valueChanges()
    .subscribe( (data) => {
      console.log(data)
      this.conversation = data;
      this.conversation.forEach( (message) => {
        if(!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          const audio = new Audio('assets/sound/new_message.m4a');
          audio.play();
        }
      });
    }, (error) => {
      console.log(error)
    });
  }

  getUserNickById(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }

}
