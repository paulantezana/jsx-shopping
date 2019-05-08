import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Modal, Tooltip, Input, Icon, Menu, Dropdown, Button, Card, Switch, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';

import FormModal from './FormModal';

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
            type: 'unitMeasure/paginate',
            payload: params,
        });
    };

    onShowModal = (modalType, currentItem = {}) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'unitMeasure/showModal',
            payload: { currentItem, modalType },
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

    handleMenuClick = e => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;

        if (!selectedRows) return;
        switch (e.key) {
            case 'remove':
                console.log(selectedRows.map(row => row.id));
                // dispatch({
                //     type: 'user/delete',
                //     payload: {
                //         ids: selectedRows.map(row => row.key),
                //     },
                //     callback: () => {
                //         this.setState({
                //             selectedRows: [],
                //         });
                //     },
                // });
                break;
            default:
                break;
        }
    };

    render() {
        const { unitMeasure, company, loading } = this.props;
        const { data } = unitMeasure;
        const { selectedRows } = this.state;

        const onDelete = param => {
            const { dispatch } = this.props;
            dispatch({
                type: 'unitMeasure/delete',
                payload: param,
            });
        };

        const onUpdate = param => {
            const { dispatch } = this.props;
            dispatch({
                type: 'unitMeasure/update',
                payload: param,
            });
        };

        const columns = [
            {
                title: 'Unidad de medida',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Simbolo',
                dataIndex: 'symbol',
                key: 'symbol',
            },
            {
                title: 'Estado',
                key: 'state',
                render: (a, record) => {
                    return (
                        <Switch
                            size="small"
                            checked={record.state}
                            onClick={value =>
                                onUpdate({
                                    id: record.id,
                                    state: value,
                                })
                            }
                        />
                    );
                },
            },
            {
                title: 'Accion',
                key: 'accion',
                width: '100px',
                render: (a, record) => {
                    return (
                        <div className={styles.actions}>
                            <Tooltip title="Editar">
                                <Button
                                    icon="edit"
                                    shape="circle"
                                    type="primary"
                                    onClick={() => this.onShowModal('update', a)}
                                />
                            </Tooltip>
                            <Divider type="vertical"/>
                            <Tooltip title="Eliminar">
                                <Button
                                    icon="delete"
                                    shape="circle"
                                    type="danger"
                                    onClick={() => {
                                        Modal.confirm({
                                            title: '¿Estás seguro de eliminar este registro?',
                                            content: a.name,
                                            okType: 'danger',
                                            onOk() {
                                                onDelete({ id: a.id });
                                            },
                                        });
                                    }}
                                />
                            </Tooltip>
                        </div>
                    );
                },
            },
        ];

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Menu.Item key="none">
                   Ninguna
                </Menu.Item>
            </Menu>
        );

        return (
            <PageHeaderWrapper title="Unidad de medida">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            <Search
                                placeholder="Buscar unidad"
                                value={this.state.search}
                                onChange={this.handleSearch}
                            />
                        </div>
                        <div className={styles.tableListOperators}>
                            <Button.Group>
                                <Button
                                    loading={loading}
                                    icon="plus"
                                    type="primary"
                                    onClick={() => this.onShowModal('create')}
                                >
                                    Nuevo
                                </Button>
                                <Button icon="reload" loading={loading} onClick={() => this.onQueryPaginate()}>
                                    Refrescar
                                </Button>
                            </Button.Group>
                            {selectedRows.length > 0 && (
                                <span>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            Mas operaciones <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </span>
                            )}
                        </div>
                    </div>
                    <StandardTable
                        selectedRows={selectedRows}
                        loading={loading}
                        data={data}
                        columns={columns}
                        rowKey={record => record.id}
                        onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                    />
                    <FormModal/>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

const mapStateToProps = ({ unitMeasure, global, loading }) => ({
    unitMeasure,
    company: global.company,
    loading: loading.effects['unitMeasure/paginate'],
});

export default connect(mapStateToProps)(DataList);
