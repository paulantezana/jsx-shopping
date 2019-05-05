import React from 'react';
import { Modal, Form, Input, DatePicker, Radio } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import moment from 'moment';
// import Editor from '@/components/Editor';

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
                type: 'personal/resetPersonal',
            });
            form.resetFields();
        };

        // Click en el boton de confirmacion
        handleConfirm = () => {
            const { form, dispatch, personal } = this.props;
            const { currentItem, modalType } = personal;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                dispatch({
                    type: `personal/${modalType}`,
                    payload: { ...values, id: currentItem.id },
                });
                form.resetFields();
            });
        };

        render() {
            const { form, loading, personal } = this.props;
            const { getFieldDecorator } = form;
            const { currentItem, modalType, modalVisible } = personal;
            return (
                <Modal
                    layout="vertical"
                    title="Admision"
                    okText="Guardar"
                    confirmLoading={loading}
                    onCancel={this.onCancel}
                    onOk={this.handleConfirm}
                    visible={modalVisible}
                >
                    <Form layout="horizontal" {...formItemLayout}>
                        <Form.Item hasFeedback label="Apellidos">
                            {getFieldDecorator('last_name', {
                                initialValue: currentItem.last_name,
                                rules: [
                                    {
                                        required: true,
                                        message: '¡Por favor ingrese sus apellidos!',
                                    },
                                ],
                            })(<Input placeholder="Apellidos" />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Nombres">
                            {getFieldDecorator('first_name', {
                                initialValue: currentItem.first_name,
                                rules: [
                                    {
                                        required: true,
                                        message: '¡Por favor ingrese su nombre!',
                                    },
                                ],
                            })(<Input placeholder="Nombres" />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Fecha de nacimiento">
                            {getFieldDecorator('birth_date', {
                                initialValue: currentItem.birth_date
                                    ? moment(new Date(data.birth_date), 'DD/MM/YYYY')
                                    : undefined,
                            })(<DatePicker format="DD/MM/YYYY" />)}
                        </Form.Item>
                        <Form.Item label="Sexo">
                            {getFieldDecorator('gender', {
                                initialValue: currentItem.gender,
                            })(
                                <Radio.Group>
                                    <Radio value="0">Femenino</Radio>
                                    <Radio value="1">Masculino</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback label="Direccion">
                            {getFieldDecorator('address', {
                                initialValue: currentItem.address,
                            })(<Input placeholder="Direccion" />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Telefono">
                            {getFieldDecorator('phone', {
                                initialValue: currentItem.phone,
                            })(<Input placeholder="Telefono" />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

const mapStateToProps = ({ personal, loading }) => {
    return {
        personal,
        loading:
            loading.effects['personal/create'] ||
            loading.effects['personal/update'],
    };
};

export default connect(mapStateToProps)(AddForm);
