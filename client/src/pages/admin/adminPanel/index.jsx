import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Input, Popconfirm, Table } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Col, Row, Statistic, Button, Dropdown } from "antd";

const AdminPanel = () => {
  let [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const toast = useToast();

  const navigate = useNavigate();
  const { Search } = Input;

  const userDataRedux = useSelector((state) => state.getAllUserDataReducer);

  useEffect(() => {
    if (!userDataRedux) {
      navigate(-1);
    } else {
      if (userDataRedux?.data?.position !== "admin") {
        navigate(-1);
      } else {
        console.log(userDataRedux?.data?.position);
        null;
      }
    }
  }, []);

  const getAllUsersdata = async () => {
    const allData = await axios.get(`http://localhost:3000/getAllData`);
    setUserData(allData.data.reverse());

    setLoading(false);
  };

  useEffect(() => {
    getAllUsersdata();
  }, []);

  const handleDelete = async (e) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteUser/${e._id}`
      );
      toast({
        title: `${response.data.message}`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: `${error}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  const onSearch = async (e) => {
    let response = await axios.get(`http://localhost:3000/getAllData`);
    let newData = response.data.filter(
      (element) =>
        element.fullName
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase()) ||
        element.companyName
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase()) ||
        element.position
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
    );

    setUserData(newData);
  };

  const columns = [
    {
      title: "Full Name",
      width: 110,
      dataIndex: "fullName",
      key: "name",
      fixed: "left",
    },
    {
      title: "Company Name",
      width: 140,
      dataIndex: "companyName",
      key: "age",
      fixed: "left",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "4",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "1",
      width: 180,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "2",
      width: 150,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "3",
      width: 150,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (e) =>
        userData.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(e)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSortAscending = () => {
    let newData = userData.sort((a, b) => a.fullName - b.fullName);

    console.log(newData);
  };
  const handleSortDescending = () => {
    let newData = userData.sort((a, b) => b.fullName - a.fullName);

    console.log(newData);
  };

  const items = [
    {
      key: "1",
      label: <a onClick={handleSortAscending}>Sort By Ascending</a>,
    },
    {
      key: "2",
      label: <a onClick={handleSortDescending}>Sort By Descending</a>,
    },
  ];

  return (
    <div id="adminPanel">
      <Search
        placeholder="Search By User Name"
        allowClear
        enterButton="Search"
        size="large"
        onChange={onSearch}
      />
      <Col span={12}>
        <Statistic
          title="Site Users"
          value={userData?.length}
          loading={loading}
        />
      </Col>
      <div className="table">
        <Table
          loading={loading}
          columns={columns}
          dataSource={userData}
          scroll={{
            x: 1500,
            y: 500,
          }}
        />
      </div>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow
      >
        <Button>Sort By Full Name</Button>
      </Dropdown>
    </div>
  );
};

export default AdminPanel;
