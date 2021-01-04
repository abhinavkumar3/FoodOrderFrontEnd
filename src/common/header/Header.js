import React, { Component } from 'react';
import './Header.css';
import { Input, Menu, Button, InputAdornment, MenuList, Link, MenuItem } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// Custom Styles to over ride material ui default styles
const styles = (theme => ({
    searchText: { //Style for Search box
        'color': 'white',
        '&:after': {
            borderBottom: '2px solid white',
        }
    },
    loginButton: { //Style for Login Button
        "font-weight": 400,
        "margin": "8px 8px 8px 8px"

    },
    formButton: { //Style for the Form Buttons
        "font-weight": 400,
    },
    tab: { // Tab Styling 
        "font-weight": 400,
    },
    formControl: { // Form Control Styling
        "width": "80%",
    },
    profileButton: { // Profile Button Styling
        color: "#c2c2c2",
        "text-transform": "none",
        "font-weight": 400,
        "padding": "8px 8px 8px 8px",
    },
    menuItems: {  //Style for the menu items 
        "text-decoration": "none",
        "color": "black",
        "text-decoration-underline": "none",
        "padding-top": "0px",
        "padding-bottom": "0px",
    },
    menuList: { //Styling for the menulist component
        padding: "0px"
    }


}))
const customStyles = { // Style for the Modal
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            menuIsOpen: false,
            value: 0,
            contactNoRequired: "dispNone",
            contactno: "",
            passwordRequired: "dispNone",
            password: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: ""
        };
    }
    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            contactNoRequired: "dispNone",
            contactno: "",
            passwordRequired: "dispNone",
            password: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: ""
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    loginClickHandler = () => {
        if (this.state.contactno === "" || this.state.password === "") {
            this.state.contactno === "" ? this.setState({ contactNoRequired: "dispBlock" }) : this.setState({ contactNoRequired: "dispNone" });
            this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        } else {
            this.loginValidations();
        }
    }

    inputcontactnoChangeHandler = (e) => {
        this.setState({ contactno: e.target.value });
    }

    inputpasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    registerClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });
    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    //This method is called when the input in Search Box is changed.
    //This in turn calls the function updateSearchRestaurant in the home page to update the searched restaurant list.
    inputSearchChangeHandler = (e) => {
        let searchOn = true
        if (!(e.target.value === "")) {
            let dataRestaurant = null;
            let that = this
            let xhrSearchRestaurant = new XMLHttpRequest();

            xhrSearchRestaurant.addEventListener("readystatechange", function () {
                if (xhrSearchRestaurant.readyState === 4 && xhrSearchRestaurant.status === 200) {
                    var restaurant = JSON.parse(this.responseText).restaurants;
                    that.props.updateSearchRestaurant(restaurant, searchOn);
                }
            })

            xhrSearchRestaurant.open('GET', this.props.baseUrl + 'restaurant/name/' + e.target.value)
            xhrSearchRestaurant.setRequestHeader("Content-Type", "application/json");
            xhrSearchRestaurant.setRequestHeader("Cache-Control", "no-cache");
            xhrSearchRestaurant.send(dataRestaurant);

        } else {
            let restaurant = [];
            searchOn = false
            this.props.updateSearchRestaurant(restaurant, searchOn);

        }
    }

    //Validation of login points
    //If all the parameters are right then returns true for the api call to be made if not displays the relevant error message.
    loginValidations = () => {
        let loginContactNoRequired = "dispNone";
        let loginPasswordRequired = "dispNone";
        let inValidLoginContact = "dispNone";
        let isFormValid = true;
        if (this.state.loginContactNo === "") { //check for contact not empty 
            loginContactNoRequired = "dispBlock";
            isFormValid = false;
        }
        if (this.state.loginPassword === "") { //Check for password not empty 
            loginPasswordRequired = "dispBlock"
            isFormValid = false;
        }
        if (this.state.loginContactNo !== "") { //Check for contact format
            var contactNo = "[7-9][0-9]{9}";
            if (!this.state.loginContactNo.match(contactNo)) {
                inValidLoginContact = "dispBlock"
                isFormValid = false;
            }
        }
        this.setState({
            loginContactNoRequired: loginContactNoRequired,
            loginPasswordRequired: loginPasswordRequired,
            inValidLoginContact: inValidLoginContact
        })
        return (isFormValid);
    }

    render() {
        // Styles are stored in the const classes
        const { classes } = this.props;
        return (
            <div>
                <header className="app-header">
                    <FastfoodIcon className="app-logo" fontSize="large" htmlColor="white" />
                    <span className="header-serachbox" >
                        <Input className={classes.searchText}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon htmlColor="white" />
                                </InputAdornment>
                            }
                            fullWidth={true} placeholder="Search by Restaurant Name" onChange={this.inputSearchChangeHandler} />
                    </span>

                    <div className="login-button">
                        <Button size="large" variant="contained" onClick={this.openModalHandler}>
                            <AccountCircle className="login-button-icon" onClick={this.profileButtonClickHandler} />
                            LOGIN
                        </Button>
                    </div>
                    <Menu id="profile-menu" anchorEl={this.state.anchorEl} open={this.state.menuIsOpen} onClose={this.profileButtonClickHandler}>
                        <MenuList className={classes.menuList}>
                            <Link to={"/profile"} className={classes.menuItems} underline="none" color={"default"}>
                                <MenuItem className={classes.menuItems} onClick={this.onMyProfileClicked} disableGutters={false}>My profile</MenuItem>
                            </Link>
                            <MenuItem className="menu-items" onClick={this.onLogOutClickHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="Login"
                    onRequestClose={this.closeModalHandler} style={customStyles} >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" className={classes.tab} />
                        <Tab label="SignUp" className={classes.tab} />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="contactno">Contact No.</InputLabel>
                                <Input id="contactno" type="text" contactno={this.state.contactno}
                                    onChange={this.inputcontactnoChangeHandler} />
                                <FormHelperText className={this.state.contactNoRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password}
                                    onChange={this.inputpasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                                <FormHelperText className={this.state.registerPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>SIGNUP</Button>
                        </TabContainer>
                    }
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(Header);  