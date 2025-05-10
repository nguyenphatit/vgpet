import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule} from '@angular/forms';

interface Pet {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  pets: Pet[] = [
    { id: 1, name: 'Lucky', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' }, // Replace with actual image path
    { id: 2, name: 'Mina', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' },   // Replace with actual image path
    { id: 3, name: 'Den', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' },     // Replace with actual image path
    { id: 4, name: 'Vang', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' },     // Replace with actual image path
    { id: 5, name: 'Trang', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' },     // Replace with actual image path
    { id: 6, name: 'Phen', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' },     // Replace with actual image path
    { id: 7, name: 'Bi', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' },     // Replace with actual image path
    { id: 8, name: 'Bo', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' },     // Replace with actual image path
    { id: 9, name: 'Po', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' },     // Replace with actual image path
    { id: 10, name: 'Pi', imageUrl: 'https://i.pinimg.com/736x/26/82/bf/2682bf05bc23c0b6a1145ab9c966374b.jpg' },     // Replace with actual image path
    // Add more pets as needed
  ];

  selectedPets: Pet[] = [];
  selectedSegment: string = 'profile';

  constructor() { }

  ngOnInit() {

  }

  selectPet(pet: Pet) {
    const index = this.selectedPets.findIndex(selectedPet => selectedPet.id === pet.id);

    if (index > -1) {
      this.selectedPets.splice(index, 1);
    } else {
      this.selectedPets.push(pet);
    }
    console.log('Selected Pets:', this.selectedPets);
  }

  isSelected(pet: Pet): boolean {
    return this.selectedPets.some(selectedPet => selectedPet.id === pet.id);
  }

  segmentChanged(event: any) {
    console.log('Segment changed to:', event.detail.value);
    this.selectedSegment = event.detail.value;
  }
}
