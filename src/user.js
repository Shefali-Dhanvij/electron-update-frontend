// import React, { useState, useEffect } from "react";
// import MUIDataTable from "mui-datatables";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import SaveAsIcon from "@mui/icons-material/SaveAs";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Box, Button, Modal, Typography } from "@mui/material";
// import Swal from "sweetalert2";
// import axios from "axios";
// import AddUserForm from "./addUser";
// import constant from "./constant";
// export default function Users() {
//   const [data, setData] = useState([]);

//   const [addUserOpen, setAddUserOpen] = useState(false);
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null);

//   const handleAddUserOpen = () => {
//     setAddUserOpen(true);
//   };
//   const handleAddUserClose = () => {
//     setAddUserOpen(false);
//   };

//   const handleOpenUpdate = (userData) => {
//     console.log("userdaat==", userData);
//     setSelectedUserId(userData.id);
//     setOpenUpdate(true);
//   };

//   const handleCloseUpdate = () => {
//     setOpenUpdate(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${constant.baseurl}viewAllPlan`);
//       const result = response.data;

//       const formattedData = result.map((user) => ({
//         id: user._id,
//         name: `${user.firstName} ${user.lastName}`,
//         gender: user.gender,
//         dob: new Date(user.dob).toLocaleDateString(),
//         bloodGroup: user.bloodGroup,
//         maritalStatus: user.maritalStatus,
//         email: user.email,
//         mobileNo: user.mobileNo,
//         note: user.note,
//         status: "Active",
//       }));

//       setData(formattedData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleDelete = async (userId) => {
//     const confirmDelete = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#EE534F",
//       cancelButtonColor: "#689E38",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (confirmDelete.isConfirmed) {
//       try {
//         await axios.delete(`${constant.baseurl}deleteUser/${userId}`);

//         fetchData();
//         Swal.fire("Deleted!", "Your user has been deleted.", "success");
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         Swal.fire("Error", "Failed to delete the user.", "error");
//       }
//     }
//   };

//   const columns = [
//     {
//       name: "id", // Include 'id' here
//       label: "ID",
//       options: {
//         filter: false,
//         display: false, // Hide this column if not needed in the UI
//       },
//     },
//     {
//       name: "sr_no", // Define a unique name for this column
//       label: "SR No", // The column header
//       options: {
//         filter: false,
//         customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
//       },
//     },
//     {
//       name: "plan_name",
//       label: "Plan Name",
//       options: {
//         filter: true,
//       },
//     },
//     {
//       name: "duration",
//       label: "Duration",
//       options: {
//         filter: false,
//       },
//     },
//     {
//       name: "fees",
//       label: "Fees",
//       options: {
//         filter: false,
//       },
//     },
//     {
//       name: "description",
//       label: "Description",
//       options: {
//         filter: false,
//       },
//     },
//     {
//       name: "Actions",
//       options: {
//         filter: false,
//         customBodyRender: (value, tableMeta) => {
//           const rowData = tableMeta.rowData;
//           console.log("plans table row data==", rowData);
//           const planId = rowData[0];
//           return (
//             <div style={{ width: "150px" }}>
//               {/* <SaveAsIcon
//                 style={{
//                   marginRight: "10px",
//                   background: "#009AE4",
//                   borderRadius: "50%",
//                   padding: "4px",
//                   cursor: "pointer",
//                   color: "#fff",
//                   fontSize: "30px",
//                 }}
//                 onClick={() => openNewWindow(rowData[0])}
//               /> */}
//               <DeleteIcon
//                 style={{
//                   marginRight: "10px",
//                   background: "#EE534F",
//                   borderRadius: "50%",
//                   padding: "4px",
//                   cursor: "pointer",
//                   color: "#fff",
//                   fontSize: "30px",
//                 }}
//                 onClick={() => handleDelete(rowData[0])}
//               />
//             </div>
//           );
//         },
//       },
//     },
//   ];

