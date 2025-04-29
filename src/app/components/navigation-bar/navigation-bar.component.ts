import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonTabs, IonTabButton, IonTabBar, IonIcon, ActionSheetController, IonCard, IonCardHeader, IonCardTitle, IonRow, IonCol } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { pawOutline, calendarOutline, settingsOutline, libraryOutline, addOutline, pencilOutline, chatboxEllipsesOutline, homeOutline } from 'ionicons/icons';
import { ROUTE_TAB } from '../../common/constants';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCardHeader,
    IonCard,
    IonTabs,
    IonTabButton,
    IonTabBar,
    IonIcon,
    IonCardTitle,
    IonRow,
    IonCol,
    RouterModule
],
  animations: [
    trigger('slideCard', [
      state('hidden', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('hidden => visible', [
        animate('350ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      transition('visible => hidden', [
        animate('350ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class NavigationBarComponent implements OnInit {
  selectedTab: string = ROUTE_TAB.HOME;
  openCard = false;
  cardState: 'visible' | 'hidden' = 'hidden';

  constructor(private actionSheetController: ActionSheetController) {
    addIcons({ homeOutline, calendarOutline, pencilOutline, chatboxEllipsesOutline, pawOutline, settingsOutline, libraryOutline, addOutline, });
  }

  ngOnInit() { }

  get route() {
    return ROUTE_TAB;
  }

  onTabChange(event: any) {
    this.selectedTab = event?.detail?.tab;
  }

  async openAddActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an action',
      buttons: [
        {
          text: 'Action 1',
          icon: 'paw-outline',
          handler: () => {
            // Action 1 handler
          }
        },
        {
          text: 'Action 2',
          icon: 'calendar-outline',
          handler: () => {
            // Action 2 handler
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        }
      ]
    });
    await actionSheet.present();
  }

  toggleCard() {
    if (!this.openCard) {
      this.openCard = true;
      this.cardState = 'visible';
    } else {
      this.cardState = 'hidden';
    }
  }

  onCardAnimationDone(event: any) {
    if (event.toState === 'hidden') {
      this.openCard = false;
    }
  }

  onCardClick() {
    this.cardState = 'hidden';
  }
}

