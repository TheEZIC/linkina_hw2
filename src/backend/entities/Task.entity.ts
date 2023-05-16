import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Subject} from "./Subject.entity";
import {TaskResult} from "./TaskResult.entity";

@Entity({
  name: "Task",
})
export class Task {
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
    name: "subjectId",
    type: "integer",
    nullable: true,
  })
  @ManyToOne(() => Subject, (subject) => subject.tasks)
  subject?: Subject;

  @OneToMany(() => TaskResult, (result) => result.task, {
    cascade: true,
  })
  results: TaskResult[];
}
