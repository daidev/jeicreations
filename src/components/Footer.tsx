import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import Copyright from "./Copyright";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#BDC4E0",
    marginTop: '215px',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-215px',
      left: 0,
      width: '100%',
      height: '215px',
      background: "url('/wave2.svg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }
  },
});

const Links = () => {
  return null;
}

export default function Footer() {
  const css = useStyles();
  return (
    <Box className={css.container}>
      <Links />
      <Copyright />
    </Box>
  )
}