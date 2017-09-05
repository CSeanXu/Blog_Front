import {observable, action} from 'mobx';

class TodoStore {

    @observable isLoading = false;
    @observable todos = ['buy milk', 'buy eggs'];
    @observable filter = '';

    @action loadTodos = () => {
        this.isLoading = true;
    };
}

let store = window.store = new TodoStore();

export default store;
