import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { Form, Input, Button, Spin, message, Icon, Checkbox } from 'antd';
import {Link, withRouter} from 'react-router-dom'

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

    fireLogin = (formData) => {
        this.props.user.login(formData)
            .then(result => {
                if(!result.status){
                    message.error(result.msg);
                    this.props.form.resetFields();
                }else {
                    message.success('Login success, will redirect to homepage...');
                    setTimeout(() => {this.props.history.replace('/')}, 2000)
                }
            })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.fireLogin(this.props.form.getFieldsValue())
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
                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username or Email" />
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
                                    <Checkbox>Remember me</Checkbox>
                                )}
                                <a className="login-form-forgot" href="">Forgot password</a>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                Or <Link to='/register'>Register</Link>
                            </FormItem>
                        </Form>
                    </div>
                </Spin>
            </div>
        );
    }
}

const Login = Form.create()(RegistrationForm);

export default Login;
