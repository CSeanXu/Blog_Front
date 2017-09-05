import React, { Component } from 'react';
import { message, Button } from 'antd';

const info = () => {
    message.info('This is a normal message');
};

export default class Notification extends Component {
    render() {
        return (
            <div>
                <Button type="primary" onClick={info}>Display normal message</Button>
            </div>
        );
    }
};