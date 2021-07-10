import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from 'next/image'

import { SocialList } from "./SocialList";

const useStyles = makeStyles({
  container: {
    backgroundColor: '#fffdf7',
    padding: "50px",
    borderBottomLeftRadius: '50% 30%',
    borderBottomRightRadius: '50% 30%',
  },
  image: {},
});

export default function Hero() {
  const css = useStyles();
  return (
    <Box
      className={css.container}
      justifyContent="center"
      textAlign="center"
      display="flex"
    >
      <Image
        height="332"
        width="730"
        src="/LogoIllustration.png"
        alt="Logo"
        objectPosition="center"
      />
      {/* <SocialList /> */}
    </Box>
  )
}