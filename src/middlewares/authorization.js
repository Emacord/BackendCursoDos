
export const authorization = (role) => {

    return (req,res,next)=>{

        if(!req.user){

            return res.status(401).send({
                status:"error",
                message:"User not authenticated"
            });

        }

        if(req.user.role !== role){

            return res.status(403).send({
                status:"error",
                message:"User does not have permissions"
            });

        }

        next();

    }

}