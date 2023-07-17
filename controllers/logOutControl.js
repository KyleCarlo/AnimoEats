const logOutControl = {
    endSession(req, res) {
        req.session.destroy(err => {
            if(err) {
                return console.log(err);
            }
            res.render('login');
        });
    }
};

export default logOutControl;