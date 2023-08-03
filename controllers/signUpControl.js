import User from "../models/User.js";

const signUpControl = {
    showSignUpForm(req, res) {
        //console.log('signing-up');
        res.render("sign-up");
    },
    
    async submitSignUpForm(req, res) {
        const today = new Date();
        const data = { 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.emailSignup,
            password: req.body.passwordSignup,
            helpfulCount: 0,
            reviewCount: 0,
            photoCount: 0,
            monthMade: today.getMonth() + 1,
            dateMade: today.getDate(),
            yearMade: today.getFullYear(),
            biography: "The user has not yet set a biography.",
            profilePic: "assets/png/def-prof.png"
        };
        const newUser = new User(data);
        try {
            await newUser.save();
            //console.log(User.find({}));
            res.redirect("login");
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred.");
        }
    }
};

export default signUpControl;