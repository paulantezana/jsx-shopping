import React from 'react';
import { Modal, Form, Input, TreeSelect, Divider, Checkbox, InputNumber } from 'antd';
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
                type: 'category/resetcategory',
            });
            form.resetFields();
        };

        // Click en el boton de confirmacion
        handleConfirm = () => {
            const { form, dispatch, category } = this.props;
            const { currentItem, modalType } = category;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                dispatch({
                    type: `category/${modalType}`,
                    payload: { ...values, id: currentItem.id },
                });
                form.resetFields();
            });
        };

        render() {
            const { form, loading, category } = this.props;
            const { getFieldDecorator } = form;
            const { currentItem, modalVisible, modalType, treeSelect } = category;

            return (
                <Modal
                    layout="vertical"
                    title="Categoria"
                    okText="Guardar"
                    confirmLoading={loading}
                    onCancel={this.onCancel}
                    onOk={this.handleConfirm}
                    visible={modalVisible}
                >
                    <Form layout="horizontal" {...formItemLayout}>
                        <Form.Item hasFeedback {...formItemLayout} label="Categoria Padre">
                            {getFieldDecorator('parent_id', {
                                initialValue: currentItem.parent_id
                                    ? currentItem.parent_id.toString()
                                    : '0',
                                rules: [
                                    { required: true, message: '¡Por favor elija una categoria!' },
                                ],
                            })(
                                <TreeSelect
                                    treeDefaultExpandAll
                                    // value={data.parent_id}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={treeSelect}
                                />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Categoria">
                            {getFieldDecorator('name', {
                                initialValue: currentItem.name,
                                rules: [
                                    {
                                        required: true,
                                        message: '¡Por favor ingrese una categoria!',
                                    },
                                ],
                            })(<Input placeholder="Categoria" />)}
                        </Form.Item>

                        <Divider>SEO</Divider>
                        <Form.Item hasFeedback label="Titulo seo">
                            {getFieldDecorator('title_category_seo', {
                                initialValue: currentItem.title_category_seo,
                            })(<Input placeholder="Titulo seo" />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Url seo">
                            {getFieldDecorator('url_category_seo', {
                                initialValue: currentItem.url_category_seo,
                            })(<Input placeholder="Tag seo" />)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Descripción seo">
                            {getFieldDecorator('description_seo', {
                                initialValue: currentItem.description_seo,
                            })(<Input.TextArea placeholder="Descripción seo" />)}
                        </Form.Item>

                        <Divider>Contenido</Divider>
                        <Form.Item hasFeedback label="Encabezado" help="Contenido que se muestra en el encabezado de la página.">
                            {getFieldDecorator('header_page', {
                                initialValue: currentItem.header_page,
                            })(<Input.TextArea/>)}
                        </Form.Item>
                        <Form.Item hasFeedback label="Pie" help="Contenido que se muestra en el pie de la página.">
                            {getFieldDecorator('foot_page', {
                                initialValue: currentItem.foot_page,
                            })(<Input.TextArea/>)}
                        </Form.Item>

                        <Divider>Configuracion</Divider>
                        <Form.Item label="Mostrar en la web">
                            {getFieldDecorator('show_web', {
                                valuePropName: 'checked',
                                initialValue: modalType == 'create' ? true : currentItem.show_web,
                            })(<Checkbox />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

const mapStateToProps = ({ category, loading }) => {
    return {
        category,
        loading: loading.effects['category/create'] || loading.effects['category/update'],
    };
};

export default connect(mapStateToProps)(AddForm);
