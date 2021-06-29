import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  root: {
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    textAlign: "center",
    transition: "all 0.2s",
  },
  menu: {
    background: "rgba(0, 0, 0, 0.419)",
    padding: 0,
  },
  kebabOptionsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  kebabOptionsHeader: {
    paddingRight: "1rem",
    borderRight: "1px solid rgb(0, 0, 0)",
  },
}));
