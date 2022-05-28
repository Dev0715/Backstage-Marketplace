import { useEffect, useState } from "react";
import { allUsers } from "../../../../helper/user";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";

const PageAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    allUsers().then((res) => {
      if (res.success) {
        setUsers(res.users);
      }
    });
  }, []);

  const createSuperUser = () => {
    navigate("/admin/users/create");
  };

  return (
    <div className="container" style={{ marginBottom: 70, marginTop: 70 }}>
      <div className="row row--grid">
        <div className="col-12">
          <ul className="breadcrumb">
            <li className="breadcrumb__item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb__item breadcrumb__item--active">Users</li>
          </ul>
        </div>

        <div
          className="col-12"
          style={{ marginTop: "50px", marginBottom: "12px" }}
        >
          <div className="row row--grid">
            <div className="col-6 col-xl-9">
              <div
                className="main__title main__title--page"
                style={{ marginTop: 0 }}
              >
                <h1>Users</h1>
              </div>
            </div>
            <div className="col-6 col-xl-3">
              <button
                type="button"
                className="sign__btn"
                onClick={createSuperUser}
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                Create Super User
              </button>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div
            className="ag-theme-alpine table-wrapper mb-5"
            style={{ height: "500px", color: "white" }}
          >
            <AgGridReact
              className="w-full h-full ag-grid-table"
              rowClass={["custom-row"]}
              rowData={users}
            >
              <AgGridColumn
                headerName="Name"
                field="name"
                cellClass={["date-time"]}
              ></AgGridColumn>
              <AgGridColumn
                headerName="Email"
                field="email"
                cellClass={"color-type"}
              ></AgGridColumn>
              <AgGridColumn
                headerName="Phone"
                field="phone"
                cellClass={"color-type"}
              ></AgGridColumn>
              <AgGridColumn
                headerName="Verified Email"
                field="email_verified"
                valueFormatter={(param) => (param.value == 1 ? "Yes" : "No")}
                cellClass={"color-type"}
              ></AgGridColumn>
              <AgGridColumn
                headerName="Followers"
                field="followers"
                cellClass={"color-type"}
              ></AgGridColumn>
              <AgGridColumn
                headerName="Wallet Address"
                field="wallet_address"
                cellClass={"color-type"}
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAdminUsers;
