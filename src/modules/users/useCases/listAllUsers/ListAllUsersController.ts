import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    const id = user_id.toString();

    let users;

    try {
      users = this.listAllUsersUseCase.execute({ user_id: id });
    } catch (error) {
      const err = error.toString().split(":");
      const messageError = err[1];

      return response.status(400).json({ error: messageError });
    }

    return response.status(200).json(users);
  }
}

export { ListAllUsersController };
