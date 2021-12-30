import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
<<<<<<< HEAD

import {
=======
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import {
  HeadsetMic,
>>>>>>> Hiep
  Settings,
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
<<<<<<< HEAD
=======
import Dot from "./components/Dot";
>>>>>>> Hiep

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
<<<<<<< HEAD
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
=======
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon color="primary" /> },
>>>>>>> Hiep
  {
    id: 1,
    label: "Animation",
    link: "/app/animation",
<<<<<<< HEAD
    icon: <TypographyIcon />,
  },
  { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  { id: 3, label: "Settings", link: "/app/settings", icon: <Settings />},
  { id: 4, label: "Sound", link: "/app/sound", icon: <Settings />},
=======
    icon: <FlutterDashIcon color="primary" />,
  },
  { id: 2, label: "History", link: "/app/tables", icon: <HistoryEduIcon color="primary" /> },
  { id: 3, label: "General Settings", link: "/app/settings", icon: <Settings color="primary"/>},
  { id: 4, label: "Sound Settings", link: "/app/soundSettings", icon: <HeadsetMic color="primary"/>},
>>>>>>> Hiep
  {
    id: 5,
    label: "Notifications",
    link: "/app/notifications",
<<<<<<< HEAD
    icon: <NotificationsIcon />,
=======
    icon: <NotificationsIcon color="primary"/>,
  },
  {
    id: 6,
    label: "UI Elements",
    link: "/app/ui",
    icon: <UIElementsIcon color="primary"/>,
    children: [
      { label: "Icons", link: "/app/ui/icons" },
      { label: "Charts", link: "/app/ui/charts" },
      { label: "Maps", link: "/app/ui/maps" },
    ],
>>>>>>> Hiep
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
<<<<<<< HEAD
          <SidebarLink
=======
          <SidebarLink className={classes.sidebarList}
>>>>>>> Hiep
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
