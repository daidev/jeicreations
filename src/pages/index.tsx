import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import clsx from  'clsx';
import Image from 'next/image'
import Link from 'next/link';

import Layout from "../components/Layout";
import CardStack, { Variant } from "../components/CardStack";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Scissor from "../assets/scissor.svg";
import Hand from "../assets/hand.svg";
import Gift from "../assets/gift.svg";
import useCategories from "../hooks/useCategories";

const useStyles = makeStyles({
  itemContainer: {
    position: 'relative',
    padding: "100px 0",
    margin: '50px 15px',
    '& > *': {
      position: 'relative',
      zIndex: 2,
    },
    '&:before': {
      content: '" "',
      position: 'absolute',
      zIndex: 1,
      height: '650px',
      width: '100%',
      backgroundRepeat: "no-repeat",
      //  width: 500px;
      //  height: 40px;
    },
  },
  ink1: {
    '&:before': {
      left: '63px',
      top: '-50px',
      backgroundImage: "url('/ink1.svg')",
    },
  },
  ink2: {
    '&:before': {
      right: '-60px',
      top: '-50px',
      backgroundImage: "url('/ink2.svg')",
    },
  },
  ink3: {
    '&:before': {
      left: '-10px',
      top: '-120px',
      backgroundImage: "url('/ink3.svg')",
    },
  },
  categoriesContainer: {
    background: "linear-gradient(180deg, #F5C8E4, transparent)",
    minHeight: '700px',
    paddingTop: '250px',
    position: 'relative',
    '&:before': {
      // transform: 'rotate(180deg)',
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '215px',
      background: "url('/wave.svg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }
  },
  catogoriesTitle: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: '25px',
  },
  rainbowText: {
    backgroundImage: 'linear-gradient(#EDBCDD, #F2CEAE)',
    backgroundSize: '100%',
    backgroundRepeat: 'repeat',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitTextStrokeColor: '#000000',
    WebkitTextStrokeWidth: '1px',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  card: {
    width: '500px',
  }
});

const Services = () => {
  const css = useStyles();

  const services = [{
    title: 'Hand Made',
    icon: Scissor,
    classname: css.ink1,
  },
  {
    title: 'ECO Friendly',
    icon: Hand,
    classname: css.ink2,
  },
  {
    title: 'Personalized',
    icon: Gift,
    classname: css.ink3,
  }];

  
  return (
    <Grid container>
      {services.map(({ title, icon: Icon, classname }) => (
        <Grid item md={4} xs={12} key={title}>
          <Box textAlign="center" className={clsx(css.itemContainer, classname)}>
            <Icon />
            <Typography>{title}</Typography>
          </Box>
        </Grid> 
      ))}
    </Grid>
  );
}


const Categories = () => {
  const css = useStyles();
  const { categories } = useCategories();

  return (
    <Box className={css.categoriesContainer}>
      <Typography variant="h1" align="center" className={clsx(css.catogoriesTitle, css.rainbowText)}>
        Categories
      </Typography>
      <Box display="flex" padding={3}>
        <Grid container>
          {categories.map(({ name, img, slug }) => (
            <Grid item xs={12} md={6} key={name}>
              <Box p={2}>
                <CardStack classNames={css.card} variant={Variant.FAN_LEFT} density={15}>
                  <Image
                    height="332"
                    width="730"
                    src={img}
                    alt={name}
                    objectPosition="center"
                  />
                  <Box p={0} marginTop={2}>
                    <Link href={{ pathname: 'products', query: { category: slug }}} passHref>
                      <Typography
                        variant="overline"
                        align="center"
                        display="block"
                      >
                        {name}
                      </Typography>
                    </Link>
                  </Box>
                </CardStack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

const Contacts = () => {
  const css = useStyles();
  return (
    <Box m={2}>
      <Typography variant="h1" align="center" className={css.rainbowText}>
        Contacts
      </Typography>
      <Box display="flex" padding={3}>
        hello, 
      </Box>
    </Box>
  )
}

const Home = () => (
  <>
    <Services />
    <Categories />
    <Contacts />
  </>
);

export default function Index() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <Home />
    </Layout>
  );
}
