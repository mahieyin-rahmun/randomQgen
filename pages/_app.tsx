import { AppProps } from "next/app";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      textWeight: "bold"
    },
    appBar: {
      background: "#3a3a3a",
      color: "#fff"      
    }
  }),
);

function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();

  return (
    <Container>
      <AppBar elevation={5} position="static" color="transparent" className={classes.appBar}>
        <Toolbar>
          <Link href="/">
            <Typography variant="h5" className={classes.title}>
              randomQgen
            </Typography>
          </Link>
          <Button color="inherit">
            Why randomQGen?
          </Button>
          <Button color="inherit">
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp;
