const jwt=require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    const authHeader= req.headers.authorization;

    if(!authHeader || !authHeader.startWith("Bearer")){
        return res.status(401).json({message:"Unauthorized: No token provided"});
    }

    const token= authHeader.split(" ")[1];
try {
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    next()
} catch (error) {
    res.status(401).json({message:"Unauthorized:Invalid token"});
    
}
};
module.exports=authMiddleware;