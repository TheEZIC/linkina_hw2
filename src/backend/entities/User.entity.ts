import {Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {UserRole} from "../types";
import {UserCredential} from "./UserCredential.entity";
import {UserSocial} from "./UserSocial.entity";
import {StudentGroup} from "./StudentGroup.entity";

@Entity({
  name: "User",
})
export class User {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "firstName",
    type: "text",
    nullable: false,
  })
  firstName: string;

  @Column({
    name: "lastName",
    type: "text",
    nullable: false,
  })
  lastName: string;

  @Column({
    name: "role",
    type: "text",
    nullable: false,
  })
  role: UserRole;

  @PrimaryColumn({
    type: "integer",
    name: "credentialId",
  })
  private credentialId?: number;

  @OneToOne(() => UserCredential)
  @JoinColumn({
    name: "credentialId"
  })
  credential?: UserCredential;

  @PrimaryColumn({
    type: "integer",
    name: "socialId",
  })
  private socialId?: number;

  @OneToOne(() => UserSocial)
  @JoinColumn({
    name: "socialId",
  })
  social: UserSocial;

  @Column({
    type: "integer",
    name: "groupId",
    nullable: true,
  })
  @ManyToOne(() => StudentGroup, (group) => group.students)
  group?: StudentGroup;
}
