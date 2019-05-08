import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
    Modal,
    Tooltip,
    Input,
    Icon,
    Menu,
    Dropdown,
    Button,
    Card,
    Avatar,
    Divider,
    Switch,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';

import { service } from '@/setting';

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
            type: 'category/paginate',
            payload: params,
        });
    };

    onShowModal = (modalType, currentItem = {}) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'category/showModal',
            payload: { currentItem, modalType },
        });
        dispatch({
            type: 'category/treeSelect',
            payload: {
                parent: true,
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
        const { category, company, loading } = this.props;
        const { data } = category;
        const { selectedRows } = this.state;

        const onDelete = param => {
            const { dispatch } = this.props;
            dispatch({
                type: 'category/delete',
                payload: param,
            });
        };

        const onUpdate = param => {
            const { dispatch } = this.props;
            dispatch({
                type: 'category/update',
                payload: param,
            });
        };

        const columns = [
            {
                title: 'Categoria',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Titulo Seo',
                dataIndex: 'title_category_seo',
                key: 'title_category_seo',
            },
            {
                title: 'Categoria Seo',
                dataIndex: 'url_category_seo',
                key: 'url_category_seo',
            },
            {
                title: 'Descripción Seo',
                dataIndex: 'description_seo',
                key: 'description_seo',
            },
            {
                title: 'Mostrar en web',
                key: 'show_web',
                render: (a, record) => {
                    return (
                        <Switch
                            size="small"
                            checked={record.show_web}
                            onClick={value =>
                                onUpdate({
                                    id: record.id,
                                    show_web: value,
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
                                    onClick={() => this.onShowModal('update', record)}
                                />
                            </Tooltip>
                            <Divider type="vertical" />
                            <Tooltip title="Eliminar">
                                <Button
                                    icon="delete"
                                    shape="circle"
                                    type="danger"
                                    onClick={() => {
                                        Modal.confirm({
                                            title: '¿Estás seguro de eliminar este registro?',
                                            content: record.name,
                                            okType: 'danger',
                                            onOk() {
                                                onDelete({ id: record.id });
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
                <Menu.Item key="none">Ninguna</Menu.Item>
            </Menu>
        );

        return (
            <PageHeaderWrapper title="Categoria">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            <Search
                                placeholder="Buscar categoria"
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
                                <Button
                                    icon="reload"
                                    loading={loading}
                                    onClick={() => this.onQueryPaginate()}
                                >
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
                    <FormModal />
                </Card>
            </PageHeaderWrapper>
        );
    }
}

const mapStateToProps = ({ category, global, loading }) => ({
    category,
    company: global.company,
    loading: loading.effects['category/paginate'],
});

export default connect(mapStateToProps)(DataList);
