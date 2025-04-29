import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular";

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PetsPage {}
