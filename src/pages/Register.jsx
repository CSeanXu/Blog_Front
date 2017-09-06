import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { Form, Input, Checkbox, Button, Icon, Spin, message } from 'antd';
import {Link, withRouter} from 'react-router-dom'

import './Register.css';

const FormItem = Form.Item;


@inject('user')
@withRouter
@observer
class RegistrationForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        }
    }

    fireRegister = (formData) => {
        this.props.user.register(formData)
            .then(result => {
                if(!result.status){
                    message.error(result.msg);
                    this.props.form.resetFields();
                }else {
                    message.success('Register success, will redirect to login page...');
                    setTimeout(() => {this.props.history.replace('/login')}, 2000)
                }
            })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.fireRegister(this.props.form.getFieldsValue())
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {isLoading} = this.props.user;

        return (
            <div className="form-parent">
                <Spin spinning={isLoading}>
                    <div id="components-form-demo-normal-login">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    }, {
                                        required: true, message: 'Please input your E-mail!',
                                    }],
                                })(
                                    <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('agreed', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                                )}
                                <a className="login-form-forgot" href="">Forgot password</a>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Register
                                </Button>
                                Or <Link to='/login'>Login</Link>
                            </FormItem>
                        </Form>
                    </div>
                </Spin>
            </div>
        );
    }
}

const Register = Form.create()(RegistrationForm);

export default Register;
