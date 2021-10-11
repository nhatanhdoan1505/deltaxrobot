import { UsersService } from "../models/users/service";
import { AuthenticationService } from "../utils/AuthorizationService";

export class AuthController {
  private usersService: UsersService = new UsersService();
  private authService: AuthenticationService = new AuthenticationService();

  async siginUp(req, res) {
    if (!req.body.name || !req.body.password || !req.body.email)
      return res
        .status(400)
        .json({ status: "FAIL", data: { msg: "Insufficient paramester" } });

    let userData = await this.usersService.findUsers({
      email: req.body.email,
    });

    if (userData)
      return res.status(400).json({
        status: "FAIL",
        data: { msg: "This email is already in use" },
      });

    userData = await this.usersService.findUsers({
      name: req.body.name,
    });
    if (userData)
      return res
        .status(400)
        .json({ status: "FAIL", data: { msg: "This name is already in use" } });

    if (req.body.password.length < 6)
      return res.status(400).json({
        status: "FAIL",
        data: {
          msg: "Password must has 6 characters at least",
        },
      });

    const verifiedCode = Math.floor(Math.random() * 10000);
    const bcryptPassword = await this.authService.bcryptPassword(
      req.body.password
    );
    await Promise.all([
      this.authService.sendEmail(req.body.email, verifiedCode.toString()),
      this.usersService.createUsers({
        name: req.body.name,
        email: req.body.email,
        password: bcryptPassword,
        verifiedCode: verifiedCode.toString(),
      }),
    ]);

    return res
      .status(200)
      .json({ status: "SUCCESS", msg: "Verify Code for register" });
  }

  async verifiedCode(req, res) {
    if (!req.body.name || !req.body.verifiedCode)
      return res
        .status(400)
        .json({ status: "FAIL", msg: "Insufficient paramester" });

    const userData = await this.usersService.findUsers({
      name: req.body.name,
    });
    if (!userData)
      return res
        .status(400)
        .json({ status: "FAIL", data: { msg: "This name is not exist" } });

    if (userData.verifiedCode !== req.body.verifiedCode)
      return res.status(400).json({
        status: "FAIL",
        data: { msg: "Wrong Verify Code. Try Again" },
      });

    await this.usersService.updateUsers(
      { name: req.body.name },
      { ...userData, isVerify: true }
    );

    return res
      .status(200)
      .json({ status: "SUCCESS", data: { msg: "Sign Up successfully" } });
  }

  async signIn(req, res) {
    if (!req.body.name || !req.body.password)
      return res
        .status(400)
        .json({ status: "FAIL", data: { msg: "Insufficient paramester" } });

    const userData = await this.usersService.findUsers({ name: req.body.name });
    if (!userData)
      return res
        .status(400)
        .json({ status: "FAIL", data: { msg: "Email is not exist" } });

    if (!userData.isVerify)
      return res.status(400).json({
        status: "FAIL",
        data: { msg: "This account does not verify" },
      });

    const verifyPassword = await this.authService.verifyPassword(
      req.body.password,
      userData.password
    );

    if (!verifyPassword)
      return res.status(400).json({ status: "FAIL", msg: "Wrong password" });

    const token = this.authService.createToken({
      _id: userData._id.toString(),
    });

    return res
      .status(200)
      .json({ status: "SUCCESS", msg: "Login successfully", data: { token } });
  }

  //   async isAdmin(req, res) {
  //     if (!req.body.token)
  //       return res
  //         .status(400)
  //         .json({ status: "Fail", msg: "Insufficient paramester" });

  //     try {
  //       const decodeToken: any = await this.authService.verifyToken(
  //         req.body.token
  //       );
  //       const { _id } = decodeToken;
  //       const userData = await this.usersService.findUsers({ _id });

  //       if (!userData && !userData.isAdmin)
  //         return res.status(200).json({ status: "OK", data: { isAdmin: false } });
  //       return res.status(200).json({ status: "OK", data: { isAdmin: true } });
  //     } catch (error) {
  //       return res.status(200).json({ status: "OK", data: { isAdmin: false } });
  //     }
  //   }
}
