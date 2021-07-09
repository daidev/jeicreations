import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from 'clsx';
import PenCircle from "../assets/pen-circle.svg";

const useStyles = makeStyles({
  nav: {
    position: 'absolute',
    padding: '20px',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  listItem: {
    margin: "20px",
    display: "inline-block",
    cursor: "pointer",
    zIndex: 1,
    position: "relative",
    '&:hover': {
      '& > $circle': {
        strokeDasharray: '180px 278px',
        stroke: "#f4c8e4",
        transition: 'stroke .25s ease .1s, stroke-dasharray .35s',
      }
    },
  },
  item: {
    position: 'relative',
    zIndex: 2,
  },
  active: {
    '& > $circle': {
      stroke: "#F2CEAE",
      strokeDasharray: '180px 278px',  
      transition: 'stroke .25s ease .1s, stroke-dasharray .35s',
    }
  },
  circle: {
    width: '100px',
    height: '55px',
    position: 'absolute',
    zIndex: 0,
    left: '50%',
    top: '-100%',
    transform: 'translate(-50%, 7px) translateZ(0)',
    fill: 'none',
    stroke: "#f4c8e4",
    strokeLinecap: "round",
    strokeWidth: '2px',
    strokeDasharray: '69px 278px',
    strokeDashoffset: '361px',
    transition: 'stroke .25s ease .0s, stroke-dasharray .35s',
  },
});

export default function Navigation() {
  const router = useRouter();
  const css = useStyles();
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li className={clsx(css.listItem, {[css.active]: router.pathname === "/" } )}>
          <Link href="/" as="/">
            <Typography
              variant="body1"
              className={css.item}
            >
              About
            </Typography>
          </Link>
          <PenCircle className={css.circle}/>
        </li>
        <li className={clsx(css.listItem, {[css.active]: router.pathname.startsWith("/products") } )}>
          <Link href="/products">
            <Typography
              variant="body1"
              className={css.item}
            >
              Products
            </Typography>
          </Link>
          <PenCircle className={css.circle}/>
        </li>
        <li className={clsx(css.listItem, {[css.active]: router.pathname.startsWith("/posts") } )}>
          <Link href="/posts">
            <Typography
              variant="body1"
              className={css.item}
            >
              Posts
            </Typography>
          </Link>
          <PenCircle className={css.circle}/>
        </li>
      </ul>
    </nav>
  );
}
