import { AuthController } from "./controller/AuthController";

export class Router {
  private app;
  private authController: AuthController = new AuthController();

  constructor(app) {
    this.app = app;
  }

  route() {
    this.app.post("/api/auth/sign_up", (req, res) => {
      return this.authController.siginUp(req, res);
    });

    this.app.post("/api/auth/verifyCode", (req, res) => {
      return this.authController.verifiedCode(req, res);
    });

    this.app.post("/api/auth/sign_in", (req, res) => {
      return this.authController.signIn(req, res);
    });
  }
}
