import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { HomePage } from '../pages/home/home';
import {SecondPage } from '../pages/second/second'
declare var window:any;
declare var cordova:any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  token
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  private fcm:FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.rootPage = HomePage
      this.fireBaseCloudMessaging()
      //this.handleNotifications()
      //this.fireBaseTokenRefresh()
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  fireBaseCloudMessaging() {
    //debugger
    console.log("fireBaseCloudMessaging myLog Outside", this.token)
    this.fcm.getToken().then(val => {
      //debugger
      
      this.token = val
      console.log("fireBaseCloudMessaging myLog", this.token)
      //this.tokenUpdate(1)
      this.handleNotifications()
    }).catch(err => {
      console.log("err", err)
      //this.setRootPage(false, 2)
      this.rootPage=HomePage
    });

  }

  fireBaseTokenRefresh() {
    this.fcm.onTokenRefresh().subscribe(token => {
      this.token = token
      console.log("in token referesh rcv", this.token)
      //this.tokenUpdate(2)
      this.handleNotifications()
    }, err => {
      console.log("err", err)
    })
  }

  setRootPage(flag, num) {
   if(flag==true){
    this.rootPage=SecondPage
   }else{
    this.rootPage = HomePage
   }
    
  }

  handleNotifications() {
    console.log("handleNotifications")
   
      this.platform.ready().then(res => {
        console.log("handleNotifications platformready")
        this.fcm.onNotification().subscribe(data => {
              //let notificationData = data
              console.log("tonNotification().subscribe", JSON.stringify(data))
              if (data.wasTapped == true) {
                console.log("ReceivedInBackground", data);
   //             this.storage.set("isNotification", true).then(val => {
                  //this.setRootPage(true, 8)
                  this.rootPage=SecondPage
   /*              }).catch(err => {
                  this.setRootPage(true, 18)
                })
             */ 
              } else {
                console.log("ReceivedInForeground");
                //this.setRootPage(true, 8)
                this.rootPage=SecondPage
               /*   this.localNotifications.schedule(
                  {
                    id: Date.now(),
                    title: data.title,
                    text: data.body,
                    foreground: true,
                    icon: "res://icon",
                    smallIcon: "res://fcm_push_icon",
                    color: "#00326C",
                  })
        */
                  if (this.platform.is('android')) {
       /*               this.localNotifications.on('click').subscribe(notification => {
                      this.storage.get("loginStatus").then(val => {
                        if (val == LoginStatus.loggedIn) {
                          this.nav.push(MessageListingPage)
                        } else {
                          this.storage.set("isNotification", true).then(val => {
                            this.nav.push(SignInPage, { "isNotification": true })
                          }).catch(err => {
                            this.setRootPage(false, 11)
                          })
                        }
                      }).catch(err => {
                        this.setRootPage(false, 12)
                      })
                    });  */
                  } else if (this.platform.is('ios')) {
                    alert(JSON.stringify(data))
                  }
              }
      
            })
            setTimeout(() => {
              //if (num == 1)
              //this.setRootPage(false, 15)
              this.rootPage=HomePage
              /* if (num == 1) {
                this.storage.get("isNotification").then(val => {
                  console.log("handleNotifications", val + " " + num)
                
                  if (val==null || val == false)
                    this.setRootPage(false, 15)
                }).catch(err => {
                  this.setRootPage(false, 11)
                })
      
              } */
            }, 10000);
          }).catch(err=>{
            console.log("platformNotReay",err);
          })
   
   
  }
}

