import {PrimaryColumn, Entity, JoinTable, OneToOne, JoinColumn} from "typeorm";
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
  teacherId: number;

  // @OneToOne(() => User)
  // @JoinColumn({
  //   name: "teacherId",
  // })
  // teacher:  User;

  @PrimaryColumn({
    name: "subjectId",
    type: "integer",
    nullable: false,
  })
  subjectId: number;

  // @OneToOne(() => Subject)
  // @JoinColumn({
  //   name: "subjectId",
  // })
  // subject: Subject;
}
