import nodemailer from "nodemailer";

//fcfinancecontrol@gmail.com
//finance143200

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const emailService = process.env.EMAIL_SERVICE || "gmail";

    this.transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendPasswordResetEmail(to: string, newPassword: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Recuperação de Senha",
      text: `Sua nova senha é: ${newPassword} Por favor, altere-a assim que possível.`,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
