import React from 'react';
import { Form, Input, TreeSelect } from 'antd';
import { connect } from 'dva';
import styles from './index.less';


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

        // onChangeTab

        render() {
            const { form, loading, product, category } = this.props;
            const { getFieldDecorator } = form;
            const { currentItem } = product;
            return (

                    <Form layout="horizontal" {...formItemLayout}>
                        <Form.Item {...formItemLayout} label="Categoria">
                            {getFieldDecorator('category_id', {
                                initialValue: currentItem.category_id,
                                rules: [
                                    {
                                        required: true,
                                        message: '¡Por favor elija una Categoria!',
                                    },
                                ],
                            })(
                                <TreeSelect
                                    treeDefaultExpandAll
                                    placeholder="Categoria"
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={category.treeSelect}
                                />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback label="Descripción">
                            {getFieldDecorator('description', {
                                initialValue: currentItem.description,
                                rules: [
                                    {
                                        required: true,
                                        message: '¡Por favor ingrese una descripción!',
                                    },
                                ],
                            })(<Input placeholder="Descripción" />)}
                        </Form.Item>
                    </Form>
            );
        }
    }
);

const mapStateToProps = ({ product, category, loading }) => {
    return {
        product,
        category,
        loading: loading.effects['product/create'] || loading.effects['product/update'],
    };
};

export default connect(mapStateToProps)(AddForm);
