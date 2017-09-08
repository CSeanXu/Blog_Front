import React from 'react';
import '../pages/Dashboard.css';
import util from '../service/utils';

import {Progress} from 'antd';


const DashboardContent = props => ({
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <Progress type="circle" percent={util.date2Percent(new Date().getDate())} format={percent => `${percent}`} />
                <Progress type="circle" percent={100} format={percent => `${percent} Done`} />
            </div>
        );
    }
});

export default DashboardContent;