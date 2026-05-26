import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

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

  
}
