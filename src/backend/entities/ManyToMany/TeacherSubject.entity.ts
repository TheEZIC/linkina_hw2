import {PrimaryColumn, Entity, JoinTable, OneToOne} from "typeorm";
import {User} from "../User.entity";
import {Subject} from "../Subject.entity";

@Entity({
  name: "TeacherSubject",
})
export class TeacherSubject {
  @PrimaryColumn({
    name: "teacherId",
    type: "integer",
    nullable: false,
  })
  @OneToOne(() => User)
  teacher: User;

  @PrimaryColumn({
    name: "subjectId",
    type: "integer",
    nullable: false,
  })
  @OneToOne(() => Subject)
  subject: Subject;
}
