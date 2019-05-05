import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Row, Col, Divider } from 'antd';

const ProfileForm = Form.create()(
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
            };
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(e) {
            e.preventDefault();
            const { user = {}, dispatch } = this.props;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: 'personal/update',
                        payload: { ...user, ...values },
                    });
                }
            });
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            const { user = {}, loading } = this.props;
            return (
                <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                    <Form.Item hasFeedback label="Email">
                        {getFieldDecorator('email', {
                            initialValue: user.email,
                            rules: [
                                { type: 'email', message: '¡Ingrese un correo valido!' },
                                {
                                    required: true,
                                    message: '¡Por favor ingrese su correo!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Nombre de usuario">
                        {getFieldDecorator('user_name', {
                            initialValue: user.user_name,
                            rules: [
                                { required: true, message: '¡Ingrese un nombre válido!' },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" loading={loading} htmlType="submit">
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

export default connect(mapStateToProps)(ProfileForm);
