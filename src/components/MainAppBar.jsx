import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

import IconButton from "material-ui/IconButton";
import GitHubIcon from "./GitHubIcon";
import { withRouter } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

class MainAppBar extends Component {
  render() {
    const { classes, history } = this.props;
    return (
      <div>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              MHW Build
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/plan");
              }}
            >
              Plan
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/create");
              }}
            >
              Create
            </Button>
            <IconButton
              color="inherit"
              onClick={() => {
                window.location.href =
                  "https://github.com/alexmnguyen/mhwbuild";
              }}
              aria-label="Close"
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(MainAppBar));
