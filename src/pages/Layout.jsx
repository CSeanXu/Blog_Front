import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {inject, observer} from 'mobx-react';

import { Layout, Menu, Breadcrumb, Spin } from 'antd';
import HeadImage from '../components/Avatar';

import './Layout.css';

const { Header, Content, Footer } = Layout;


@inject('user')
@observer
class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentWillMount = () => {
        this.someFetch();
        // this.props.contacts.all.slice().map(info => console.log(info.id))
    };

    someFetch = () => {
        setTimeout(function () {
            this.setState({isLoading: false})
        }.bind(this), 3000);
    };

    changeLoading = () => {
            this.setState({isLoading: !this.state.isLoading})
    };

    render() {
        return (
            <Layout>
                <Header style={{ position: 'fixed', width: '100%' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/">Archive</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="register">Register</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="dashboard">Admin</Link></Menu.Item>
                        <HeadImage/>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    {(() => {
                        if (this.state.isLoading){
                            return <Spin/>
                        }else {
                            return <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
                        }
                    })()}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                    <button onClick={this.changeLoading.bind(this)}>fetch</button>
                </Footer>
            </Layout>
        );
    }
}

export default Main;