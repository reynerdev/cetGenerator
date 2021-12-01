import React, { useState } from 'react';
import {
  Form,
  Input, Upload,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker, InputNumber, TreeSelect,
  Switch,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const FormDetails = ({ setFiles }) => {
  const [componentSize, setComponentSize] = useState('default');

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    // if the first element is true , then it will return the second e.fileList
    // return e && e.fileList;
    // return an array with only File type content
    const fileTypeContent = e.fileList.map((file) => file.originFileObj);
    setFiles(fileTypeContent)
  };

  return (
    <div style={{ borderColor: "black" }}>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        labelAlign={"left"}
      >
        <Form.Item label="Empresa">
          <Input />
        </Form.Item>
        <Form.Item label="Next cal">
          <Input />
        </Form.Item>
        <Form.Item label="Gas Botella">
          <Input />
        </Form.Item>
        <Input />
        <Form.Item label="NP  botella">
        </Form.Item>
        <Form.Item label="Lote botella">
          <Input />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        <Form.Item
          name="firma"
          label="Subir Firma"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        >
          <Upload name="logo" action="/upload.do" listType="ExcelFiles">
            <Button icon={<UploadOutlined />}> Suba imagenes </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="excel"
          label="Subir excel"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        >
          <Upload name="logo" listType="Firmas">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </div>
  );
};


export default FormDetails
