import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

const actionData = [{

    name : "Logout",
    icon: <LogoutIcon />
},
{

    name : "Profile Setting",
    icon: <SettingsApplicationsIcon />
}
]

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Actions</DialogTitle>
      <List sx={{ pt: 0 }} style={{ margin: "0.5rem 1rem" }}>
        {actionData.map((actionData) => (
          <ListItem
            button
            onClick={() => handleListItemClick(actionData.name)}
            key={actionData.name}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              {actionData.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={actionData.name} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        ></ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function ProfileIcon() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  React.useEffect(() => {
    if (selectedValue === "Logout") {
      localStorage.removeItem("auth");
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Avatar
        sx={{ bgcolor: "white", color: blue[600], cursor: "pointer" }}
        onClick={handleClickOpen}
      >
        <PersonIcon style={{ fontSize: "1.5rem" }} />
      </Avatar>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
