import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    let userAdmin;

    try {
      userAdmin = this.turnUserAdminUseCase.execute({ user_id });
    } catch (error) {
      const err = error.toString().split(":");
      const messageError = err[1];

      return response.status(404).json({ error: messageError });
    }

    return response.status(201).json(userAdmin);
  }
}

export { TurnUserAdminController };
