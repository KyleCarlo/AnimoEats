import User from "../models/User.js";

const profileControl = {
    showEditProfile(req, res) {
        const user = req.session.user;
        console.log(user);
        res.render("edit-profile", {
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePic,
            description: user.biography
        });
    },
    submitEditProfile(req, res) {
        res.send('Uploaded');
    }
}

export default profileControl;