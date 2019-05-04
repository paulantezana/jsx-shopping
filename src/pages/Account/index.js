import React, { Fragment } from 'react';
import { Tabs, Card, Row, Col, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import BaseView from './BaseView';
import SecurityView from './SecurityView';
import AvatarView from './AvatarView';

const TabPane = Tabs.TabPane;

class Profile extends React.Component {
    render() {
        return (
            <PageHeaderWrapper title="Perfil">
                <Card bordered={false}>
                    <Row gutter={32}>
                        <Col xs={22} sm={22} md={11} lg={10} xl={8}>
                            <strong>Perfil</strong>
                            <p>Su dirección de correo electrónico es su identidad en el sitio web se utiliza para iniciar sesión.</p>
                        </Col>
                        <Col xs={22} sm={22} md={11} lg={10} xl={10}>
                            <BaseView />
                        </Col>
                    </Row>
                    <Divider/>
                    <Row gutter={32}>
                        <Col xs={22} sm={22} md={11} lg={10} xl={8}>
                            <strong>Password</strong>
                            <p>Cambiar tu contraseña.</p>
                        </Col>
                        <Col xs={22} sm={22} md={11} lg={10} xl={10}>
                            <SecurityView />
                        </Col>
                    </Row>
                    <Divider/>
                    <Row gutter={32}>
                        <Col xs={22} sm={22} md={11} lg={10} xl={8}>
                            <strong>Avatar</strong>
                            <p>Cambiar foto de perfil.</p>
                        </Col>
                        <Col xs={22} sm={22} md={11} lg={10} xl={10}>
                            <AvatarView />
                        </Col>
                    </Row>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default Profile;
