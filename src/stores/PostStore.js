import {observable, action, reaction} from 'mobx';

import AccountService from '../service/Account';

class PostStore {

    @observable title = '';
    // 'success' 'warning' 'error' 'validating'
    @observable validateTitleStatus = '';
    @observable validateSlugStatus = '';

    @action setTitle = (title) => {
        this.title = title
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    @action async validateTitle (title) {
        this.validateTitleStatus = 'validating';
        await this.sleep(2000);
        this.validateTitleStatus = 'warning';
    }

    @action async validateSlug (slug) {
        this.validateSlugStatus = 'validating';
        await this.sleep(1000);
        this.validateSlugStatus = 'success';
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
}

export default new PostStore();