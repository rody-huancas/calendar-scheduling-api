import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { DayAvailability } from "./day-availability.entity";

@Entity()
export class Availability {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, (user) => user.availability)
  user: User;

  @OneToMany(() => DayAvailability, (dayAvailability) => dayAvailability.availability, { cascade: true })
  days: DayAvailability[];

  @Column({ default: 30 })
  timeGap: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
