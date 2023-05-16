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

  @OneToMany(() => Task, (task) => task.subject, {
    cascade: true,
  })
  tasks: Task[];

  @ManyToMany(() => User)
  @JoinTable({
    name: "TeacherSubject",
    joinColumn: {
      name: "subjectId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "teacherId",
      referencedColumnName: "id",
    },
  })
  teachers: User[];

  @ManyToMany(() => StudentGroup)
  @JoinTable({
    name: "StudentGroupSubject",
    joinColumn: {
      name: "subjectId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "groupId",
      referencedColumnName: "id",
    },
  })
  groups: StudentGroup[];
}
