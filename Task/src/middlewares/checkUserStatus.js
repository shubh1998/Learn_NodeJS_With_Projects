module.exports = {
    isActiveUser: (req, res, next) => {
        if (req.user.user_status == true) {
            console.log("middleware runs");
            return next();
        } else {
            console.log("Unauthorized");
            throw unauthorizedError("Admin has blocked your account.");
        }
    }
}