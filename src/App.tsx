
import { useEffect, useState } from 'react';
import { Select, Table, Row, Col, Button } from "antd"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLocalStorage } from './hooks/useLocalStorage';
import tableColumsFile from "./staticData/tableColumsFile.json"
import tableColumsData from "./staticData/tableColumnsData.json"



const App = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const [isShowTableSorter, setIsShowTableSorter] = useState(true)





  const handleChange = (value: any) => {
    const tempArr: any = []
    value.map((index: any) => tempArr.push(tableColumsFile[index]))

  };

  const handleGetData = () => {
    setData([])
  }



  useEffect(() => {

  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading)
      handleGetData()
    }, 5000)
  }, [])


  return (<Row style={{ marginTop: 100 }}>


    <Col sm={{ span: 16, offset: 4 }}>
      <Table loading={loading} columns={[]} dataSource={data} />
    </Col>
  </Row>)
}


export default App;
