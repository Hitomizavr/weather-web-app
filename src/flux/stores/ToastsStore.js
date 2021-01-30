import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import AppConstants from '../AppConstants';

// Эти две переменные - хранилище
let id = 0; // Тут хранится уникальный идентификатор последнего уведомления
let _toasts = []; // А в этом массиве будут лежать все уведомления

const ToastsStore = Object.assign({}, EventEmitter.prototype, {
  // Метод получения массива уведомлений
  getToasts() {
    return _toasts;
  },

  // Реализация события (пока можно не вдаваться в это)
  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
});

// Обработка события
AppDispatcher.register(function(action) {
  switch(action.type) {
    case AppConstants.TOAST_CREATE: {
      // Тут мы реализуем логику того, каким образом
      // будут присваиваться id различным уведомлениям
      if (_toasts.length === 0) {
        id = 0;
      }

      action.toast.id = id; // Присваиваем id
      _toasts.push(action.toast); // Кладём уведомление (вместе с id) в хранилище
      id++;

      // Отправляем событие в компонент
      ToastsStore.emitChange();
      break;
    }

    default: {}
  }
});

export default ToastsStore;