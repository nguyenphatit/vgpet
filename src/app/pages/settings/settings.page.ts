import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsPage {}
