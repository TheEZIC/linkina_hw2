import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "./Task.entity";
import {User} from "./User.entity";

@Entity({
  name: "TaskResult",
})
export class TaskResult {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "status",
    type: "text",
    nullable: false,
  })
  status: string;

  @Column({
    name: "mark",
    type: "integer",
    nullable: true,
  })
  mark?: number;

  @PrimaryColumn({
    type: "integer",
    name: "studentId",
  })
  private teacherId: number;

  @OneToOne(() => User)
  @JoinColumn({
    name: "teacherId",
  })
  teacher: User;

  @PrimaryColumn({
    type: "integer",
    name: "studentId",
  })
  private studentId: number;

  @OneToOne(() => User)
  @JoinColumn({
    name: "studentId",
  })
  student: User;

  @Column({
    name: "taskId",
    type: "integer",
    nullable: true,
  })
  @ManyToOne(() => Task, (task) => task.results)
  task?: Task;
}
