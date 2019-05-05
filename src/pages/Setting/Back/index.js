import React from 'react';
import { connect } from 'dva';
import { Card, Icon, Divider, Button, Tag, Table, Modal } from 'antd';
import styles from './index.less';

import moment from 'moment';
import filesize from 'filesize';

class AppBack extends React.Component{
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type: 'system/backupDBList',
        });
    }

    onBackupDB = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'system/backupDB',
        });
    }

    onDownload = (file) => {
        Modal.confirm({
            title: "Para iniciar la descarga confirme su contraseña de usuario",
            content: file
        })
    }

    render(){
        const { backupDBList } = this.props.system;
        const columns = [{
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (a, record) => <span>📄 {a}</span> ,
          }, {
            title: 'Tamaño',
            dataIndex: 'size',
            key: 'size',
            render: (a, record) => <span>{filesize(a)}</span> ,
          }, {
          }, {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            render: (a, record) => moment(a).format('LLL'),
          }, {
            title: 'Accion',
            key: 'accion',
            width: '130px',
            render: (a, record) => (
                <Tag color="blue" onClick={() => this.onDownload(record.name)}>Descargar</Tag>
            )
        }];

        // cons

        return(
            <Card bordered={false}>
                <div className={styles.container}>
                    <Icon type="hdd" theme="twoTone" style={{fontSize: '120px'}} />
                    <h2 style={{marginTop: '32px'}}>Respaldos</h2>
                    <div>Último respaldo {
                        backupDBList.length === 0 ? (
                            <Tag color="red">Nunca</Tag>
                            ) : (
                            <Tag color="blue">{backupDBList[backupDBList.length - 1].date}</Tag>
                        )
                    } </div>
                    <Divider/>
                    <Button icon="database" onClick={this.onBackupDB}>Generar Respaldo Local</Button>
                    <Divider/>
                </div>
                <Table dataSource={backupDBList} rowKey={record => record.date} columns={columns} size="small"/>
            </Card>
        )
    }
}

const mapStateToProps = ({ system }) => ({
    system
})

export default connect(mapStateToProps)(AppBack);
