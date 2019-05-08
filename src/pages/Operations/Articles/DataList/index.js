import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Modal,
    Tooltip,
    Input,
    Icon,
    Dropdown,
    Button,
    Card,
    Avatar,
    Divider,
    Table,
    Menu,
} from 'antd';
import styles from './index.less';

import { service } from '@/setting';
import FormModal from './../FormModal';
const Search = Input.Search;

class DataList extends Component {
    state = {
        selectedRows: [],
        search: '',
    };

    componentDidMount() {
        this.onQueryPaginate();
    }

    onQueryPaginate = (param = {}) => {
        const { dispatch } = this.props;

        const params = {
            ...param,
            limit: param.limit,
        };

        dispatch({
            type: 'product/paginate',
            payload: params,
        });
    };

    onShowModal = (modalType, currentItem = {}) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'product/showModal',
            payload: { currentItem, modalType },
        });
        dispatch({
            type: 'category/treeSelect',
            payload: {
                parent: false,
            },
        });
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleSearch = e => {
        this.setState({
            search: e.target.value,
        });

        this.onQueryPaginate({
            search: e.target.value,
        });
    };

    handleStandardTableChange = (pagination, filters, sorter) => {
        const { formValues } = this.state;
        const params = {
            current_page: pagination.current,
            limit: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        this.onQueryPaginate(params);
    };

    onClickMenuDropdown = ({ key, record }) => {
        switch (key) {
            case 'delete':
                Modal.confirm({
                    title: '¿Estás seguro de eliminar este registro?',
                    content: record.description,
                    okType: 'danger',
                    onOk() {
                        onDelete({ id: record.id });
                    },
                });
                break;
            case 'edit':
                this.onShowModal('update', record);
                break;
            default:
                break;
        }
    };

    render() {
        const { product, company, loading } = this.props;
        const { data } = product;
        const { selectedRows } = this.state;

        const onDelete = param => {
            const { dispatch } = this.props;
            dispatch({
                type: 'product/delete',
                payload: param,
            });
        };

        const columns = [
            {
                title: 'Clave / Descripcion',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Existencia',
                // dataIndex: 'price',
                key: 'existence',
            },
            {
                title: 'Precio',
                // dataIndex: 'price',
                key: 'price',
            },
            {
                title: (
                    <Tooltip title="Tags seleccionados.">
                        <Icon type="tag" style={{ fontSize: '18px' }} />
                    </Tooltip>
                ),
                width: '32px',
                // dataIndex: 'tag',
                key: 'tag',
            },
            {
                title: (
                    <Tooltip title="Compatibles seleccionados.">
                        <Icon type="bulb" style={{ fontSize: '18px' }} />
                    </Tooltip>
                ),
                width: '32px',
                // dataIndex: 'alternative',
                key: 'alternative',
            },
            {
                title: (
                    <Tooltip title="Este articulo maneja varias presentaciones.">
                        <Icon type="branches" style={{ fontSize: '18px' }} />
                    </Tooltip>
                ),
                width: '32px',
                // dataIndex: 'presentation',
                key: 'presentation',
            },
            {
                title: (
                    <Tooltip title="Opciones">
                        <Icon type="sliders" style={{ fontSize: '18px' }} />
                    </Tooltip>
                ),
                key: 'accion',
                width: '50px',
                render: (a, record) => {
                    const menu = (
                        <Menu onClick={({ key }) => this.onClickMenuDropdown({ key, record })}>
                            <Menu.Item key="edit">
                                <Icon type="edit" /> Editar
                            </Menu.Item>
                            <Menu.Item key="adjust">
                                <Icon type="switcher" /> Ajustar
                            </Menu.Item>
                            <Menu.Item key="clone">
                                <Icon type="copy" /> Clonar
                            </Menu.Item>
                            <Menu.Item key="printer">
                                <Icon type="printer" /> Imprimir etiqueta
                            </Menu.Item>
                            <Menu.Item key="delete">
                                <Icon type="delete" /> Eliminar
                            </Menu.Item>
                        </Menu>
                    );
                    return (
                        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                            <Button icon="more" shape="circle" />
                        </Dropdown>
                    );
                },
            },
        ];

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...data.pagination,
        };

        return (
            <Card bordered={false}>
                <div className={styles.tableHeader}>
                    <Search
                        placeholder="Buscar articulo"
                        value={this.state.search}
                        onChange={this.handleSearch}
                        className={styles.search}
                    />
                    <Button icon="filter" className={styles.filter} />
                </div>
                <Table
                    loading={loading}
                    dataSource={data.list}
                    columns={columns}
                    pagination={paginationProps}
                    rowKey={record => record.id}
                    size="small"
                    onChange={this.handleStandardTableChange}
                    onRow={(record, rowIndex) => {
                        return {
                            onDoubleClick: event => this.onShowModal('update', record),
                        };
                    }}
                />
                <FormModal />
            </Card>
        );
    }
}

const mapStateToProps = ({ product, global, loading }) => ({
    product,
    company: global.company,
    loading: loading.effects['product/paginate'],
});

export default connect(mapStateToProps)(DataList);
