import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface Pet {
  id: number;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
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

  selectedPet: Pet | null = null; // Initialize based on your default view

  // Variable to track the active segment tab
  selectedSegment: string = 'profile'; // Default tab

  constructor() { }

  ngOnInit() {
    // Set initial selected pet based on the image (Lucky seems selected initially)
    // Find Lucky in the array, or set to the first pet, or keep as null if 'ALL PETS' is default
    const initialPet = this.pets.find(p => p.name === 'Lucky');
    this.selectedPet = initialPet ? initialPet : (this.pets.length > 0 ? this.pets[0] : null);

    // If Mina is selected instead based on the blue border
    // const initialPet = this.pets.find(p => p.name === 'Mina');
    // this.selectedPet = initialPet ? initialPet : (this.pets.length > 0 ? this.pets[0] : null);
  }

  // Function called when a pet avatar is clicked
  selectPet(pet: Pet | null) {
    console.log('Selected Pet:', pet);
    this.selectedPet = pet;
    // Add logic here to reload content based on the selected pet
  }

  // Function called when the segment tab changes
  segmentChanged(event: any) {
    console.log('Segment changed to:', event.detail.value);
    this.selectedSegment = event.detail.value;
    // Add logic here to display content relevant to the selected tab
  }
}
