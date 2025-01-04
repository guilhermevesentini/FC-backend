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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//fcfinancecontrol@gmail.com
//finance143200
class EmailService {
    constructor() {
        const emailService = process.env.EMAIL_SERVICE || "gmail";
        this.transporter = nodemailer_1.default.createTransport({
            service: emailService,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    sendPasswordResetEmail(to, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject: "Recuperação de Senha",
                text: `Sua nova senha é: ${newPassword} Por favor, altere-a assim que possível.`,
            };
            return this.transporter.sendMail(mailOptions);
        });
    }
}
exports.EmailService = EmailService;
