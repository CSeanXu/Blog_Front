import {observable, action, reaction} from 'mobx';

import AccountService from '../service/Account';

class UserStore {

    @observable username = '';
    @observable isLoading = false;

    @observable token = window.sessionStorage.getItem('token');

    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.sessionStorage.setItem('token', token);
                } else {
                    window.sessionStorage.removeItem('token');
                }
            }
        );
    }

    @action setToken = (token) => {
        this.token = token
    };

    @action async login (loginForm) {
        this.isLoading = true;
        const response = await AccountService.login(loginForm);
        if (response.ok){
            const json = await response.json();
            this.setToken(json.token);
            this.isLoading = false;
            return {status: true, msg: json.msg}
        }else if (response.status === 401){
            const json = await response.json();
            this.isLoading = false;
            return {status: false, msg: json.non_field_errors[0]}
        }else {
            this.isLoading = false;
            return {status: false, msg: 'Network error...'}
        }
    }

    @action async register (registerForm) {
        this.isLoading = true;
        const response = await AccountService.register(registerForm);
        if (response.ok){
            const json = await response.json();
            this.isLoading = false;
            return {status: true, msg: json.msg}
        }else {
            this.isLoading = false;
            return {status: false}
        }
    }
}

export default new UserStore();