import { EventEmitter } from "events";
import Dispatcher from "../AppDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _authors = [];

class AuthorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAuthors() {
    return _authors;
  }

  getCourseById(id) {
    return _authors.find((author) => {
      return author.id === parseInt(id, 10);
    });
  }
}

const store = new AuthorStore();
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      store.emitChange();
      break;

    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      store.emitChange();
      break;

    case actionTypes.UPDATE_AUTHOR:
      _authors = _authors.map((author) =>
        author.id === action.author.id ? action.author : author
      );
      store.emitChange();
      break;
    case actionTypes.DELETE_AUTHOR:
      _authors = _authors.filter(
        (author) => author.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    default:
    // nothing
  }
});

export default store;
