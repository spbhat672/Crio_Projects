import React, { useState } from 'react';
import { Modal, Input, Select, Button, Form,DatePicker } from 'antd';
// import moment from 'moment';
// import 'antd/dist/antd.css';
// import 'antd/dist/reset.css';
import '../styles/ModalForm.css';

const { Option } = Select;

const ModalForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
        setLoading(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Modal
  visible={visible}
  onCancel={onCancel}
  footer={null}
  centered
  destroyOnClose
  style={{ backgroundColor: '#454242' }}
  bodyStyle={{ backgroundColor: '#454242' }}
  className='ant-modal-content'  
>
  <h3 style={{ color: 'white', marginBottom: '1rem' }}>Upload video</h3>
  <Form
    form={form}
    layout="vertical"
    initialValues={{ genre: 'Education' }}
    onFinish={handleCreate}
    style={{ color: 'white',backgroundColor: '#454242' }}
    bodyStyle={{ backgroundColor: '#454242' }}
  >
    <Form.Item
      label="Video Link"
      name="videoLink"
      rules={[
        {
          required: true,
          message: 'Please input video link!',
        },
      ]}
      style={{ borderColor: 'white' }}
      labelCol={{ style: { color: 'white' } }}
      wrapperCol={{ style: { color: 'white' } }}
    >
      <Input placeholder="Enter video link" placeholderTextColor="white" style={{ backgroundColor: '#454242',color: 'white' }} />
    </Form.Item>

    <Form.Item
      label="Thumbnail Image Link"
      name="thumbnailLink"
      rules={[
        {
          required: true,
          message: 'Please input thumbnail image link!',
        },
      ]}
      style={{ borderColor: 'white' }}
    >
      <Input placeholder="Enter thumbnail image link" style={{ backgroundColor: '#454242' }} />
    </Form.Item>

    <Form.Item
      label="Title"
      name="title"
      rules={[
        {
          required: true,
          message: 'Please input video title!',
        },
      ]}
      style={{ borderColor: 'white' }}
    >
      <Input placeholder="Enter video title" style={{ backgroundColor: '#454242' }} />
    </Form.Item>

  <div className="select-container">
  <Form.Item
      label="Genre"
      name="genree"
      rules={[
        {
          required: true,
          message: 'Please select a genre!',
        },
      ]}
      style={{ borderColor: 'white' }}
    >
      <Select placeholder="Select a genre" style={{ backgroundColor: '#454242', color: 'white' }}>
        <Select.Option value="Education">Education</Select.Option>
        <Select.Option value="Sports">Sports</Select.Option>
        <Select.Option value="Comedy">Comedy</Select.Option>
        <Select.Option value="Lifestyle">Lifestyle</Select.Option>
      </Select>
    </Form.Item>
  </div>

    <div className="select-container">
    <Form.Item
      label="Suitable age group for the clip"
      name="ageGroup"
      rules={[
        {
          required: true,
          message: 'Please select a suitable age group!',
        },
      ]}
      style={{ borderColor: 'white' }}
    >
      <Select placeholder="Select an age group" style={{ backgroundColor: '#454242', color: 'white' }}>
        <Select.Option value="7+">7+</Select.Option>
        <Select.Option value="12+">12+</Select.Option>
        <Select.Option value="16+">16+</Select.Option>
        <Select.Option value="18+">18+</Select.Option>
      </Select>
    </Form.Item>
    </div>

    <Form.Item
      label="Release Date"
      name="releaseDate"
      rules={[
        {
          required: true,
          message: 'Please select a release date!',
        },
      ]}
      style={{ borderColor: 'white',width:'470px' }}
    >
      <DatePicker
        placeholder="Select a release date"
        style={{ backgroundColor: '#454242',width:'470px' }}
        format="DD MMM YYYY"
      />
    </Form.Item>

    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Button type="primary" style={{ backgroundColor: 'red' }} onClick={handleCreate}>
        UPLOAD VIDEO
      </Button>
      <Button style={{ color: 'white', marginLeft: '1rem',backgroundColor:'transparent',border:'none' }} onClick={handleCancel}>
        CANCEL
      </Button>
    </div>

  </Form>
</Modal>

)
}

export default ModalForm;