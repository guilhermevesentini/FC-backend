"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterListaDeBancos = void 0;
const API_URL = 'https://brasilapi.com.br/api/banks/v1/';
const obterListaDeBancos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao obter dados da API');
        }
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.error('Erro ao chamar a API externa:', error);
        throw error;
    }
});
exports.obterListaDeBancos = obterListaDeBancos;
