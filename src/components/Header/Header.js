import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";

import {
  StompSessionProvider,
  useSubscription,
} from "react-stomp-hooks";

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
  const SubscribingComponent = () => {
    const [notificationsMenu, setNotificationsMenu] = useState(null);
    const [notificationsData, setNotificationsData] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState(0);

    const classes = useStyles();
    const layoutState = useLayoutState();
    const layoutDispatch = useLayoutDispatch();

    const onMessage = async (msg) => {
      setNotificationsData((values) => {
        let newData = [...values];
        newData.unshift({
          color: "primary",
          type: "notification",
          message: msg.body,
        });
        if (newData.length > 5) {
          newData.splice(newData.length - 1, 1);
        }
        return newData;
      });
      setUnreadNotifications(values => values + 1);
    }

    /*const setMessage = (msg) => {
      setNotificationsData((values) => {
        let newData = [...values];
        newData.unshift({
          color: "primary",
          type: "notification",
          message: msg,
        });
        if (newData.length > 5) {
          newData.splice(newData.length - 1, 1);
        }
        return newData;
      });
      setUnreadNotifications(values => values + 1);
    }*/
  
    useSubscription("/topic/message", async (message) => await onMessage(message));
    /*useEffect(() => {
      setMessage("Cam on ban A da donate 100000 dong");
      setTimeout(() => setMessage("Cam on ban B da donate 200000 dong"), 3000);
      setTimeout(() => setMessage("Cam on ban B da donate 300000 dong"), 6000);
      setTimeout(() => setMessage("Cam on ban B da donate 400000 dong"), 9000);
      setTimeout(() => setMessage("Cam on ban B da donate 500000 dong"), 12000);
      setTimeout(() => setMessage("Cam on ban B da donate 600000 dong"), 15000);
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
          <IconButton
            color="inherit"
            aria-haspopup="true"
            aria-controls="mail-menu"
            onClick={e => {
              if (unreadNotifications) {
                setNotificationsMenu(e.currentTarget);
                setUnreadNotifications(0);
              }
            }}
            className={classes.headerMenuButton}
          >
            <Badge
              badgeContent={unreadNotifications ? unreadNotifications : null}
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
            {notificationsData.map(notification => (
              <MenuItem
                /*key={notification.id}*/
                onClick={() => { setNotificationsMenu(null); setUnreadNotifications(0); }}
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

  return (
    <StompSessionProvider
        url={"https://web-donate.herokuapp.com/gs-guide-websocket"}
        debug={(str) => {
            console.log(str);
        }}
    >
      <SubscribingComponent />
    </StompSessionProvider>
  );
}
