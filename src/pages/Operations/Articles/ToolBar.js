import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Divider, Icon } from 'antd';
import styles from './ToolBar.less';

class ToolBar extends Component {
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

    render() {
        const { loading } = this.props;

        return (
            <div className={styles.toolBar}>
                <Button.Group className={styles.operations} >
                    <Button
                        loading={loading}
                        icon="plus"
                        type="primary"
                        onClick={() => this.onShowModal('create')}
                    >
                        F3
                    </Button>
                    <Button icon="reload" loading={loading} onClick={() => this.onQueryPaginate()}>
                        F5
                    </Button>
                </Button.Group>
                <div className={styles.header}>
                    <Icon type="inbox" />
                    <Divider type="vertical" />
                    <div className={styles.title}>Articulos</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ product, global, loading }) => ({
    product,
    company: global.company,
    loading: loading.effects['product/paginate'],
});

export default connect(mapStateToProps)(ToolBar);