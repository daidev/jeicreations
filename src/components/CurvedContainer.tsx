import React from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core';

import CurvedUp from '../assets/curved-up.svg'
import CurvedDown from '../assets/curved-down.svg'

const useStyles = makeStyles((theme) => ({
  container: ({ color, variant }: any) => ({
    position: 'relative',
  }),
  title: ({ color }: any) => ({
    color: theme.palette.getContrastText(color),
    paddingBottom: theme.spacing(2),
  }),
}));

export default function Curvedcontainer({ color, title, children, variant = 'up' }) {
  const css = useStyles({ color, variant });
  return (
    <Box position="relative" p={0}>
    {variant == 'up' && (<CurvedUp fill={color} style={{ display: "block" }} />)}
    {variant == 'down' && (<CurvedDown fill={color} style={{ display: "block", position: "absolute", top: "-76px" }} />)}
      <Box bgcolor={color} key={title} p={3} paddingBottom={8} className={css.container}>
        {title && (
          <Typography variant="h3" className={css.title}>
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  )
}
