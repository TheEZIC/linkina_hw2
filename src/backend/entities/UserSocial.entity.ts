import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
  name: "UserSocial",
})
export class UserSocial {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "email",
    type: "text",
    nullable: false,
  })
  email: string;
}
