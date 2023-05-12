import {Column, Entity, JoinTable, OneToOne} from "typeorm/browser";
import {User} from "../User.entity";
import {Subject} from "../Subject.entity";

@Entity({
  name: "TeacherSubject",
})
export class TeacherSubject {
  @Column({
    name: "teacherId",
    type: "integer",
    nullable: false,
  })
  @OneToOne(() => User)
  @JoinTable()
  teacher: User;

  @Column({
    name: "subjectId",
    type: "integer",
    nullable: false,
  })
  @OneToOne(() => Subject)
  @JoinTable()
  subject: Subject;
}
