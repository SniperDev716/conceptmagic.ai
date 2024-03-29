import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Button,
  Col,
  Row,
  Table,
  Tag,
  Space,
  Pagination,
  Input,
  Modal,
  Form,
  InputNumber,
  Tooltip,
  message,
} from "antd";
import { getAllUsers } from "../../../services/userAPI";
import useForm from "../../../Hooks/useForm";
import { increasePlanLimit } from "../../../services/planAPI";

const { Search } = Input;

function Users() {
  const [showGiveModal, setShowGiveModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, handleChange] = useForm({});
  const [form] = Form.useForm();

  const columns = [
    {
      title: "No",
      dataIndex: "_id",
      key: "no",
      width: "50px",
      render: (_, row, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "🛒",
    //   dataIndex: "_id",
    //   key: "activeSubscriptionId",
    //   render: (_, row) => {
    //     if (row.activeSubscriptionId?.planId?.price) {
    //       return (
    //         <Tag color="#108ee9">
    //           ${row.activeSubscriptionId?.planId?.price}
    //         </Tag>
    //       );
    //     }
    //   },
    // },
    // {
    //   title: "Plan",
    //   dataIndex: "plan",
    //   key: "plan",
    //   render: (_, row) => {
    //     if (row.plan) {
    //       return (
    //         <>
    //         <Tooltip placement="top" title={"Property"}>
    //           <Tag color="#108ee9">{_.property}</Tag>
    //         </Tooltip>
    //         <Tooltip placement="top" title={"Document"}>
    //           <Tag color="#108ee9">{_.document}</Tag>
    //         </Tooltip>
    //         {/* <Tooltip placement="top" title={"Account"}>
    //           <Tag color="#108ee9">{_.property}</Tag>
    //         </Tooltip> */}
    //         </>
    //       );
    //     }
    //   },
    // },
    {
      title: "UTM source",
      dataIndex: "utm_source",
      key: "utm_source",
    },
    {
      title: "UTM medium",
      dataIndex: "utm_medium",
      key: "utm_medium",
    },
    {
      title: "UTM compaign",
      dataIndex: "utm_compaign",
      key: "utm_compaign",
    },
    {
      title: "UTM content",
      dataIndex: "utm_content",
      key: "utm_content",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_) => {
        return moment(_).format("MM/DD/YY hh:mm A");
      },
    },
    {
      title: "Projects",
      dataIndex: "projects",
      key: "projects",
      render: (_, row) => {
        // console.log(_);
        return <Link to={`/projects/${row._id}`}><Button size="small">{_?.length || 0}/{_.reduce(
          (accumulator, item) => accumulator + item.resultImages.length,
          0,
        )}</Button></Link>;
      },
    },
    // {
    //   title: "Action",
    //   key: "_id",
    //   render: (_, row) => (
    //     <Space size="middle">
    //       <Button
    //         type="primary"
    //         size="small"
    //         onClick={() => {
    //           // if(row.activeSubscriptionId) {
    //             setSelectedUser(row);
    //             form.setFieldValue('property', row.plan?.property || 1);
    //             form.setFieldValue('document', row.plan?.document || 1);
    //             setShowGiveModal(true);
    //           // } else {
    //           //   message.warning("No active subscription.");
    //           // }
    //         }}
    //       >
    //         Give
    //       </Button>
    //       <Link to={`/admin/users/${row._id}/history`}>
    //         <Button type="dashed" danger size="small">View</Button>
    //       </Link>
    //     </Space>
    //   ),
    // },
  ];

  useEffect(() => {
    getUsers();
  }, [page, pageSize]);

  const getUsers = (current) => {
    setLoading(true);
    getAllUsers({
      ...formData,
      page: current || page,
      limit: pageSize,
    }).then((data) => {
      setLoading(false);
      setUsers(data.users.map((user) => ({ ...user, key: user._id })));
      setTotal(data.total);
    });
  };

  const handlePageChange = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setPageSize(pageSize);
  };

  const onSearch = () => {
    if (page == 1) {
      getUsers(1);
    } else {
      setPage(1);
    }
  };

  return (
    <div className="container mx-auto my-4">
      <Row gutter={[16, 16]}>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Name..."
            allowClear
            value={formData.name}
            name="name"
            size="large"
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Email..."
            allowClear
            value={formData.email}
            name="email"
            size="large"
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Utm Source..."
            allowClear
            value={formData.utm_source}
            name="utm_source"
            size="large"
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Utm Campaign..."
            allowClear
            value={formData.utm_campaign}
            name="utm_campaign"
            size="large"
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col span={24}>
          <Table
            loading={loading}
            columns={columns}
            dataSource={users}
            pagination={false}
          />
          <div className="text-right mt-2">
            <Pagination
              showQuickJumper
              showSizeChanger
              pageSize={pageSize}
              current={page}
              total={total}
              onChange={handlePageChange}
            />
          </div>
        </Col>
      </Row>
      <Modal
        open={showGiveModal}
        title="Increase plan"
        okText="Submit"
        cancelText="Cancel"
        onCancel={() => setShowGiveModal(false)}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              // console.log(values);
              setLoading(true);
              const res = await increasePlanLimit({
                ...values,
                userId: selectedUser._id,
              });
              message.success('Successfully change plan limit');
              getUsers();
              setShowGiveModal(false);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        okButtonProps={{ loading }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="property"
            label="Property"
            rules={[
              {
                required: true,
                message: "Please input the count of property",
              },
            ]}
          >
            <InputNumber className="w-full" size="large" min={1} />
          </Form.Item>
          <Form.Item
            name="document"
            label="Document"
            rules={[
              {
                required: true,
                message: "Please input the count of document",
              },
            ]}
          >
            <InputNumber className="w-full" size="large" min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Users;
