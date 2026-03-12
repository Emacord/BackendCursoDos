
class ProductRepository {

    constructor(dao) {

        this.dao = dao;

    }

    async getProducts(query){

        return await this.dao.getAllProducts(query);

    }

    async getProductById(pid){

        return await this.dao.getProductByID(pid);

    }

    async createProduct(product){

        return await this.dao.createProduct(product);

    }

    async updateProduct(pid,product){

        return await this.dao.updateProduct(pid,product);

    }

    async deleteProduct(pid){

        return await this.dao.deleteProduct(pid);

    }

}

export default ProductRepository;