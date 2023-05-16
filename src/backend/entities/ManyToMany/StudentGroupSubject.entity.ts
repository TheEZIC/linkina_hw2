import {PrimaryColumn, Entity, JoinTable, OneToOne, JoinColumn} from "typeorm";
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
  groupId: number;

  // @OneToOne(() => StudentGroup)
  // @JoinColumn({
  //   name: "groupId",
  // })
  // group: StudentGroup;

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
