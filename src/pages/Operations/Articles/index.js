import React, { Component } from 'react';
import DataList from './DataList';
import Detail from './Detail';
import ToolBar from './ToolBar';

import { Card, Row, Col } from 'antd';

class Articles extends Component {
    render() {
        return (
            <div>
                <ToolBar/>
                <Row>
                    <Col lg={16} xl={17} xxl={18}>
                        <DataList />
                    </Col>
                    <Col lg={8} xl={7} xxl={6}>
                        <Detail/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Articles;
