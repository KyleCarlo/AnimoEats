import User from "../models/User.js";

const logInControl = {
    showLogInForm(req, res) {
        console.log('logging-in');
        res.render("login");
    },
    
    async submitLogInForm(req, res) {
        try {
            const check = await User.findOne({ email: req.body.emailLogin });
            if (check.password == req.body.passwordLogin) {
                User.findOne({ email: req.body.emailLogin })
                .then((user) => {
                    if (!user) {
                        res.send('User not found');
                    } else {
                        req.session.user = user;
                        req.session.save();
                        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October","November","December"];
                        var dateString = months[user.monthMade - 1] + " " + user.dateMade + ", " + user.yearMade;
                        console.log('LOG IN SUCCESSFUL BY:\n' + user.firstName + ' ' + user.lastName);
                        res.render("profile", {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            password: user.password,
                            helpfulCount: user.helpfulCount,
                            reviewCount: user.reviewCount,
                            photoCount: user.photoCount,
                            dateMade: dateString,
                            biography: user.biography,
                            profilePic: user.profilePic
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    res.send('Error retrieving user data');
                });
            } else {
                res.render("login", {
                    errorMessage: 'Invalid credentials'
                });
            }
        } catch (error) {
            res.render("login", {
                errorMessage: 'Invalid credentials'
            });
        }
    }
};

export default logInControl;