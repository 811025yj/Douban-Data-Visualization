import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { Layout, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Books from "./components/Books";
import Register from "./components/Register";
import Login from "./components/Login";
import BooksByDecadeChart from "./components/BooksByDecadeChart";
import BooksByYearChart from "./components/BooksByYearChart";
import BooksByPublisherChart from "./components/BooksByPublisherChart";
import ScatterPlotByYearAndRating from "./components/ScatterPlotByYearAndRating";
import WordCloudComponent from "./components/WordCloud";
import ChatBot from "./components/ChatBot";
import Dialogue from "./components/Dialogue";
import Profile from "./components/Profile";

const { Header, Content, Sider } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const username = localStorage.getItem("username") || "Guest";

  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      window.location.href = "/profile";
    } else if (key === "logout") {
      handleLogout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">个人主页</Menu.Item>
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
  );

  return (
    <Router>
      <Layout className="layout">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <div
            className="logo"
            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
          >
            豆瓣读书数据可视化
          </div>
          <Dropdown overlay={menu}>
            <Button style={{ color: "white" }}>
              {username} <DownOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="vertical"
              defaultSelectedKeys={["1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/">图书数据管理</Link>
              </Menu.Item>
              <Menu.SubMenu key="sub1" title="数据分析">
                <Menu.Item key="0">
                  <Link to="/books-by-decade">数量面积图</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/books-by-year">曲线面积图</Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="3">
                <Link to="/books-by-publisher">数据统计</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/scatter-plot-by-year-and-rating">评分分析</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/word-cloud">词云分析</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/profile">个人主页</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content style={{ padding: "0 50px", marginTop: 16 }}>
              <div className="site-layout-content">
                <Routes>
                  <Route
                    path="/login"
                    element={<Login onLogin={handleLogin} />}
                  />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/"
                    element={
                      isAuthenticated ? <Books /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="/books-by-decade"
                    element={
                      isAuthenticated ? (
                        <BooksByDecadeChart />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/books-by-year"
                    element={
                      isAuthenticated ? (
                        <BooksByYearChart />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/books-by-publisher"
                    element={
                      isAuthenticated ? (
                        <BooksByPublisherChart />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/scatter-plot-by-year-and-rating"
                    element={
                      isAuthenticated ? (
                        <ScatterPlotByYearAndRating />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/word-cloud"
                    element={
                      isAuthenticated ? (
                        <WordCloudComponent />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />
                  <Route
                    path="/dialogue"
                    element={
                      isAuthenticated ? <Dialogue /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      isAuthenticated ? <Profile /> : <Navigate to="/login" />
                    }
                  />
                </Routes>
              </div>
            </Content>
          </Layout>
        </Layout>
        <ChatBot />
      </Layout>
    </Router>
  );
};

export default App;
