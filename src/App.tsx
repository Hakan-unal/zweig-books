
import { useState, useRef } from 'react';
import { Table, Row, Col, Image, Button, Input, Space } from "antd"
import books from "./staticData/books.json"
import { AiFillEye, AiOutlineMonitor } from "react-icons/ai";
import type { InputRef } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { showNotification } from '../src/components/general/notification'




interface DataType {
  image: string;
  name: string;
  description: string;
  sell: string;
}
type DataIndex = keyof DataType;


const App = () => {
  const [data, setData] = useState(books)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<AiOutlineMonitor />}
            size="small"
            style={{ width: 90 }}
          >
            Ara
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Temizle
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrele
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Kapat
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <AiOutlineMonitor size={25} style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Görsel',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <Image width={100} src={image} />
    },
    {
      title: 'Ad',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    // {
    //   title: 'Açıklama',
    //   dataIndex: 'description',
    //   key: 'description',
    //   render: (description: string) => <Popover title="Özet" content={description}><AiFillInfoCircle color="blue" size={30} /></Popover>
    // },
    {
      title: 'Ön İzleme',
      dataIndex: 'sell',
      key: 'sell',
      render: (sell: string) => <Button href={sell} ><AiFillEye size={20} /></Button>

    },
  ];
  return (<Row style={{ marginTop: 100 }}>
    <Col sm={{ span: 16, offset: 4 }}>
      <Table
        bordered={false}
        sticky
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => { }, // click row
            onDoubleClick: (event) => { }, // double click row
            onContextMenu: (event) => { }, // right button click row
            onMouseEnter: (event) => { showNotification("info", record.name, record.description, null) }, // mouse enter row
            onMouseLeave: (event) => { }, // mouse leave row
          };
        }}
        columns={columns}
        dataSource={data} />
    </Col>
  </Row>)
}


export default App;
