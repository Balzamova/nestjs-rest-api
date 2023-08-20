"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    constructor() {
        this.products = [
            {
                id: '1',
                title: 'First prod',
                price: 123
            }
        ];
    }
    getAll() {
        return this.products;
    }
    getOne(id) {
        return this.products.find(el => el.id === id);
    }
    create(data) {
        const id = Date.now().toString();
        this.products.push(Object.assign({ id }, data));
        return 'created ' + JSON.stringify(this.products);
    }
    remove(id) {
        const index = this.products.findIndex(el => el.id === id);
        this.products.splice(index, 1);
        return 'removed ' + JSON.stringify(this.products);
    }
    update(id, updateProductDto) {
        this.products.reduce((acc, el) => {
            if (el.id !== id)
                return acc;
            el.title = updateProductDto.title;
            el.price = updateProductDto.price;
            return acc;
        }, []);
        return 'updated ' + JSON.stringify(this.products);
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map