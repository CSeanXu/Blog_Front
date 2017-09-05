import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { Form, Input, Button, Spin, message } from 'antd';
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
                    message.error('Network error...')
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
                this.fireLogin(values)
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

        const formItemLayout = {
            labelCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 6, offset: 3 },
                md: { span: 6, offset: 3 },
                lg: { span: 6, offset: 3 },
                xl: { span: 6, offset: 3 },
            },
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 6 },
                md: { span: 6 },
                lg: { span: 6 },
                xl: { span: 6},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: { span: 6, offset: 9 },
                md: { span: 6, offset: 9 },
                lg: { span: 6, offset: 9 },
                xl: { span: 6, offset: 9 },
            },
        };

        return (
            <Spin spinning={isLoading}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                        hasFeedback
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        // {...formItemLayout}
                        label="Password"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Login</Button>
                    </FormItem>
                    <Link to="/login">to login</Link>
                </Form>
            </Spin>
        );
    }
}

const Login = Form.create()(RegistrationForm);

export default Login;
