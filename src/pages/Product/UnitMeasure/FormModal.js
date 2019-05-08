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
                type: 'unitMeasure/resetunitMeasure',
            });
            form.resetFields();
        };

        // Click en el boton de confirmacion
        handleConfirm = () => {
            const { form, dispatch, unitMeasure } = this.props;
            const { currentItem, modalType } = unitMeasure;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                dispatch({
                    type: `unitMeasure/${modalType}`,
                    payload: { ...values, id: currentItem.id },
                });
                form.resetFields();
            });
        };

        render() {
            const { form, loading, unitMeasure } = this.props;
            const { getFieldDecorator } = form;
            const { currentItem, modalVisible, modalType } = unitMeasure;
            return (
                <Modal
                    layout="vertical"
                    title="Unidad de medida"
                    okText="Guardar"
                    confirmLoading={loading}
                    onCancel={this.onCancel}
                    onOk={this.handleConfirm}
                    visible={modalVisible}
                >
                    <Form layout="horizontal" {...formItemLayout}>
                        <Form.Item hasFeedback label="Medida">
                            {getFieldDecorator('name', {
                                initialValue: currentItem.name,
                                rules: [
                                    { required: true, message: '¡Por favor ingrese una unidad de medida!' },
                                ],
                            })(<Input placeholder="Medida"/>)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Simbolo">
                            {getFieldDecorator('symbol', {
                                initialValue: currentItem.symbol,
                            })(<Input placeholder="Simbolo"/>)}
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

const mapStateToProps = ({ unitMeasure, loading }) => {
    return {
        unitMeasure,
        loading: loading.effects['unitMeasure/create'] || loading.effects['unitMeasure/update'],
    };
};

export default connect(mapStateToProps)(AddForm);
