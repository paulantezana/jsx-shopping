import React from 'react';
import { Card, Avatar, Divider, Row, Col, Icon, Tag } from 'antd';
import logoApp from '@/assets/logo.svg';
import { app } from '@/setting';
import styles from './index.less';

class AppInfo extends React.Component{
    render(){
        return(
            <Card bordered={false}>
                <div className={styles.container}>
                    <Avatar src={logoApp} size={90} />
                    <h1 className={styles.title}>{app.name}</h1>
                    <div className={styles.desc}>{app.description}</div>
                    <div>
                        <h2>{app.version}</h2>
                        <div>Licencia: <Tag color="red" >Esta es una versión de evaluación</Tag> </div>
                    </div>
                    <Divider/>
                    <Row gutter={64}>
                        <Col md={8}>
                            <a href={`${app.uri}/documentacion`} target="_blanck" >
                                <Icon type="book" theme="filled" style={{fontSize: '32px'}}/>
                                <div>Documentación</div>
                            </a>
                        </Col>
                        <Col md={8}>
                            <a href={`${app.uri}/tutorial`} target="_blanck" >
                                <Icon type="youtube" theme="filled" style={{fontSize: '32px'}} />
                                <div>Cursos</div>
                            </a>
                        </Col>
                        <Col md={8}>
                            <a href={`${app.uri}/soporte`} target="_blanck" >
                                <Icon type="alert"  theme="filled" style={{fontSize: '32px'}}/>
                                <div>Soporte</div>
                            </a>
                        </Col>
                    </Row>
                    <Divider/>
                    <h3>Nuestras redes sociales</h3>
                    <Row gutter={24}>
                        <Col sm={8}>
                            <a href={app.facebook} target="_blanck" style={{color: '#3B5998'}}>
                                <Icon type="facebook" style={{fontSize: '24px'}}/>
                            </a>
                        </Col>
                        <Col sm={8}>
                            <a href={app.youtube} target="_blanck" style={{color: '#FF3624'}}>
                                <Icon type="youtube" style={{fontSize: '24px'}} />
                            </a>
                        </Col>
                        <Col sm={8}>
                            <a href={app.twitter} target="_blanck" style={{color: '#00B0E8'}}>
                                <Icon type="twitter" style={{fontSize: '24px'}}/>
                            </a>
                        </Col>
                    </Row>
                </div>
            </Card>
        )
    }
}

export default AppInfo;
