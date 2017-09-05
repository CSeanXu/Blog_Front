import React, { Component } from 'react';

import { Avatar, Badge } from 'antd';

class HeadImage extends Component {
    render() {
        return (
            <div>
                <span style={{ marginRight: 24 }}>
                    <Badge count={1}><Avatar shape="square" icon="user" /></Badge>
                </span>
                <span>
                    <Badge dot><Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>
                </span>
            </div>
        );
    }
}

export default HeadImage;