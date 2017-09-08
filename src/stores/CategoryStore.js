import {observable, action, reaction} from 'mobx';

import AccountService from '../service/Account';

class CategoryStore {

    @observable title = '';
    // 'success' 'warning' 'error' 'validating'
    @observable validateStatus = '';

    @action setToken = (token) => {
        this.token = token
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    @action async validateTitle (title) {
        this.validateStatus = 'validating';
        await this.sleep(2000);
        this.validateStatus = 'error';
    }

    @action async save (postForm) {
        this.isLoading = true;
        const response = await AccountService.login(postForm);
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

export default new CategoryStore();