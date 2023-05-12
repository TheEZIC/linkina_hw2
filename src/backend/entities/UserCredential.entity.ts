import {Column, Entity, PrimaryGeneratedColumn} from "typeorm/browser";

@Entity({
  name: "UserCredential",
})
export class UserCredential {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "login",
    type: "text",
    nullable: false,
    unique: true,
  })
  login: string;

  @Column({
    name: "password",
    type: "text",
    nullable: false,
  })
  password: string;
}
