import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./event.entity";
import { Meeting } from "./meeting.entity";
import { Integration } from "./integration.entity";
import { Availability } from "./availability.entity";
import { compareValue, hashValue } from "../../utils/bcrypt";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Event, (event) => event.user, { cascade: true })
  events: Event[];

  @OneToMany(() => Integration, (integration) => integration.user, { cascade: true })
  integrations: Integration[];

  @OneToOne(() => Availability, (availability) => availability.user)
  @JoinColumn()
  availability: Availability;

  @OneToMany(() => Meeting, (meeting) => meeting.user, { cascade: true })
  meetings: Meeting[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashValue(this.password);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return await compareValue(password, this.password);
  }

  omitPassword(): Omit<User, "password"> {
    const { password, ...userWhitoutPassword } = this;
    return userWhitoutPassword as Omit<User, "password">;
  }
}
