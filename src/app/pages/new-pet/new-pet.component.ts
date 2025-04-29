import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { IonButton, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonContent, IonProgressBar, IonItem, IonLabel, IonInput, IonList, IonRadioGroup, IonListHeader, IonRadio, IonDatetimeButton, IonModal, IonDatetime, IonTextarea, IonText, IonCheckbox, IonFooter, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, query, group, animate } from '@angular/animations';
import { addIcons } from 'ionicons';
import { arrowBackOutline, arrowForwardOutline, checkmarkCircleOutline } from 'ionicons/icons';

const stepAnimation = trigger('stepAnimation', [
  // Transition khi bước tăng (đi tới)
  transition(':increment', [
    style({ position: 'relative' }), // Cần thiết cho container
    query(':enter, :leave', [
      style({
        position: 'absolute', // Để các bước chồng lên nhau trong quá trình chuyển đổi
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }), // optional: true nếu ban đầu không có :leave

    query(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }) // Bước mới vào từ bên phải
    ], { optional: true }),

    group([ // Chạy animation :leave và :enter cùng lúc
      query(':leave', [
        animate('400ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })) // Bước cũ trượt ra bên trái
      ], { optional: true }),
      query(':enter', [
        animate('400ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 })) // Bước mới trượt vào vị trí
      ], { optional: true }),
    ]),
  ]),

  // Transition khi bước giảm (đi lùi)
  transition(':decrement', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0, // Thay left thành right để căn lề đúng khi trượt từ trái qua
        width: '100%'
      })
    ], { optional: true }),

    query(':enter', [
      style({ transform: 'translateX(-100%)', opacity: 0 }) // Bước mới vào từ bên trái
    ], { optional: true }),

    group([
      query(':leave', [
        animate('400ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 })) // Bước cũ trượt ra bên phải
      ], { optional: true }),
      query(':enter', [
        animate('400ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 })) // Bước mới trượt vào vị trí
      ], { optional: true }),
    ]),
  ])
]);

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonFooter,
    IonRadioGroup,
    IonList,
    IonInput,
    IonLabel,
    IonItem,
    IonProgressBar,
    IonContent,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonTitle,
    FormsModule,
    CommonModule,
  ],
  animations: [ stepAnimation ]
})
export class NewPetComponent implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 6;
  progressValue: number = 0;

  formData: any = {
    name: '',
    type: '',
    breed: '',
    gender: '',
    birthday: '',
    weight: '',
    reproductive: '',
    allergies: '',
    photo: '',
  };

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'arrow-forward-outline': arrowForwardOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
    });
  }

  ngOnInit() {
    this.updateProgress();
  }

  updateProgress() {
    this.progressValue = (this.currentStep / this.totalSteps);
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateProgress();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
    }
  }

  async createPet() {
    console.log('Creating item with data:', this.formData);
    await this.presentAlert('Success', 'Item would be created here!');
    this.navCtrl.navigateBack('/home');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'Step 1: Basic Info';
      case 2: return 'Step 2: Details';
      case 3: return 'Step 3: Options';
      case 4: return 'Step 4: Date';
      case 5: return 'Step 5: Notes';
      case 6: return 'Step 6: Confirm & Create';
      default: return 'Add New Item';
    }
  }
}
