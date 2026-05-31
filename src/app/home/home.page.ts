import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList, IonText } from '@ionic/angular/standalone';
import { Task } from '../models/task.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, FormsModule, IonList, IonText],
})
export class HomePage {

  newTaskStr: string = '';
  errorMessage: string | null = null;
  


  //Arreglo de tareas
  tasks: Task[] = [
    {
      id:1,
      title:'Configuración de Ionic',
      description:'Instalar Node.js, AngularCli, IonicCli',
      finished:true,
      priority:'high'
    },
    {
      id: 2,
      title: 'Crear app tasklist',
      description: 'Crear el proyecto iniciacial de task list',
      finished: false,
      priority: 'high'
    }
  ];

  constructor() {
    console.log(this.tasks);
  }

  private isDuplicateTitle(title: string): boolean {
    const t = title.trim();
    return this.tasks.some(task => task.title.trim() === t);
  }

  isValidTitle(): boolean {
    const t = this.newTaskStr?.trim() ?? '';
    return t.length > 0 && !this.isDuplicateTitle(t);
  }

  addTask() {
    const trimmed = this.newTaskStr?.trim() ?? '';
    if (!trimmed) {
      this.errorMessage = 'El título no puede estar vacío.';
      return;
    }

    if (this.isDuplicateTitle(trimmed)) {
      this.errorMessage = 'Ya existe una tarea con ese título.';
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: trimmed,
      description: '',
      finished: false,
      priority: 'medium'
    };
    this.tasks.push(newTask);
    this.newTaskStr = ''; // Limpiar el input después de agregar la tarea
    this.errorMessage = null;
    console.log(this.tasks);
  }
}

