import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Input, Popconfirm, Table } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Col, Row, Statistic, Button, Dropdown, Select, Space } from "antd";
import moment from "moment";

const AdminPanel = () => {
  let [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTime, setNewTime] = useState("");
  const [newHeaderText, setNewHeaderText] = useState("");
  const [author, setAuthor] = useState("");
  const [newAboutText, setNewAboutText] = useState("");

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

  // const handleSortAscending = () => {
  //   let newData = userData.sort((a, b) => a.fullName - b.fullName);
  // };
  // const handleSortDescending = () => {
  //   let newData = userData.sort((a, b) => b.fullName - a.fullName);
  // };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearchNew = (value) => {
    console.log("search:", value);
  };

  const newDataSender = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/whatsNew", {
        author: author,
        newAboutText: newAboutText,
        newHeaderText: newHeaderText,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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

      <div id="newArea">
        <h3>What's new today</h3>

        <div className="whatsNewArea">
          <input
            className="timeInput"
            type="text"
            value={moment().format("MMMM Do YYYY, h:mm:ss a")}
          />
          <div className="new">
            <input
              type="text"
              placeholder="new Basliq"
              onChange={(e) => {
                setNewHeaderText(e.target.value);
              }}
            />
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearchNew}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "Admin",
                  label: "Admin",
                },
                {
                  value: "Shahriyar Mammadov",
                  label: "Shahriyar Mammadov",
                },
              ]}
            />
            <div>
              <textarea
                name="newText"
                id="newText"
                rows="10"
                placeholder="Whats new??"
                onChange={(e) => {
                  setNewAboutText(e.target.value);
                }}
              ></textarea>
            </div>

            <button onClick={newDataSender}>Added</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
