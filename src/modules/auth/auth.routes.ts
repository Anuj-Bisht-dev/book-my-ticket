import Router from 'express'

export const handleRoutes = Router();

handleRoutes.get("/", (req, res)=>{
    res.json({
        message: "server is working properly"
    });
});
