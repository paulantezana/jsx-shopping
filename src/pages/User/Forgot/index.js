import React from 'react';
import { connect } from 'dva';
import { Steps, Card, Button } from 'antd';
import Link from 'umi/link';
import { formatMessage, FormattedMessage } from 'umi/locale';

import Search from './Search';
import Change from './Change';
import Validate from './Validate';

import styles from './index.less';

const Step = Steps.Step;

const Forgout = ({ forgot }) => (
    <div className={styles.container}>
        <Steps size="small"  current={forgot.forgotStep}>
            <Step title="Buscar" />
            <Step title="Validar" />
            <Step title="Cambiar" />
        </Steps>
        <div className={styles.stepsContent}>
            {forgot.forgotStep === 0 && <Search />}
            {forgot.forgotStep === 1 && <Validate />}
            {forgot.forgotStep === 2 && <Change />}
            <Link to="/user/login">
                <Button block type="dashed" >
                    <FormattedMessage id="app.login.login" />
                </Button>
            </Link>
        </div>
    </div>
);

const mapStateToProps = ({ forgot, loading }) => ({
    forgot,
    // loading: loading.effects['forgot/forgotSearch'] || loading.effects['forgot/forgotSearch'] || loading.effects['forgot/forgotChange'],
})

export default connect(mapStateToProps)(Forgout);
