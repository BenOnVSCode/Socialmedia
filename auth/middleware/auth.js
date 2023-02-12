import jwt from "jsonwebtoken"



const auth = (req, res, next) => {
    const token = req.cookies[process.env.COOKIE_NAME]
    if(!token) return res.status(401).json({ msg: 'No token, auth denided'});
    try {
        const decoded = jwt.verify(token , process.env.JWT_KEY);
        req.user = decoded 
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token is not valid'})
    }
}


export default auth