import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import { Input, Select, Switch, Icon, Button, Row, Col, Form } from 'antd';

const FormItem = Form.Item;

const { TextArea } = Input;
const Option = Select.Option;

@inject('post')
@observer
class AddPosts extends Component{

    constructor(){
        super();
        this.state = {
            categorySelect: [],
            inline: 'inline'
        }
    }

    componentWillMount(){
        const newSelect = [];
        const response = [
            {id: 0, name: 'Python'},
            {id: 1, name: 'Learn'},
            {id: 2, name: 'Life'},
        ];
        for (let i = 0; i < response.length; i++) {
            newSelect.push(<Option key={response[i].id}>{response[i].name}</Option>);
        }
        this.setState({categorySelect: newSelect});
    }

    handleChange(value){
        console.log(`selected ${value}`)
    }

    checkTitle = (rule, value, callback) => {
        this.props.post.validateTitle(value)
    };

    checkSlug = (rule, value, callback) => {
        this.props.post.validateSlug(value)
    };

    fireSave = (formData) => {
        console.log(formData)
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.fireSave(this.props.form.getFieldsValue())
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const {validateSlugStatus, validateTitleStatus} = this.props.post;
        return (
            <div>
                <Form layout={this.state.inline} onSubmit={this.handleSubmit}>
                    <FormItem hasFeedback validateStatus={validateTitleStatus}>
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    validator: this.checkTitle
                                }
                            ]
                        })(
                            <Input placeholder="Title"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Switch checkedChildren={<span><Icon type="unlock" />&nbsp;Pub</span>} unCheckedChildren={<span><Icon type="lock" />&nbsp;Dra</span>} defaultChecked={true} />
                    </FormItem>
                    <FormItem hasFeedback validateStatus={validateSlugStatus}>
                        {getFieldDecorator('slug', {
                            rules: [
                                {
                                    validator: this.checkSlug
                                }
                            ]
                        })(
                            <Input placeholder="Slug"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Save
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const WrappedPostAddForm = Form.create()(AddPosts);
export default WrappedPostAddForm;