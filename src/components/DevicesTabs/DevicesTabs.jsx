import React from 'react';
import { Tabs } from 'antd';
import ExcelJS from 'exceljs';
import XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import { getDataWorksheet } from './utils';

const getContentFromFile = (files) => {
  if (files.length === 0) {
    console.log('inside');
    return;
  }

  const wb = new Workbook();

  // remember a file inherhits from Blob and FileReader is an object with the sole pourpse of reading data from Blob (and hence a file to)

  const reader = new FileReader();

  const contentFiles = [];

  files.forEach((file, index) => {
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      // read de result after read the file as a Buffer
      const buffer = reader.result;

      try {
        let fileXlsAsBuffer = XLSX.read(buffer);

        // convert xls to xlsx
        let parsedBuffer = XLSX.write(fileXlsAsBuffer, {
          bookType: 'xlsx',
          type: 'array',
        });

        const readWb = await wb.xlsx.load(parsedBuffer);

        const certCustomerSheet = readWb.getWorksheet(
          'CalCertificate Customer'
        );

        const sensors = getDataWorksheet(certCustomerSheet);

        contentFiles.push(sensors);
      } catch (error) {
        console.log('error', error);
      }
    };
  });

  return contentFiles;
};

const DevicesTabs = ({ files }) => {
  const [filesData, setFilesData] = React.useState([]);
  const { TabPane } = Tabs;

  React.useEffect(() => {
    console.log('useEfffect DevicesTabs');
    getContentFromFile(files);
  }, [files]);

  function callback(key) {
    console.log(key);
  }
  return (
    <Tabs onChange={callback} type="card">
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default DevicesTabs;
