import {PrimaryColumn, Entity, JoinTable, OneToOne} from "typeorm";
import {StudentGroup} from "../StudentGroup.entity";
import {Subject} from "../Subject.entity";

@Entity({
  name: "StudentGroupSubject",
})
export class StudentGroupSubject {
  @PrimaryColumn({
    name: "groupId",
    type: "integer",
    nullable: false,
  })
  @OneToOne(() => StudentGroup)
  group: StudentGroup;

  @PrimaryColumn({
    name: "subjectId",
    type: "integer",
    nullable: false,
  })
  @OneToOne(() => Subject)
  subject: Subject
}
