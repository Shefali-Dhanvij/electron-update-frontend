import { Button, Paper } from "@mui/material";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import constant from "./constant";
import backendApi from "./helper";
import Swal from "sweetalert2";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SaveIcon from "@mui/icons-material/Save";

function AddUserForm() {
  const [duration, setDuration] = useState("");

  const [formData, setFormData] = useState({
    plan_name: "",
    duration: "",
    fees: "",
    description: "",
  });

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  // State variables for error messages
  const [plan_nameError, setPlanError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [feesError, setFeesError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the corresponding error state
    if (name === "plan_name") {
      setPlanError("");
    } else if (name === "duration") {
      setDurationError("");
    } else if (name === "fees") {
      setFeesError("");
    }
    console.log(formData);
  };

  const handleSubmit = async () => {
    // Validate name and email fields
    let isValid = true;

    console.log(isValid);

    if (formData.plan_name.trim() === "") {
      setPlanError("plan is required");
      isValid = false;
    } else {
      setPlanError("");
    }

    if (formData.duration.trim() === "") {
      setDurationError("Duration is required");
      isValid = false;
    } else {
      setDurationError("");
    }

    if (formData.fees.trim() === "") {
      setFeesError("fees is required");
      isValid = false;
    } else {
      setFeesError("");
    }

    if (isValid) {
      const url = `${constant.baseurl}addPlan`;
      console.log(url);
      try {
        const response = await backendApi(url, formData);
        console.log("Response from server:", response);
        // Clear the form after successful submission

        Swal.fire({
          title: "Success!",
          text: "Expense added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          setFormData({
            plan_name: "",
            duration: "",
            fees: "",
            description: "",
          });
          window.close();
        });
        isValid = true;
        if (window.opener) {
          const event = new Event("planAdded");
          window.opener.dispatchEvent(event);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      plan_name: "",
      duration: "",
      fees: "",
      description: "",
    });
    setDuration("");
  };

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Paper>
        <Box>
          <Typography
            variant="h5"
            style={{ textAlign: "center", fontWeight: "700" }}
          >
            Add Plans=============
          </Typography>
          <Grid container style={{ padding: "0 1rem", marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={4} xs={6}>
                <TextField
                  autoComplete="planname"
                  name="plan_name"
                  required
                  fullWidth
                  id="plan_name"
                  label="Plans Name"
                  autoFocus
                  margin="normal"
                  value={formData.plan_name}
                  onChange={handleFormChange}
                  error={!!plan_nameError}
                  helperText={plan_nameError}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={6} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="duration">Duration month *</InputLabel>
                  <Select
                    labelId="duration-select-label"
                    id="duration"
                    name="duration"
                    required
                    value={formData.duration}
                    label="Duration month *"
                    onChange={handleFormChange}
                    error={!!durationError}
                    helperText={durationError}
                  >
                    <MenuItem value="1">1 </MenuItem>
                    <MenuItem value="2">2 </MenuItem>
                    <MenuItem value="3">3 </MenuItem>
                    <MenuItem value="4">4 </MenuItem>
                    <MenuItem value="5">5 </MenuItem>
                    <MenuItem value="6">6 </MenuItem>
                    <MenuItem value="7">7 </MenuItem>
                    <MenuItem value="8">8 </MenuItem>
                    <MenuItem value="9">9 </MenuItem>
                    <MenuItem value="10">10 </MenuItem>
                    <MenuItem value="11x">11 </MenuItem>
                    <MenuItem value="12">12 </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                sm={4}
                xs={12}
                style={{ paddingTop: isMobile ? "0px" : "16px" }}
              >
                <TextField
                  autoComplete="memnerid"
                  name="fees"
                  type="number"
                  required
                  fullWidth
                  id="fees"
                  label="fees "
                  margin="normal"
                  value={formData.fees}
                  onChange={handleFormChange}
                  error={!!feesError}
                  helperText={feesError}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} lg={12} sm={12} xs={12}>
                <TextField
                  autoComplete="memnerid"
                  name="description"
                  fullWidth
                  id="description"
                  label="Description"
                  margin="normal"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              style={{ marginRight: "20px" }}
              onClick={resetForm}
              startIcon={<RestartAltRoundedIcon />}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={<SaveIcon />}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default AddUserForm;
