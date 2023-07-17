import User from "../models/User.js";

const profileControl = {
    getProfile(req, res) {
        const user = req.session.user;
        console.log(user);
        res.render("edit-profile", {
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePic,
            description: user.biography
        });
    }
}

export default profileControl;