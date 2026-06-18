import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, listOutline, trashOutline } from 'ionicons/icons';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonList,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonReorder,
    IonReorderGroup,
  ],
})
export class HomePage {
  task = '';
  taskList: Task[] = [];

  private nextId = 1;
  private alertController = inject(AlertController);

  constructor() {
    addIcons({ addOutline, trashOutline, listOutline });
  }

  addTask(): void {
    const title = this.task.trim();

    if (!title) {
      void this.showAlert('Campo vacío', 'No puedes agregar una tarea sin texto.');
      return;
    }

    if (this.isDuplicate(title)) {
      void this.showAlert('Tarea duplicada', 'Esta tarea ya existe en tu lista (no distingue mayúsculas).');
      return;
    }

    this.taskList.push({ id: this.nextId++, title });
    this.task = '';
    void this.showAlert('Tarea agregada', 'La tarea ha sido agregada exitosamente.');
  }

  private isDuplicate(title: string): boolean {
    const normalized = title.toLowerCase();
    return this.taskList.some((task) => task.title.toLowerCase() === normalized);
  }

  handleReorder(event: CustomEvent<ItemReorderEventDetail>): void {
    this.taskList = event.detail.complete(this.taskList) as Task[];
  }

  async confirmDelete(task: Task, slidingItem: IonItemSliding): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar tarea',
      message: `¿Estás seguro de eliminar "${task.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => slidingItem.close(),
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.deleteTask(task.id),
        },
      ],
    });

    await alert.present();
  }

  private deleteTask(id: number): void {
    this.taskList = this.taskList.filter((task) => task.id !== id);
  }

  private async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
