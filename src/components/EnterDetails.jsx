import React from 'react'
import FormDetails from './Form'
import DeviceTabs from './DevicesTabs'
import { Row, Col } from 'antd'

const EnterDetails = () => {


  const [files, setFiles] = React.useState([])

  return (
    <div>
      <Row>
        <Col span={8}>
          <FormDetails setFiles={setFiles} />
        </Col>

        <Col span={16}>
          <DeviceTabs files={files} />
        </Col>
      </Row>
    </div>
  )

}


export default EnterDetails
