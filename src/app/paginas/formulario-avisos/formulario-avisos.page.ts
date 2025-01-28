import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AvisosService } from '../../servicios/avisos.service';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonTextarea, 
  IonBackButton, 
  IonButtons, 
  IonText, 
  IonIcon 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Aviso } from 'src/app/models/avisos.model';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-avisos',
  standalone: true,
  templateUrl: './formulario-avisos.page.html',
  styleUrls: ['./formulario-avisos.page.scss'],
  imports: [
    IonButtons, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton, 
    IonTextarea, 
    IonBackButton, 
    IonText, 
    IonIcon, 
    FormsModule, 
    CommonModule, 
    ReactiveFormsModule
  ]
})
export class FormularioAvisosPage {
  form: FormGroup;
  imagen: string | null = null;

  constructor(
    private fb: FormBuilder,
    private avisosService: AvisosService,
    private router: Router
  ) {
    addIcons({ cameraOutline });
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  async capturarFoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90,
        allowEditing: false,
        saveToGallery: false,
        correctOrientation: true,
        promptLabelHeader: 'Tomar foto',
        promptLabelCancel: 'Cancelar',
        promptLabelPhoto: 'Tomar foto'
      });
      
      this.imagen = image.dataUrl || null;
    } catch (error) {
      console.error('Error al capturar foto:', error);
    }
  }

  async guardarAviso() {
    if (this.form.valid) {
      const nuevoAviso: Aviso = {
        id: Date.now(),
        titulo: this.form.value.titulo,
        descripcion: this.form.value.descripcion,
        imagen: this.imagen,
        fecha: new Date().toISOString(),
      };

      await this.avisosService.agregarAviso(nuevoAviso);
      this.form.reset();
      this.imagen = null;
      this.router.navigate(['/listado-avisos']);
    }
  }
}
