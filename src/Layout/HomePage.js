import { useEffect, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import {
  LogoutOutlined,
  MenuOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons/lib/icons";
import { Avatar, Layout, Typography } from "antd";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/carr.jpg";
import { setUser } from "../redux/auth.slice";
import Footer from "../components/Footer";

const { Sider, Header, Content } = Layout;

const NavMenu = [
  {
    key: "Dashboard",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
    to: "",
  },
  {
    key: "Add Images",
    icon: <UserOutlined />,
    label: "Add Images",
    to: "add",
  },

];


const CustomerNavMenu = [
  {
    key: "Dashboard",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
    to: "",
  },
];

function HomePage() {
  const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  const userType = useSelector((st) => st?.user?.user?.userType);

console.log("UT:", userType);
  useEffect(() => {
    if (!userType) {
      const userLocal = localStorage.getItem("currentUser");
      if (userLocal) {
        dispatch(setUser(JSON.parse(userLocal)));
      }
    }
  }, [userType]);

  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: "grey" }}
      className="flex"
    >
      <Sider
        breakpoint="lg"
        collapsedWidth={showSidebar ? "256px" : "0"}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          setShowIcon(collapsed);
        }}
        className="z-20 flex flex-col overflow-hidden h-screen  bg-white [&>div]:flex [&>div]:flex-col"
      >
        <div className="flex h-32 shrink-0 items-center justify-center bg-brand  flex-col gap-4 py-4 text-white bg-black">
          <img src={logo} className=" h-20 w-20 " alt="my.eco-logo" />
          <h2 className="text-xl font-bold">Image Gallery</h2>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          {userType === "ADMIN" ? (
            <div>
              {NavMenu.map((links) => (
                <NavLink
                  key={links.key}
                  to={`${links.to}`}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex h-12 w-full items-center gap-2 border-r-4 border-brand bg-red-50 p-2 pl-5 font-semibold  text-red-600"
                      : "flex h-12 w-full items-center gap-2 p-2 pl-5 font-semibold text-black transition-all ease-in-out hover:bg-red-50 bg-white"
                  }
                >
                  {links.icon}
                  {links.label}
                </NavLink>
              ))}
            </div>
          ) : (
            <div>
              {CustomerNavMenu.map((links) => (
                <NavLink
                  key={links.key}
                  to={`${links.to}`}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex h-12 w-full items-center gap-2 border-r-4 border-brand bg-red-50 p-2 pl-5 font-semibold  text-red-600"
                      : "flex h-12 w-full items-center gap-2 p-2 pl-5 font-semibold text-black transition-all ease-in-out hover:bg-red-50 bg-white"
                  }
                >
                  {links.icon}
                  {links.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
   {userType==="ADMIN"||userType==="CUSTOMER" ?  <div className="bg-white">
          <button
            onClick={handleLogout}
            className="flex h-12 w-full items-center gap-2 p-2 pl-5 font-semibold text-black transition-all ease-in-out hover:bg-red-50"
          >
            <LogoutOutlined />
            Logout
          </button>
        </div>: <></>}
      </Sider>
      <Layout className="z-10 h-screen">
        <Header
          className={`flex items-center ${
            showIcon ? "justify-between" : "justify-end"
          }  bg-white`}
        >
          {showIcon ? (
            <MenuOutlined onClick={() => setShowSidebar(!showSidebar)} />
          ) : (
            ""
          )}
          {userType === "" ? (
            <div className="flex">
              <Link to="/login">
                <span className="bg-red-500 text-[#fff] px-6 py-2 rounded-xl mr-4">
                  {" "}
                  Login{" "}
                </span>
              </Link>
              <Link to="/register">
                <span className="bg-red-500 text-[#fff] px-6 py-2 rounded-xl">
                  Register
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Avatar
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("customerProfile")}
              />
            </div>
          )}
        </Header>
        
        <Content className=" overflow-y-auto px-8 pt-12 h-screen">
          <Typography.Text className="font-semibold">
            {/* <Breadcrumb /> */}
          </Typography.Text>
          <Outlet />
          <Footer />
        </Content>
    
    
      </Layout>
   
   
    </Layout>
     
  );
}

export default HomePage;
