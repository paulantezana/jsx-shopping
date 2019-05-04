import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Input, Form, Icon } from 'antd';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
        md: { span: 16, offset: 6 },
    },
};

const PasswordForm = Form.create()(
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.handleSubmit = this.handleSubmit.bind(this);
            this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
            this.validateToNextPassword = this.validateToNextPassword.bind(this);
        }

        compareToFirstPassword(rule, value, callback) {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('¡Las contraseñas no noinciden!');
            } else {
                callback();
            }
        }

        validateToNextPassword(rule, value, callback) {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        }

        handleSubmit(e) {
            e.preventDefault();
            const { user, dispatch, form } = this.props;
            form.validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: 'personal/changePassword',
                        payload: { ...values, id: user.id },
                    });
                    form.resetFields();
                }
            });
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Contraseña Antigua">
                        {getFieldDecorator('old_password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Por favor ingrese su contraseña antigua!',
                                },
                            ],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Contraseña"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Nueva contraseña">
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Por favor ingrese su contraseña!' },
                                {
                                    pattern: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ$@$!%*?&]{6,30}$/,
                                    message:
                                        '¡La contraseña debe contener entre 6 a 30 caracteres!',
                                },
                                { validator: this.validateToNextPassword },
                            ],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Contraseña"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Confirme la nueva contraseña">
                        {getFieldDecorator('confirm', {
                            rules: [
                                { required: true, message: '¡Por favor, confirme su contraseña!' },
                                { validator: this.compareToFirstPassword },
                            ],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Repetir Contraseña"
                            />
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Guardar cambios
                        </Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);

const mapStateToProps = ({ global, loading }) => ({
    user: global.user,
    setting: global.setting,
})

export default connect(mapStateToProps)(PasswordForm);
