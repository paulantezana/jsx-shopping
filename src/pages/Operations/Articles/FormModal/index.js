import React from 'react';
import { Modal, Form, Input, TreeSelect, Tabs, Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.less';


import Article from './Article';
import Info from './Info';
import Picture from './Picture';
import Provider from './Provider';



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const AddForm = Form.create()(
    class extends React.Component {
        state = {
            tab: '1',
        };

        // Cuando se da click en boton cancelar del modal
        onCancel = () => {
            const { form, dispatch } = this.props;
            dispatch({
                type: 'product/resetproduct',
            });
            form.resetFields();
        };

        // Click en el boton de confirmacion
        handleConfirm = () => {
            const { form, dispatch, product } = this.props;
            const { currentItem, modalType } = product;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                dispatch({
                    type: `product/${modalType}`,
                    payload: { ...values, id: currentItem.id },
                });
                form.resetFields();
            });
        };

        // onChangeTab

        render() {
            const { form, loading, product, category } = this.props;
            const { getFieldDecorator } = form;
            const { currentItem, modalVisible, modalType } = product;
            return (
                <Modal
                    layout="vertical"
                    title="Articulos"
                    okText="Guardar"
                    width="90vw"
                    bodyStyle={{ padding: 0 }}
                    style={{ top: 50 }}
                    confirmLoading={loading}
                    onCancel={this.onCancel}
                    onOk={this.handleConfirm}
                    visible={modalVisible}
                >
                    <Tabs tabPosition="left" defaultActiveKey="article" className={styles.tabs}>
                        <Tabs.TabPane
                            tab={<Icon type="inbox" style={{ fontSize: '22px' }} />}
                            key="article"
                        >
                            <Article/>
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={<Icon type="folder" style={{ fontSize: '22px' }} />}
                            key="info"
                        >
                            <Info/>
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={<Icon type="picture" style={{ fontSize: '22px' }} />}
                            key="images"
                        >
                            <Picture/>
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={<Icon type="file-text" style={{ fontSize: '22px' }} />}
                            key="providers"
                        >
                            <Provider/>
                        </Tabs.TabPane>
                    </Tabs>
                </Modal>
            );
        }
    }
);

const mapStateToProps = ({ product, category, loading }) => {
    return {
        product,
        category,
        loading: loading.effects['product/create'] || loading.effects['product/update'],
    };
};

export default connect(mapStateToProps)(AddForm);
