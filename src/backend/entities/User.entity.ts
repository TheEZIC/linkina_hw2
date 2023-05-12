import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm/browser";
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

  @Column({
    type: "integer",
    name: "credentialId",
    nullable: true,
  })
  @OneToOne(() => UserCredential)
  credential?: UserCredential;

  @Column({
    type: "integer",
    name: "socialId",
    nullable: true,
  })
  @OneToOne(() => UserSocial)
  social?: UserSocial;

  @Column({
    type: "integer",
    name: "groupId",
    nullable: true,
  })
  @ManyToOne(() => StudentGroup, (group) => group.students)
  group?: StudentGroup;
}
