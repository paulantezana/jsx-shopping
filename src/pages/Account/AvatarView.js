import React, { Fragment } from 'react';
import { FormattedMessage } from 'umi/locale';
import { Upload, Button, Avatar, Tooltip, Icon } from 'antd';
import { connect } from 'dva';
import { service } from '@/setting';
import styles from './avatarView.less';

class AvatarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
        };
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload() {
        const { fileList } = this.state;
        this.props.dispatch({
            type: 'personal/uploadAvatar',
            payload: {
                id: this.props.user.id,
                avatar: fileList[0],
            },
        });
    }

    render() {
        const { user, company, dispatch } = this.props;

        const uploadProps = {
            showUploadList: false,
            multiple: false,
            accept: 'image/*',

            beforeUpload: (file)=> {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    message.error('La imagen debe ser inferior a 2MB.!');
                }

                dispatch({
                    type: 'personal/uploadAvatar',
                    payload: {
                        avatar: file,
                        id: user.id,
                    }
                });
            },
        };
        
        return (
            <div className={styles.avatarContainer}>
                <Avatar
                    size={180}
                    src={user.avatar === "" ? `${service.path}/${company.logo}` : `${service.path}/${user.avatar}`} />

                <Upload {...uploadProps} className={styles.uploadAvatar}>
                    <Tooltip title="Cambiar avatar">
                        <Icon type="camera" className={styles.action}/>
                    </Tooltip>
                </Upload>
            </div>
        );
    }
}

const mapStateToProps = ({ global }) => {
    return {
        user: global.user,
        company: global.company,
    };
};

export default connect(mapStateToProps)(AvatarView);
