import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "./Task.entity";

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

  @Column({
    name: "taskId",
    type: "integer",
    nullable: true,
  })
  @ManyToOne(() => Task, (task) => task.results)
  task?: Task;
}
