import { compareSync, hash } from "bcrypt";
import { sign, verify, } from "jsonwebtoken";
import { createTransport } from "nodemailer";
import { secret } from "../config";
import { UsersService } from "../models/users/service";

export class AuthenticationService {
  private userService: UsersService = new UsersService();

  async checkExistEmail(email: string): Promise<boolean> {
    let user = await this.userService.findUsers({ email });

    if (user) return false;
    return true;
  }

  async bcryptPassword(password: string): Promise<string> {
    const hashPass = await hash(password, 10);
    return hashPass;
  }

  async verifyPassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return await compareSync(password, hashPassword);
  }

  async sendEmail(email: string, content: string) {
    const transporter = createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mainOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Sign Up Code",
      html: `<p>Your Verify Code</p><b>${content}</b>`,
    };

    return await transporter.sendMail(mainOptions);
  }

  createToken(data: { _id: string }): string {
    const token = sign(data, secret);
    return token;
  }

  verifyToken(token: string) {
    const verifyToken = verify(token, secret);
    return verifyToken;
  }
}
