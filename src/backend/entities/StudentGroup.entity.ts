import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm/browser";
import {User} from "./User.entity";

@Entity({
  name: "StudentGroup",
})
export class StudentGroup {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "title",
    type: "text",
    nullable: false,
  })
  title: string;

  @Column({
    name: "semester",
    type: "integer",
    nullable: false,
  })
  semester: number;

  @OneToMany(() => User, (user) => user.group)
  students: User[];
}
