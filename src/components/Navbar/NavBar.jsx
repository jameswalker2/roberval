import { Menu } from "antd";
import { LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NavBar.scss";

export function NavBar() {
  const navigate = useNavigate();
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "#fff" : "",
    background: isActive ? "#7331f3" : "",
  });

  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <div className="flex">
        <Menu
          onClick={(item) => {
            navigate(item.key);
          }}
          items={[
            {
              label: "Dashboard",
              icon: <LayoutGrid size={20} strokeWidth={1.25} />,
              key: "/dashboard",
            },
          ]}
          mode="inline"
        />
      </div>
      {/* <nav>
        <IoSchoolSharp className="h1" />
        <ul className="home">
          <div className="hm">
            <div>
              <NavLink style={activeStyle} className="test" to={"/dashboard"}>
                <BiSolidDashboard className="img" />
                Dashboard
              </NavLink>
            </div>
          </div>
          <div className="hm">
            <div>
              <NavLink style={activeStyle} className="test" to={"/paiement"}>
                <BsCashCoin className="img" />
                Paiement
              </NavLink>
            </div>
          </div>
          <div className="pa">
            <div>
              <NavLink style={activeStyle} className="test" to={"/payroll"}>
                <FaUsersCog className="img" />
                Payroll
              </NavLink>
            </div>
          </div>
          <div className="ca">
            <div>
              <NavLink style={activeStyle} className="test" to={"/caisse"}>
                <MdAccountBalance className="img" />
                Caisse
              </NavLink>
            </div>
          </div>
        </ul>
      </nav> */}
    </>
  );
}
