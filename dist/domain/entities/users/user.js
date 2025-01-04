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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User {
    constructor(props) {
        this.props = props;
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const generateId = yield bcryptjs_1.default.hash("senha", 10);
            return new User({
                id: generateId,
                email: user.email,
                username: user.username,
                password: user.password
            });
        });
    }
    static with(props) {
        return new User(props);
    }
    validate() {
        //if() se precisar validar throw new Error(User invalido)
    }
    get id() {
        return this.props.id;
    }
    get email() {
        return this.props.email;
    }
    get username() {
        return this.props.username;
    }
    get password() {
        return this.props.password;
    }
    //regra de negocio
    addUser(user) {
        this.props.id = user.id;
        this.props.username = user.username;
        this.props.password = user.password;
    }
}
exports.User = User;
