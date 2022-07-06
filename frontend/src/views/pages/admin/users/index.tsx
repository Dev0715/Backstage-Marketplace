import { ColDef, RowClassParams } from "ag-grid-community";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useState } from "react";
import { allUsers } from "../../../../helper/user";

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

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: "name", width: 170 },
      { field: "email", width: 240 },
      { field: "phone", width: 130 },
      { field: "email_verified", width: 180 },
      { field: "followers", width: 150 },
      { field: "wallet_address", width: 335 },
    ],
    []
  );
  const getRowClass = (params: RowClassParams) => {
    if (params.rowIndex % 2 === 0) return "odd-row";
  };

  return (
    <div
      className="container"
      style={{ marginBottom: 70, marginTop: 70, padding: 0, zIndex: 999 }}
    >
      <div className="see__users--header">
        <h1 className="see__users--title">See All Users</h1>
        <button
          type="button"
          className="sign__btn"
          onClick={createSuperUser}
          style={{ width: 340 }}
        >
          Create Super User
        </button>
      </div>
      <div
        className="ag-theme-alpine table-wrapper mb-5"
        style={{
          height: "700px",
          width: "100%",
          borderRadius: 18,
          border: "1px solid rgba(255, 255, 255, 0.33)",
          overflow: "hidden",
        }}
      >
        <AgGridReact
          className="w-full h-full ag-grid-table"
          rowClass={["custom-row"]}
          rowData={users}
          headerHeight={60}
          rowHeight={60}
          suppressHorizontalScroll
          columnDefs={columnDefs}
          getRowClass={getRowClass}
          suppressRowHoverHighlight={false}
        >
          <AgGridColumn
            headerName="NAME"
            field="name"
            cellClass={["date-time"]}
          ></AgGridColumn>
          <AgGridColumn
            headerName="EMAIL"
            field="email"
            cellClass={"color-type"}
          ></AgGridColumn>
          <AgGridColumn
            headerName="PHONE"
            field="phone"
            cellClass={"color-type"}
          ></AgGridColumn>
          <AgGridColumn
            headerName="VERIFIED EMAIL"
            field="email_verified"
            valueFormatter={(param) => (param.value === 1 ? "Yes" : "No")}
            cellClass={"color-type"}
          ></AgGridColumn>
          <AgGridColumn
            headerName="FOLLOWERS"
            field="followers"
            cellClass={"color-type"}
          ></AgGridColumn>
          <AgGridColumn
            headerName="WALLET ADDRESS"
            field="wallet_address"
            cellClass={"color-type"}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
};

export default PageAdminUsers;
