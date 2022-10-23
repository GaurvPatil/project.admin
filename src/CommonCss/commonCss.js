import { Button, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { purple } from "@mui/material/colors";

export const useStyles = makeStyles((theme) => ({
  // boxshadow
  boxshadow: {
    padding: "1rem",
    background: "white",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },

  // flexBoxes Style (center items)
  centerItem: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  contetnJustify: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexInitiate: {
    display: "flex",
  },
  flexColumn: {
    flexDirection: "column",
  },
  flexRow: {
    flexDirection: "row",
  },

  // width 100%
  fullWidth: {
    width: "100%",
  },

  halfWidth: {
    width: "50%",
  },

  // font css
  boldFonts: {
    fontWeight: "bold",
  },

  // container gap  margins
  gapMT: {
    marginTop: "2rem",
  },
  gapMT1: {
    marginTop: "1rem",
  },

}));

// Buttons
export const GreenButton = styled(Button)({
  background: "green",
  color: "white",
  fontWeight: "bold",
  marginRight: "1rem",
});

export const RedButton = styled(Button)({
  backgroundColor: purple[500],
  color: "white",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: purple[700],
  },
});
