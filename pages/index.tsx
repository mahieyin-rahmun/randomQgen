import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MuiPaperWithStyle from "../components/custom/MuiPaperWithStyle";


const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    textQ: {
      color: "orange",
      fontWeight: "bold"
    },
    textMargin: {
      paddingTop: "2.5rem",
      paddingBottom: "0.5rem"
    },
    button: {
      background: `linear-gradient(96deg, rgba(208,70,10,1) 0%, rgba(255,148,15,1) 100%, rgba(180,175,0,1) 100%)`,
      color: "#fff",
      marginTop: "2.5rem",
      width: "15rem",
      height: "4rem",
      borderRadius: "2rem"
    }
  })
);

const Home = () => {
  const classes = useStyles();  

  return (
    <div>
      <Head>
        <title>randomQgen</title>
      </Head>

      <MuiPaperWithStyle>
        <Typography variant="h2" className={classes.textMargin}>
          Hello from random
          <span className={classes.textQ}>Q</span>
          gen
        </Typography>
        
        <Typography variant="h4" className={classes.textMargin}>
          Generate random questions for your students <br/> from PDF sets you provide! 😉 <br/>
        </Typography>  
        
        <Link href="/start" passHref>
          <Button 
            variant="contained" 
            size="large"
            startIcon={<SendRoundedIcon />}
            className={classes.button} 
            >
            Get Started
          </Button>
        </Link>
      </MuiPaperWithStyle>
    </div>
  );
}

export default Home;