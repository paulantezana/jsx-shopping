import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Card } from 'antd';

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

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const SettingForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
            };
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(e) {
            e.preventDefault();
            const { company } = this.props;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    this.props.dispatch({
                        type: 'global/updateCompany',
                        payload: { ...values, id: company.id },
                    });
                }
            });
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const { company } = this.props;
            return (
                <Card bordered={false}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item hasFeedback label="Nombre o razón social">
                            {getFieldDecorator('name', {
                                initialValue: company.name,
                                rules: [
                                    {
                                        required: true,
                                        message: '¡Por favor ingrese un Nombre o razón social!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="RUC">
                            {getFieldDecorator('ruc', {
                                initialValue: company.ruc,
                                rules: [
                                    { required: true, message: '¡Por favor ingrese su RUC!' },
                                    { pattern: /^[0-9]{11}$/, message: '¡Ingrese un RUC válido!' },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Direccion">
                            {getFieldDecorator('address', {
                                initialValue: company.address,
                                rules: [
                                    {
                                        required: true,
                                        message: '¡Por favor ingrese una dirección!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Correo">
                            {getFieldDecorator('email', {
                                initialValue: company.email,
                                rules: [
                                    { type: 'email', message: '¡Ingrese un correo valido!' },
                                    { required: true, message: '¡Por favor ingrese su email!' },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Cuenta Bancaria">
                            {getFieldDecorator('bank_account', {
                                initialValue: company.bank_account,
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Guardar
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            );
        }
    }
);

const mapStateToProps = ({ global }) => ({
    company: global.company,
});

export default connect(mapStateToProps)(SettingForm);
