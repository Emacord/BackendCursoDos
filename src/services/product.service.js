
class ProductService {

    constructor(repository){

        this.repository = repository;

    }

    async getProducts(query){

        return await this.repository.getProducts(query);

    }

    async getProductById(pid){

        return await this.repository.getProductById(pid);

    }

    async createProduct(product){

        return await this.repository.createProduct(product);

    }

    async updateProduct(pid,product){

        return await this.repository.updateProduct(pid,product);

    }


    async deleteProduct(pid){

        return await this.repository.deleteProduct(pid);

    }

}

export default ProductService;