import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  auth2: any;
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
 
  constructor() { }

  ngOnInit() {
    this.googleSDK();
    this.fbLibrary();
  }

  googleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '658138070814-b2rpnhq5cfhnmfr5l637lg8298ia27s9.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
   
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));  
  }

  prepareLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
   
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        
        alert('ID: ' + profile.getId() + '\nName: ' + profile.getName() + '\nImage URL: ' + profile.getImageUrl()
        + '\nEmail: ' + profile.getEmail())
   
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }


  //////////    FaceBook    /////////

  fbLibrary() {
    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '240528553942137',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      window['FB'].AppEvents.logPageView();
    };
 
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  login() {
    window['FB'].login((response) => {
        console.log('login response',response);
        if (response.authResponse) {
 
          window['FB'].api('/me', {
            fields: 'last_name, first_name, email, address'
          }, (userInfo) => {
 
            console.log("user information");
            console.log(userInfo);
            alert('ID: ' + userInfo.id + '\nFirst Name: ' + userInfo.first_name + '\nLast Name: ' + userInfo.last_name
              + '\nEmail: ' + userInfo.email)
          });
           
        } else {
          console.log('User login failed');
        }
    }, {scope: 'email'});
  }
}