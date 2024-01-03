import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 999999999999999999999999999,
    position: "fixed",
    bottom: "2vh",
    backgroundColor: "#DCDCDC",
    color: "back",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#397BA6",
      backgroundColor: "#DCDCDC",
    },
    right: "5%",
  },
}));
const Scroll = (showBelow) => {
  const classes = useStyles();
  const [show, setShow] = useState(showBelow ? false : true);
  const handleScroll = () => {
    if (window.pageXOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };
  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });
  const handleClick = () => {
    window[`scrollTo`]({top: 0, behavior: `smooth`});
  };
  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} className={classes.toTop}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
};
export default Scroll;
