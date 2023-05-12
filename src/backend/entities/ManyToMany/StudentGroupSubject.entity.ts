import {Column, Entity, JoinTable, OneToOne} from "typeorm;
import {StudentGroup} from "../StudentGroup.entity";
import {Subject} from "typeorm/persistence/Subject";

@Entity({
  name: "StudentGroupSubject",
})
export class StudentGroupSubject {
  @Column({
    name: "groupId",
    type: "integer",
    nullable: false,
  })
  @OneToOne(() => StudentGroup)
  @JoinTable()
  group: StudentGroup;

  @Column({
    name: "subject",
    type: "integer",
    nullable: false,
  })
  @OneToOne(() => Subject)
  @JoinTable()
  subject: Subject
}
