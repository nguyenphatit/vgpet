import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertController} from '@ionic/angular';
import {NavController} from '@ionic/angular';
import {
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonTitle,
  IonContent,
  IonProgressBar,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonRadioGroup,
  IonRadio,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol, IonTextarea, IonSelect, IonSelectOption,
} from "@ionic/angular/standalone";
import {FormsModule} from '@angular/forms';
import {trigger, transition, style, query, group, animate} from '@angular/animations';
import {addIcons} from 'ionicons';
import {
  arrowBackOutline,
  arrowForwardOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  closeOutline, femaleOutline, helpOutline, maleOutline,
  searchOutline
} from 'ionicons/icons';
import {CreatePetType, PetType} from '../../types/pet-type.type';
import {BREEDS, PET_TYPES} from '../../common/initial-pet';

const stepAnimation = trigger('stepAnimation', [
  // Transition khi bước tăng (đi tới)
  transition(':increment', [
    style({position: 'relative'}), // Cần thiết cho container
    query(':enter, :leave', [
      style({
        position: 'absolute', // Để các bước chồng lên nhau trong quá trình chuyển đổi
        top: 0,
        left: 0,
        width: '100%'
      })
    ], {optional: true}), // optional: true nếu ban đầu không có :leave

    query(':enter', [
      style({transform: 'translateX(100%)', opacity: 0}) // Bước mới vào từ bên phải
    ], {optional: true}),

    group([ // Chạy animation :leave và :enter cùng lúc
      query(':leave', [
        animate('400ms ease-out', style({transform: 'translateX(-100%)', opacity: 0})) // Bước cũ trượt ra bên trái
      ], {optional: true}),
      query(':enter', [
        animate('400ms ease-out', style({transform: 'translateX(0%)', opacity: 1})) // Bước mới trượt vào vị trí
      ], {optional: true}),
    ]),
  ]),

  // Transition khi bước giảm (đi lùi)
  transition(':decrement', [
    style({position: 'relative'}),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0, // Thay left thành right để căn lề đúng khi trượt từ trái qua
        width: '100%'
      })
    ], {optional: true}),

    query(':enter', [
      style({transform: 'translateX(-100%)', opacity: 0}) // Bước mới vào từ bên trái
    ], {optional: true}),

    group([
      query(':leave', [
        animate('400ms ease-out', style({transform: 'translateX(100%)', opacity: 0})) // Bước cũ trượt ra bên phải
      ], {optional: true}),
      query(':enter', [
        animate('400ms ease-out', style({transform: 'translateX(0%)', opacity: 1})) // Bước mới trượt vào vị trí
      ], {optional: true}),
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
    IonRadioGroup,
    IonRadio,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
  ],
  animations: [stepAnimation]
})
export class NewPetComponent implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 6;
  progressValue: number = 0;
  filteredBreeds: string[] = [];
  searchTerm: string = '';
  birthInputMode: 'birthdate' | 'age' = 'age';
  ageYears: number | null = 2;
  ageMonths: number | null = 6;
  ageDays: number | null = 0;
  reproductiveStatusOptions: string[] = ['Unknown', 'Intact', 'Neutered', 'Spayed'];
  @Output() selectionChange = new EventEmitter<string | null>();

  formData: CreatePetType = {
    name: '',
    type: '',
    breed: [],
    gender: '',
    birthdate: new Date().toISOString(),
    weight: 0,
    reproductive: '',
    allergies: '',
    photo: '',
  };

  petOptions: PetType[] = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
  ) {
    addIcons({
      arrowBackOutline,
      arrowForwardOutline,
      checkmarkCircleOutline,
      checkmarkOutline,
      closeOutline,
      searchOutline,
      maleOutline,
      femaleOutline,
      helpOutline,
    });

    this.petOptions = PET_TYPES;
  }

  ngOnInit() {
    this.filteredBreeds = [...BREEDS].sort();
    this.updateProgress();
    this.updateFormDataOnStateChange();
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

  handleChangePetType(pet: PetType) {
    this.formData.type = pet.value;
  }

  handleSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchTerm = query;
    this.filteredBreeds = BREEDS.filter(breed =>
      breed.toLowerCase().includes(query)
    ).sort();
  }

  toggleBreedSelection(breed: string) {
    const index = this.formData.breed.indexOf(breed);
    if (index > -1) {
      this.formData.breed.splice(index, 1);
    } else {
      this.formData.breed.push(breed);
    }
    this.formData.breed.sort();
  }

  deselectBreed(breedToRemove: string) {
    this.formData.breed = this.formData.breed.filter(breed => breed !== breedToRemove);
  }

  isSelected(breed: string): boolean {
    return this.formData.breed.includes(breed);
  }

  get selectedBreedsCountText(): string {
    const count = this.formData.breed.length;
    if (count === 0) {
      return 'No breeds selected';
    }
    return `${count} breed${count !== 1 ? 's' : ''} selected:`;
  }

  selectGender(gender: string) {
    this.formData.gender = gender;
  }

  updateFormDataOnStateChange() {
    if (this.birthInputMode === 'age') {
      this.formData.birthdate = this.calculateBirthdateFromAge();
    } else {
      // If switching to 'birthdate' mode and formData.birthdate is null
      // (e.g., initial load in 'birthdate' mode or cleared previously),
      // set it to today. Otherwise, it retains its previous value.
      if (!this.formData.birthdate) {
        this.formData.birthdate = this.formatDateToYYYYMMDD(new Date());
      }
    }
    // Log formData to see changes (for debugging)
    console.log('formData updated:', JSON.parse(JSON.stringify(this.formData)));
  }

  calculateBirthdateFromAge(): string {
    // If all age fields are null, perhaps return null or today's date
    if (this.ageYears === null && this.ageMonths === null && this.ageDays === null) {
      return this.formatDateToYYYYMMDD(new Date()); // Default to today if no age specified
    }

    const today = new Date();
    const years = this.ageYears ?? 0;
    const months = this.ageMonths ?? 0;
    const days = this.ageDays ?? 0;

    const birthDate = new Date(
      today.getFullYear() - years,
      today.getMonth() - months,
      today.getDate() - days
    );
    return this.formatDateToYYYYMMDD(birthDate);
  }

  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Handle changes in numeric inputs for age, ensuring non-negative values
  handleAgeValueChange(field: 'ageYears' | 'ageMonths' | 'ageDays') {
    let value = (this as any)[field] as number | null;

    if (value !== null && isNaN(value)) {
      (this as any)[field] = 0; // Reset if NaN
      value = 0;
    }

    if (value !== null && value < 0) {
      (this as any)[field] = 0;
    }

    // Optional: Max values (though HTML max attribute is often better)
    if (field === 'ageMonths' && value !== null && value > 11) (this as any)[field] = 11;
    if (field === 'ageDays' && value !== null && value > 30) (this as any)[field] = 30; // Simplified max days

    this.updateFormDataOnStateChange();
  }

  // Ensure weight is non-negative
  handleWeightChange() {
    if (this.formData.weight !== null && (isNaN(this.formData.weight) || this.formData.weight < 0)) {
      this.formData.weight = 0;
    }
    this.updateFormDataOnStateChange(); // Also log formData when weight changes
  }

  disableCreateButton() {
    switch (this.currentStep) {
      case 1:
        return !this.formData.name;
      case 2:
        return !this.formData.type;
      case 3:
        return !this.formData.breed.length;
      case 4:
        return !this.formData.gender;
      default:
        return false;
    }
  }
}
