import { UsersRepository } from "modules/users/repositories/implementations/UsersRepository";
import { usersRoutes } from "routes/users.routes";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const checkUserExists = this.usersRepository.findByEmail(email);

    if (checkUserExists) throw new Error("Email is already used");

    const user = this.usersRepository.create({ name, email });

    return user;
  }
}

export { CreateUserUseCase };
