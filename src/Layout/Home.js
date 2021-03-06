import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import BarChartIcon from "@material-ui/icons/BarChart";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import EventIcon from "@material-ui/icons/Event";

const useStyles = makeStyles({
  first: {
    minWidth: 275,
    height: 200,
    backgroundColor: "white",

    marginBottom: "50px",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px",

    "&:hover": {
      backgroundColor: "#c8e6c9",
    },
  },
  second: {
    minWidth: 275,
    height: 200,
    backgroundColor: "white",
    marginBottom: "50px",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px",

    "&:hover": {
      backgroundColor: "#c8e6c9",
    },
  },
  third: {
    minWidth: 275,
    height: 200,
    marginBottom: "50px",
    backgroundColor: "white",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px",
    "&:hover": {
      backgroundColor: "#c8e6c9",
    },
  },
  fourth: {
    minWidth: 275,
    height: 200,
    marginBottom: "50px",
    backgroundColor: "white",
    borderRadius: "25px",
    transition: "0.3s",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      backgroundColor: "#c8e6c9",
    },
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: window.innerWidth <= 480 ? "80%" : "600px",
        flexWrap: "wrap",
        margin: "0 auto",
        justifyContent: "space-around",
        alignItems: "center",
        fontFamily: "Ubuntu, sans-serif",
        backgroundColor: "#eceff1",
        padding: "25px",
        borderRadius: "25px",
      }}
    >
      <Card className={classes.second}>
        <Link
          style={{
            color: "black",
            textDecoration: "none",
            width: "100%",
            height: "100%",
            padding: "10px",
            fontFamily: "Ubuntu, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to="/trainings"
        >
          <CardContent>
            <Typography
              style={{
                color: "black",
                fontFamily: "Ubuntu, sans-serif",
                textShadow: "2px 4px 3px rgba(0,0,0,0.1)",
              }}
              variant="h5"
              component="h2"
              color="textSecondary"
              gutterBottom
            >
              Trainings
              <div
                style={{
                  transform: "scale(3)",
                  marginTop: "28px",
                  color: "#4caf50",
                }}
              >
                <FitnessCenterIcon />
              </div>
            </Typography>
          </CardContent>
        </Link>
      </Card>
      <Card className={classes.third}>
        <Link
          style={{
            color: "black",
            textDecoration: "none",
            width: "100%",
            height: "100%",
            padding: "10px",
            fontFamily: "Ubuntu, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to="/customers"
        >
          <CardContent>
            <Typography
              style={{
                color: "black",
                fontFamily: "Ubuntu, sans-serif",
                textShadow: "2px 4px 3px rgba(0,0,0,0.1)",
              }}
              variant="h5"
              component="h2"
              color="textSecondary"
              gutterBottom
            >
              Customers
              <div
                style={{
                  transform: "scale(3)",
                  marginTop: "28px",
                  color: "#4caf50",
                }}
              >
                <EmojiPeopleIcon />
              </div>
            </Typography>
          </CardContent>
        </Link>
      </Card>
      <Card className={classes.fourth}>
        <Link
          style={{
            color: "black",
            textDecoration: "none",
            width: "100%",
            height: "100%",
            padding: "10px",
            fontFamily: "Ubuntu, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to="/calendar"
        >
          <CardContent>
            <Typography
              style={{
                color: "black",
                fontFamily: "Ubuntu, sans-serif",
                textShadow: "2px 4px 3px rgba(0,0,0,0.3)",
              }}
              variant="h5"
              component="h2"
              color="textSecondary"
              gutterBottom
            >
              Calendar
              <div
                style={{
                  transform: "scale(3)",
                  marginTop: "28px",
                  color: "#4caf50",
                }}
              >
                <EventIcon />
              </div>
            </Typography>
          </CardContent>
        </Link>
      </Card>
      <Card className={classes.first}>
        <Link
          style={{
            color: "black",
            textDecoration: "none",
            width: "100%",
            height: "100%",
            padding: "10px",
            fontFamily: "Ubuntu, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to="/datastats"
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              color="textSecondary"
              gutterBottom
              style={{
                color: "black",
                fontFamily: "Ubuntu, sans-serif",
                textShadow: "2px 4px 3px rgba(0,0,0,0.3)",
              }}
            >
              Data Table
              <div
                style={{
                  transform: "scale(3)",
                  marginTop: "28px",
                  color: "#4caf50",
                }}
              >
                <BarChartIcon />
              </div>
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};

export default Home;
