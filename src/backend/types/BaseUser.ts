import {User} from "../entities/User.entity";

export type BaseUser = Omit<User, "credential">;
