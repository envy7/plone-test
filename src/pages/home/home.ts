import { Component, OnInit, Injectable } from '@angular/core';
import { NavController, PopoverController, ToastController } from 'ionic-angular';
import { Traverser, Marker } from 'angular-traversal';
import { PloneViews } from '@plone/restapi-angular';
import { CustomEventComponent, CustomFolderComponent, CustomPlonesiteComponent,
         CustomDocumentComponent, CustomImageComponent, CustomLinkComponent,
         CustomFileComponent, CustomNewsitemComponent } from '../../components/components';
import { PopoverPage } from '../pages';

@Injectable()
export class TypeMarker extends Marker {
  mark(context: any): string {
    return context['@type'];  
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  networkState:boolean = true;
  toast;

  constructor(public navCtrl: NavController,
              private views: PloneViews,
              private traverser: Traverser,
              private popoverCtrl: PopoverController,
              private toastCtrl: ToastController) {
      this.views.initialize();
      this.traverser.addView('view', 'Event', CustomEventComponent);
      this.traverser.addView('view', 'Folder', CustomFolderComponent);
      this.traverser.addView('view', 'Plone Site', CustomPlonesiteComponent);
      this.traverser.addView('view', 'Document', CustomDocumentComponent);
      this.traverser.addView('view', 'Image', CustomImageComponent);
      this.traverser.addView('view', 'Link', CustomLinkComponent);
      this.traverser.addView('view', 'File', CustomFileComponent);
      this.traverser.addView('view', 'News Item', CustomNewsitemComponent);
  }

  ngOnInit() {
      console.log("check connection");
      setInterval(() => {this.checkConnectivity()}, 1000);
  }

  checkConnectivity() {
      
      if(navigator.onLine !== this.networkState){
        if(navigator.onLine == false) {
            this.toast = this.toastCtrl.create({
              message: "Device is offline, please check network connection",
              position: "bottom"
            });
            this.toast.present();
        } 
        else {
            this.toast.dismiss();
        }
      }
      this.networkState = navigator.onLine;
      // console.log("network state", this.networkState);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
