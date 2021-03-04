import { AppProps } from "next/app";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      justifyContent: "flex-start",
      fontWeight: "bolder",
      fontSize: "1.5rem",
    },
    appBar: {
      background: "#3a3a3a",
      color: "#fff",
    },
  }),
);

function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();

  return (
    <Container>
      <AppBar
        elevation={5}
        position="static"
        color="transparent"
        className={classes.appBar}
      >
        <Toolbar>
          <Typography color="inherit" className={classes.title}>
            randomQgen
          </Typography>
          <Link href="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/info">
            <Button color="inherit">Why randomQGen?</Button>
          </Link>
          <Link href="/start">
            <Button color="inherit">Get Started</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
