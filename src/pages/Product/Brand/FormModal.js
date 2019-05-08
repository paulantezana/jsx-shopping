import React from 'react';
import { Modal, Form, Input, Checkbox } from 'antd';
import { connect } from 'dva';

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
        // Cuando se da click en boton cancelar del modal
        onCancel = () => {
            const { form, dispatch } = this.props;
            dispatch({
                type: 'brand/resetBrand',
            });
            form.resetFields();
        };

        // Click en el boton de confirmacion
        handleConfirm = () => {
            const { form, dispatch, brand } = this.props;
            const { currentItem, modalType } = brand;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                dispatch({
                    type: `brand/${modalType}`,
                    payload: { ...values, id: currentItem.id },
                });
                form.resetFields();
            });
        };

        render() {
            const { form, loading, brand } = this.props;
            const { getFieldDecorator } = form;
            const { currentItem, modalVisible, modalType } = brand;
            return (
                <Modal
                    layout="vertical"
                    title="Marca"
                    okText="Guardar"
                    confirmLoading={loading}
                    onCancel={this.onCancel}
                    onOk={this.handleConfirm}
                    visible={modalVisible}
                >
                    <Form layout="horizontal" {...formItemLayout}>
                        <Form.Item hasFeedback label="Marca">
                            {getFieldDecorator('name', {
                                initialValue: currentItem.name,
                                rules: [
                                    { required: true, message: '¡Por favor ingrese una marca!' },
                                ],
                            })(<Input placeholder="Marca"/>)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Descripción">
                            {getFieldDecorator('description', {
                                initialValue: currentItem.description,
                            })(<Input.TextArea placeholder="Descripción" />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Sitio Web">
                            {getFieldDecorator('web_site', {
                                initialValue: currentItem.web_site,
                            })(<Input placeholder="Sitio Web"/>)}
                        </Form.Item>
                        <Form.Item label="Estado">
                            {getFieldDecorator('state', {
                                valuePropName: 'checked',
                                initialValue: modalType == 'create' ? true : currentItem.state,
                            })(<Checkbox/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

const mapStateToProps = ({ brand, loading }) => {
    return {
        brand,
        loading: loading.effects['brand/create'] || loading.effects['brand/update'],
    };
};

export default connect(mapStateToProps)(AddForm);
