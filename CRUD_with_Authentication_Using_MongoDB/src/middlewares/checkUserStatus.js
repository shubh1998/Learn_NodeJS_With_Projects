module.exports = {
    isActiveUser: (req, res, next) => {
        // console.log(req.user)
        if (req.user.is_active == true) {
            console.log("user activate");
            return next();
        } else {
            console.log("Unauthorized");
            throw unauthorizedError(res, "Admin has blocked your account.");
        }
    }
}