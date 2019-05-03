import React, { Component } from 'react';
import { Form, Icon, Input, Button, Tooltip, Checkbox, Card } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import { formatMessage, FormattedMessage } from 'umi/locale';

import styles from './index.less';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/login',
          payload: values,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return (
      <div>
        <div className={styles.form}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('user_name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.userName.required' }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({ id: 'app.login.userName' })}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    <Tooltip title="Nombre de usuario o correo electrónico">
                      <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  }
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.password.required' }),
                  },
                ],
              })(
                <Input.Password
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder={formatMessage({ id: 'app.login.password' })}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Checkbox>
                  <FormattedMessage id="app.login.remember-me" />
                </Checkbox>
              )}
              <Link className={styles.forgot} to="/user/forgot">
                <FormattedMessage id="app.login.forgot-password" />
              </Link>
              <Button type="primary" loading={loading} htmlType="submit" block>
                <FormattedMessage id="app.login.login" />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const LoginPage = Form.create()(LoginForm);

const mapStateToProps = ({ loading }) => {
  return {
    loading: loading.effects['login/login'],
  };
};

export default connect(mapStateToProps)(LoginPage);
