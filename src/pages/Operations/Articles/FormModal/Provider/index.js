import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

class ToolBar extends Component {
    render() {
        return <div className={styles.toolBar}>hola</div>;
    }
}

const mapStateToProps = ({ }) => ({
});

export default connect(mapStateToProps)(ToolBar);
