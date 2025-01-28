import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Aviso } from '../models/avisos.model';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  private readonly STORAGE_KEY = 'avisos';

  constructor() { }

  async obtenerAvisos(): Promise<Aviso[]> {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    if (!value) return [];
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }

  async agregarAviso(aviso: Aviso): Promise<void> {
    const avisos = await this.obtenerAvisos();
    avisos.push(aviso);
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(avisos)
    });
  }

  async eliminarAviso(id: number): Promise<void> {
    const avisos = await this.obtenerAvisos();
    const avisosActualizados = avisos.filter(aviso => aviso.id !== id);
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(avisosActualizados)
    });
  }
}



