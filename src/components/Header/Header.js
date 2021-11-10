import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography } from "../Wrappers";
import Notification from "../Notification/Notification";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const notifications = [
  { 
    color: "warning", 
    type: "notification",
    message: "Check out this awesome ticket" 
  },
  {
    color: "success",
    type: "notification",
    message: "What is the best way to get ...",
  },
  {
    color: "secondary",
    type: "notification",
    message: "This is just a simple notification",
  },
  {
    color: "primary",
    type: "notification",
    message: "12 new orders has arrived today",
  },
];

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [isSearchOpen, setSearchOpen] = useState(false);
  var [notificationsData, setNotificationsData] = useState([]);
  var ws = useRef(null);

  const onMessage = (event) => {
    let recv = JSON.parse(event.data);
    setNotificationsData((values) => {
      let newData = [...values];
      newData.push({
        color: "primary",
        type: "notification",
        message: recv.data,
      });
      if (newData.length > 5) {
        newData = newData.slice(1);
      }
      return newData;
    });
  }

  /*useEffect(() => {
    ws.current = new WebSocket("localhost:3000");
    ws.current.onmessage = onMessage;
    const interval = setInterval(() => ws.current.send("echo"), 1000);
    return () => {
      ws.current.close();
      clearInterval(interval);
    }
  }, []);*/

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Donation GIFs Webapp
        </Typography>
        <div className={classes.grow} />
        <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications/* {notificationsData} */.map(notification => (
            <MenuItem
              /*key={notification.id}*/
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
