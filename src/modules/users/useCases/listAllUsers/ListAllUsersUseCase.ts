import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const checkUser = this.usersRepository.findById(user_id);

    if (!checkUser || !checkUser.admin)
      throw new Error("User not found or not authorization");

    const users = this.usersRepository.list();

    if (!users) throw new Error("Error to list users");

    return users;
  }
}

export { ListAllUsersUseCase };
