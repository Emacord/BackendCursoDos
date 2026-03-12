
export default class ProductController {

    constructor(service){

        this.service = service;

    }


    getProducts = async (req,res)=>{

        try{

            const result = await this.service.getProducts(req.query);

            res.send({
                status:"success",
                payload:result
            });

        }catch(error){

            res.status(500).send({
                status:"error",
                message:error.message
            });

        }

    }




    getProductById = async (req,res)=>{

        try{

            const result = await this.service.getProductById(req.params.pid);

            res.send({
                status:"success",
                payload:result
            });

        }catch(error){

            res.status(400).send({
                status:"error",
                message:error.message
            });

        }

    }




    createProduct = async (req,res)=>{

        try{

            const result = await this.service.createProduct(req.body);

            res.send({
                status:"success",
                payload:result
            });

        }catch(error){

            res.status(400).send({
                status:"error",
                message:error.message
            });

        }

    }



    updateProduct = async (req,res)=>{

        try{

            const result = await this.service.updateProduct(
                req.params.pid,
                req.body
            );

            res.send({
                status:"success",
                payload:result
            });

        }catch(error){

            res.status(400).send({
                status:"error",
                message:error.message
            });

        }

    }




    deleteProduct = async (req,res)=>{

        try{

            const result = await this.service.deleteProduct(req.params.pid);

            res.send({
                status:"success",
                payload:result
            });

        }catch(error){

            res.status(400).send({
                status:"error",
                message:error.message
            });

        }

    }

}