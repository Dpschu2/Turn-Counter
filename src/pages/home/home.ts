import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  names = [];
  current = "";
  name = "";
  button = "start";
  added = false;
  isenabled = true;
  buttonColor = '#01DF01';
  nextColor = '#345465';
  index: any;
  i = 0;
  private subscription: Subscription;
  constructor(public navCtrl: NavController, private tts: TextToSpeech) {

  }
  next(){
    if(this.button == "stop"){
      this.index++;
      if(this.index == this.names.length)
        this.index = 0;
      this.current = this.names[this.index];
      this.i = 0;
    }
  }
  setTimer(){
    this.subscription = Observable.interval(2000).subscribe(x => {
      if(this.i >= 3)
          this.tts.speak(this.current);
      this.i++;
    });
  }
  cancelTimer(){
    this.subscription.unsubscribe();
  }
  start(element){
    if(this.names.length > 1){
      
      if(this.button == "start"){
        this.setTimer();
        this.isenabled = false;
        this.index = 0;
        this.button = "stop";
        this.buttonColor = '#FF0000';
        this.current = this.names[this.index];
      }
      else{
        
        this.names = [];
        this.isenabled = true;
        this.current = "";
        this.added = false;
        this.button = "start";
        this.buttonColor = '#01DF01';
        this.cancelTimer();
      }
    }
  }
  add(){
    if(this.name.length != 0){
      this.names.push(this.name);
      this.name = "";
      if(this.names.length > 0)
        this.added = true;
    }
  }
}
