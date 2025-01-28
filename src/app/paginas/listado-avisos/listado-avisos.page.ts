import { Component, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList,
  IonItem, 
  IonLabel, 
  IonButton,
  IonIcon,
  IonThumbnail,
  IonFab,
  IonFabButton,
  AlertController, IonButtons } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvisosService } from '../../servicios/avisos.service';
import { Aviso } from 'src/app/models/avisos.model';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline, cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-listado-avisos',
  templateUrl: './listado-avisos.page.html',
  styleUrls: ['./listado-avisos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonThumbnail,
    IonFab,
    IonFabButton
  ]
})
export class ListadoAvisosPage implements OnInit {
  avisos: Aviso[] = [];

  constructor(
    private avisosService: AvisosService,
    private alertController: AlertController
  ) {
    addIcons({cameraOutline,addOutline,trashOutline});
  }

  async ngOnInit() {
    await this.cargarAvisos();
  }

  async ionViewWillEnter() {
    await this.cargarAvisos();
  }

  async cargarAvisos() {
    this.avisos = await this.avisosService.obtenerAvisos();
  }

  async confirmarEliminacion(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este aviso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarAviso(id);
          }
        }
      ]
    });

    await alert.present();
  }

  private async eliminarAviso(id: number) {
    try {
      await this.avisosService.eliminarAviso(id);
      this.avisos = this.avisos.filter(aviso => aviso.id !== id);
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
    }
  }
}





