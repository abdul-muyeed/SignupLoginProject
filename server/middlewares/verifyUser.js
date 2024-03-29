export const verifyUser = async (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}


