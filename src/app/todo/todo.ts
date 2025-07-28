import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  category: string;
}

@Component({
  selector: 'app-todo',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  todoTask: string = '';
  selectedCategory: string = 'personal';
  selectedPriority: 'low' | 'medium' | 'high' = 'medium';
  searchTerm: string = '';
  activeFilter: string = 'all';

  task: TodoItem[] = [
    {
      id: 1,
      task: 'Create your first amazing task',
      completed: false,
      priority: 'medium',
      createdAt: new Date(),
      category: 'personal',
    },
  ];

  filters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
    { key: 'high', label: 'High Priority' },
  ];

  private nextId = 2;

  handleSubmit() {
    if (this.todoTask && this.todoTask.trim() !== '') {
      this.task.push({
        id: this.nextId++,
        task: this.todoTask.trim(),
        completed: false,
        priority: this.selectedPriority,
        createdAt: new Date(),
        category: this.selectedCategory,
      });

      this.todoTask = '';
    }
  }

  deleteTask(taskId: number) {
    this.task = this.task.filter((task) => task.id !== taskId);
  }

  toggleComplete(taskId: number) {
    const task = this.task.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  setActiveFilter(filter: string) {
    this.activeFilter = filter;
  }

  getFilteredTasks(): TodoItem[] {
    let filtered = this.task;

    if (this.searchTerm) {
      filtered = filtered.filter((task) =>
        task.task.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    }

    switch (this.activeFilter) {
      case 'pending':
        return filtered.filter((task) => !task.completed);
      case 'completed':
        return filtered.filter((task) => task.completed);
      case 'high':
        return filtered.filter((task) => task.priority === 'high');
      default:
        return filtered;
    }
  }

  getTotalTasks(): number {
    return this.task.length;
  }

  getCompletedTasks(): number {
    return this.task.filter((task) => task.completed).length;
  }

  getPendingTasks(): number {
    return this.task.filter((task) => !task.completed).length;
  }
  trackByFn(index: number, item: TodoItem): number {
    return item.id;
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      work: '🏢',
      personal: '👤',
      shopping: '🛒',
      health: '💪',
      study: '📚',
    };
    return icons[category] || '📝';
  }

  getPriorityIcon(priority: string): string {
    const icons: { [key: string]: string } = {
      high: '🔴',
      medium: '🟡',
      low: '🟢',
    };
    return icons[priority] || '🟡';
  }
}
