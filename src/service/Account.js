import formatForm from './formatForm';


const doRegister = (formData) => {
    return fetch('/api/v1/users/register/', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: formatForm(formData)
    })
};

const doLogin = (loginForm) => {
    return fetch('/api/v1/users/login/', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: formatForm(loginForm)
    })
};

const AccountService = {
    register: doRegister,
    login: doLogin
};

export default AccountService;