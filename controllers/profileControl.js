import User from "../models/User.js";

const profileControl = {
    showProfile(req, res){
        const user = req.session.user;
        console.log(user);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October","November","December"];
        var dateString = months[user.monthMade - 1] + " " + user.dateMade + ", " + user.yearMade;
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
    },
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
    async submitEditProfile(req, res) {
        console.log('User updated profile');
        console.log(req.body);
        try {
            let user = req.session.user;

            let upFirstName = req.body.firstNameEdit;
            let upLastName = req.body.lastNameEdit;
            let upDescription = req.body.descriptionEdit;
            let upProfilePicture;
            console.log('UPLOADED FILE:');
            console.log(req.file);
            if(req.file != null)
                upProfilePicture = req.file.filename;
            console.log('upProfilePicture:' + '\n' + upProfilePicture);
            
            const foundUser = await User.findOne({email:user.email}).exec();
            console.log('foundUser:' + '\n' + foundUser);

            if(upFirstName != null)
                foundUser.firstName = upFirstName;
            if(upLastName != null)
                foundUser.lastName = upLastName;
            if(upDescription != null)
                foundUser.biography = upDescription;
            if(upProfilePicture != null)
                foundUser.profilePic = 'uploads/profiles/' + upProfilePicture;
            await foundUser.save();
            req.session.user = foundUser;
            console.log('foundUser EDITED:' + '\n' + foundUser);
            res.redirect('/profile');
        } catch (error) {
          console.error('Error updating user:', error);
          res.status(500).send('Failed to update user');
        }
    }
}

export default profileControl;