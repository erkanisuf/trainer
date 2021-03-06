import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../Context/Context";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import ModalCustomers from "./ModalCustomers";
import Confirm from "./Confirm";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: "100px",
    fontSize: "10px",
    padding: "5px",
    backgroundColor: "#8a1c1c",
    "&:hover": {
      backgroundColor: "#f44336",
    },
  },
  green: {
    margin: theme.spacing(1),
    width: "100px",
    fontSize: "10px",
    padding: "5px",
    backgroundColor: "#3b6120",
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },

  yellow: {
    margin: theme.spacing(1),
    width: "50px",
    fontSize: "10px",
    padding: "5px",
    backgroundColor: "#6e6d19",
    "&:hover": {
      backgroundColor: "#ffc107",
    },
  },
  update: {
    color: "#43a047",
    margin: "0 -5px",

    "&:hover": {
      color: "#68b36b",
    },
  },
  cancel: {
    color: "#f44336",
    margin: "0 -5px",
    "&:hover": {
      color: "#f50057",
    },
  },

  extendedIcon: {
    marginRight: "2px",
  },
}));

const ActionsRenderer = (props) => {
  const classes = useStyles();
  const { valueOne, valueTwo, valueThree } = useContext(MyContext);
  const [train] = valueTwo;
  const [customers] = valueOne;

  const [editing, setEditing] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [selfCustomer, setSelfCustomer] = useState({});
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState("");
  const handleClose = () => {
    //Modal Open
    setOpen(false);
  };
  const [startValue, setStartValue] = useState({});
  const [buttonClicked, setbuttonClicked] = useState(false);

  useEffect(() => {
    props.api.addEventListener("rowEditingStarted", onRowEditingStarted);
    props.api.addEventListener("rowEditingStopped", onRowEditingStopped);

    return () => {
      props.api.removeEventListener("rowEditingStarted", onRowEditingStarted);
      props.api.removeEventListener("rowEditingStopped", onRowEditingStopped);
    };
  });
  const [reFire, setReFire] = useState(1);
  const fetchUpdate = (link, object) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then((key) => console.log("Processing"))
      .then((key) => {
        setbuttonClicked(false); // Very Buggy this whole function , cant take off the Warning thats why had to put Refire useEffect
        setReFire(2);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    valueThree();
    setbuttonClicked(false);
  }, [reFire]);

  function stop(param) {
    fetchUpdate(param.data.links[1].href, param.data);
  }

  function onRowEditingStarted(params) {
    const previousData = JSON.parse(JSON.stringify(params.node.data));

    setStartValue(previousData);
    if (props.node === params.node) {
      setEditing(true);
    } else {
      setDisabled(true);
    }
  }

  function onRowEditingStopped(params) {
    if (!buttonClicked) {
      params.node.setData(startValue);
    }
    if (props.node === params.node) {
      if (isEmptyRow(params.data)) {
      } else {
        setEditing(false);
      }
    } else {
      setDisabled(false);
    }
  }

  function startEditing() {
    props.api.startEditingCell({
      rowIndex: props.rowIndex,
      colKey: props.column.colId,
    });
  }

  function stopEditing(bool) {
    setbuttonClicked(true);
    props.api.stopEditing(bool);
  }

  function isEmptyRow(data) {
    let dataCopy = { ...data };
    delete dataCopy.id;
    return !Object.values(dataCopy).some((value) => value);
  }

  const fetchCustomerTraining = (param) => {
    fetch(`${param}`, {
      credentials: "same-origin",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok)
          return Promise.reject(new Error(`HTTP Error ${res.status}`));

        return res.json();
      })
      .then((data) => {
        setTraining(data.content);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCustomerTraining(props.data.links[2].href);
  }, [train, props.data.links, customers]);

  function handleClick() {
    setSelfCustomer(props.data);
    fetchCustomerTraining(props.data.links[2].href);

    setOpen(true);
  }

  const handleOpenDialog = () => {
    // Yes No
    setSelfCustomer(props.data);
    setOpenDialog(true);
    setDeleteCustomer(props.data.links[1].href);
  };

  const handleCloseDialog = () => {
    // Yes No
    setOpenDialog(false);
  };
  const handleDeleteItem = () => {
    fetchDelete(deleteCustomer);
    setOpenDialog(false);
  };

  const fetchDelete = (param) => {
    fetch(`${param}`, { method: "DELETE" })
      .then((data) => {
        valueThree();
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateItem = () => {
    setbuttonClicked(true);
    props.api.addEventListener("rowEditingStopped", stop);

    stopEditing(false);
  };

  if (window.innerWidth <= 480) {
    return (
      <div style={{ width: "100%" }}>
        <IconButton
          variant="contained"
          color="secondary"
          style={{ width: "5px" }}
          onClick={handleOpenDialog}
        >
          <DeleteIcon />
        </IconButton>
        {editing ? (
          <span
            style={{
              borderRight: "1px solid grey",
              borderLeft: "1px solid grey",
              padding: "2px",
            }}
          >
            <IconButton
              aria-label="save"
              className={classes.update}
              onClick={handleUpdateItem}
              disabled={disabled}
            >
              <SaveIcon />
            </IconButton>

            <IconButton
              aria-label="delete"
              className={classes.cancel}
              onClick={() => stopEditing(true)}
              disabled={disabled}
            >
              <CancelIcon />
            </IconButton>
          </span>
        ) : (
          <>
            <IconButton
              style={{ color: "orange" }}
              variant="contained"
              color="secondary"
              onClick={startEditing}
              disabled={disabled}
            >
              <EditIcon />
            </IconButton>
          </>
        )}

        <IconButton
          style={{ color: "green", width: "5px" }}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          <FitnessCenterIcon />
        </IconButton>

        <ModalCustomers
          open={open}
          handleClose={handleClose}
          training={training}
          user={selfCustomer}
        />
        <Confirm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleDeleteItem={handleDeleteItem}
          user={selfCustomer}
        />
      </div>
    );
  } else
    return (
      <div style={{ width: "50%" }}>
        <Button
          startIcon={<DeleteIcon />}
          className={classes.margin}
          variant="contained"
          color="secondary"
          onClick={handleOpenDialog}
        >
          Delete
        </Button>
        {editing ? (
          <span
            style={{
              borderRight: "1px solid grey",
              borderLeft: "1px solid grey",
              padding: "2px",
            }}
          >
            <IconButton
              aria-label="save"
              className={classes.update}
              onClick={handleUpdateItem}
              disabled={disabled}
            >
              <SaveIcon />
              <span style={{ fontSize: "10px", color: "grey" }}>Save</span>
            </IconButton>

            <IconButton
              aria-label="delete"
              className={classes.cancel}
              onClick={() => stopEditing(true)}
              disabled={disabled}
            >
              <CancelIcon />
              <span style={{ fontSize: "10px", color: "grey" }}>Cancel</span>
            </IconButton>
          </span>
        ) : (
          <>
            <Button
              startIcon={<EditIcon />}
              className={classes.yellow}
              variant="contained"
              color="secondary"
              onClick={startEditing}
              disabled={disabled}
            >
              Edit
            </Button>
          </>
        )}

        <Button
          startIcon={<FitnessCenterIcon />}
          className={classes.green}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Trainings
        </Button>

        <ModalCustomers
          open={open}
          handleClose={handleClose}
          training={training}
          user={selfCustomer}
        />
        <Confirm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleDeleteItem={handleDeleteItem}
          user={selfCustomer}
        />
      </div>
    );
};

export default ActionsRenderer;
