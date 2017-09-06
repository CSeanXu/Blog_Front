import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import DashboardContent from './DashboardContent';
import Message from './Message';
import MessageAdd from './MessageAdd';
import Posts from './Posts';
import PostsAdd from './PostsAdd';
import Tags from './Tags';
import TagsAdd from './TagsAdd';
import {Route} from 'react-router-dom';

import { Layout, Menu, Icon, Avatar, Badge } from 'antd';

import './Dashboard.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


@inject('user')
@observer
class Dashboard extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
        console.log(this.props)
    };

    render() {
        const header_style = { marginLeft: this.state.collapsed ? 64 : 200 };

        const {match} = this.props;

        return (
            <Layout className="dashboard-container">
                <Sider
                    style={{ height: '100vh', position: 'fixed', left: 0 }}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo">
                        <Badge dot><Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['sub1']}>

                        <Menu.Item key="0">
                            <Link to={`${match.url}`}>
                                <Icon type="bar-chart" /><span className="nav-text">Dashboard</span>
                            </Link>
                        </Menu.Item>

                        <SubMenu key="sub1" title={this.state.collapsed ? <span><Icon type="video-camera" /></span> : <span><Icon type="video-camera" />POSTS</span>}>
                            <Menu.Item key="1">
                                <Link to={`${match.url}/post_add`}>
                                    <Icon type="plus" /><span className="nav-text">New</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={`${match.url}/posts`}>
                                    <Icon type="folder" /><span className="nav-text">List</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" title={this.state.collapsed ? <span><Icon type="tags-o" /></span> : <span><Icon type="tags-o" />TAGS</span>}>
                            <Menu.Item key="3">
                                <Link to={`${match.url}/tag_add`}>
                                    <Icon type="plus" /><span className="nav-text">New</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to={`${match.url}/tags`}>
                                    <Icon type="folder" /><span className="nav-text">List</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub3" title={this.state.collapsed ? <span><Icon type="message" /></span> : <span><Icon type="message" />MESSAGES</span>}>
                            <Menu.Item key="5">
                                <Link to={`${match.url}/message_add`}>
                                    <Icon type="plus" /><span className="nav-text">New</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to={`${match.url}/messages`}>
                                    <Icon type="folder" /><span className="nav-text">List</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Layout style={header_style}>
                    <Header style={{ position: 'fixed', width: '100%', background: '#7f0000', padding: 0 }}>
                        <Badge dot><Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>
                    </Header>
                    <Content style={{ margin: '100px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            <Route exact path={match.url} component={DashboardContent}/>
                            <Route path={`${match.url}/posts`} component={Posts}/>
                            <Route path={`${match.url}/post_add`} component={PostsAdd}/>
                            <Route path={`${match.url}/tags`} component={Tags}/>
                            <Route path={`${match.url}/tag_add`} component={TagsAdd}/>
                            <Route path={`${match.url}/message_add`} component={MessageAdd}/>
                            <Route path={`${match.url}/messages`} component={Message}/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Dashboard;