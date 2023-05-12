import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User.entity";

@Entity({
  name: "Message",
})
export class Message {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "text",
    type: "text",
    nullable: false,
  })
  text: string;

  @Column({
    name: "authorId",
    type: "integer",
    nullable: false
  })
  @OneToOne(() => User)
  author: User;
}
