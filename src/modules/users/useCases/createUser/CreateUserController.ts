import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;

    let user;

    try {
      user = this.createUserUseCase.execute({ name, email });
    } catch (error) {
      const err = error.toString().split(":");
      const messageError = err[1];

      return response.status(400).json({ error: messageError });
    }

    return response.status(201).json(user);
  }
}

export { CreateUserController };
