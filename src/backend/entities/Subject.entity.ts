import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "./Task.entity";
import {User} from "./User.entity";
import {StudentGroup} from "./StudentGroup.entity";

@Entity({
  name: "Subject",
})
export class Subject {
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
    name: "description",
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    name: "semester",
    type: "integer",
    nullable: false,
  })
  semester: number;

  @OneToMany(() => Task, (task) => task.subject)
  tasks: Task[];

  @ManyToMany(() => User)
  @JoinTable({
    name: "TeacherSubject",
    joinColumn: {
      name: "teacherId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "subjectId",
      referencedColumnName: "id",
    },
  })
  teachers: User[];

  @ManyToMany(() => StudentGroup)
  @JoinTable({
    name: "StudentGroupSubject",
    joinColumn: {
      name: "groupId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "subjectId",
      referencedColumnName: "id",
    },
  })
  groups: StudentGroup[];
}
