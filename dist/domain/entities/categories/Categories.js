"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
class Categories {
    constructor(props) {
        this.props = props;
    }
    static create(input) {
        const props = {
            id: input.id,
            nome: input.nome,
            tipo: input.tipo,
            customerId: input.customerId
        };
        return props;
    }
    static with(props) {
        return props;
    }
    get category() {
        return this.props;
    }
}
exports.Categories = Categories;
