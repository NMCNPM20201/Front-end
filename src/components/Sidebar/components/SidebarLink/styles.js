import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
<<<<<<< HEAD
=======
    
>>>>>>> Hiep
  },
  externalLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    textDecoration: 'none'
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
=======
    textDecoration: 'none',
    
    
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
    
    
>>>>>>> Hiep
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#FFFFFF",
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
<<<<<<< HEAD
  },
  linkIconActive: {
    color: theme.palette.primary.main,
=======
    
  },
  linkIconActive: {
    color: theme.palette.primary.main,
    
>>>>>>> Hiep
  },
  linkText: {
    padding: 0,
    color: theme.palette.text.secondary + "CC",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
<<<<<<< HEAD
  },
  linkTextActive: {
    color: theme.palette.text.primary,
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
=======
    
  },
  linkTextActive: {
    color: theme.palette.text.primary,
    
  },
  linkTextHidden: {
    opacity: 0,
    
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
    
>>>>>>> Hiep
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
<<<<<<< HEAD
=======
    backgroundColor: "#fff !important !important"
>>>>>>> Hiep
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
<<<<<<< HEAD
    backgroundColor: "#D8D8D880",
=======
    backgroundColor: "#fff !important !important",
>>>>>>> Hiep
  },
}));