//   const options = {
//     download: true,
//     print: false,
//     viewColumns: true,
//     filter: true,
//     filterType: "dropdown",
//     responsive: "vertical",
//     selectableRows: "none",
//   };

//   return (
//     <>
//       <Box
//         style={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}
//       >
//         <Button variant="contained" color="success" onClick={handleAddUserOpen}>
//           ADD
//         </Button>
//       </Box>

//       <MUIDataTable
//         title={"List"}
//         data={data}
//         columns={columns}
//         options={options}
//       />

//       <Modal
//         open={addUserOpen}
//         onClose={handleAddUserClose}
//         aria-labelledby="add-user-modal-title"
//         aria-describedby="add-user-modal-description"
//         className="adduser-model"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "80%", sm: "50%" },
//             height: "85%",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 2,
//             borderRadius: "4px",
//             overflowY: "auto",
//           }}
//         >
//           <AddUserForm open={addUserOpen} onClose={handleAddUserClose} />
//         </Box>
//       </Modal>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Modal, Typography } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import AddUserForm from "./addUser";
import constant from "./constant";
import backendApi from "./helper";

function Users() {
  const [data, setData] = useState([]);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleAddUserOpen = () => {
    setAddUserOpen(true);
  };
  const handleAddUserClose = () => {
    setAddUserOpen(false);
  };

  const handleOpenUpdate = (userData) => {
    console.log("userdaat==", userData);
    setSelectedUserId(userData.id);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `${constant.baseurl}viewAllPlan`;
    console.log("=========================", url);
    try {
      const response = await backendApi(url);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    // alert(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `${constant.baseurl}deletePlan/${id}`;
          console.log("url==", url);
          const data = id;
          await backendApi(url, data);
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
          const fetchData = async () => {
            const url = `${constant.baseurl}viewAllPlan`;
            console.log("=========================", url);
            try {
              const response = await backendApi(url);
              console.log(response);
              setData(response.data);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };

          fetchData();
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the item.",
            "error"
          );
        }
      }
    });
  };

  const columns = [
    {
      name: "id", // Include 'id' here
      label: "ID",
      options: {
        filter: false,
        display: false, // Hide this column if not needed in the UI
      },
    },
    {
      name: "sr_no", // Define a unique name for this column
      label: "SR No", // The column header
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "plan_name",
      label: "Plan Name",
      options: {
        filter: true,
      },
    },
    {
      name: "duration",
      label: "Duration",
      options: {
        filter: false,
      },
    },
    {
      name: "fees",
      label: "Fees",
      options: {
        filter: false,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: false,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          const rowData = tableMeta.rowData;
          console.log("plans table row data==", rowData);
          const planId = rowData[0];
          return (
            <div style={{ width: "150px" }}>
              {/* <SaveAsIcon
                style={{
                  marginRight: "10px",
                  background: "#009AE4",
                  borderRadius: "50%",
                  padding: "4px",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "30px",
                }}
                onClick={() => openNewWindow(rowData[0])}
              /> */}
              <DeleteIcon
                style={{
                  marginRight: "10px",
                  background: "#EE534F",
                  borderRadius: "50%",
                  padding: "4px",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "30px",
                }}
                onClick={() => handleDelete(rowData[0])}
              />
            </div>
          );
        },
      },
    },
  ];

  const options = {
    download: true,
    print: false,
    viewColumns: true,
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
    displayRowCheckbox: false,
    fixedHeader: true,
    selectableRows: "none",
    selectableRowsOnClick: true,
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleAddUserOpen}>
        ADD===
      </Button>

      <MUIDataTable
        title={"List"}
        data={data}
        columns={columns}
        options={options}
      />

      <Modal
        open={addUserOpen}
        onClose={handleAddUserClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
        className="adduser-model"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", sm: "50%" },
            height: "85%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: "4px",
            overflowY: "auto",
          }}
        >
          <AddUserForm open={addUserOpen} onClose={handleAddUserClose} />
        </Box>
      </Modal>
    </>
  );
}

export default Users;
