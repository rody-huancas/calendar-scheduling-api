import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Event } from "./event.entity";

export enum MeetingStatus {
  SCHEDULED = "SCHEDULED",
  CANCELLED = "CANCELLED",
}

@Entity({ name: "meetings" })
export class Meeting {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.meetings)
  user: User;

  @ManyToOne(() => Event, (event) => event.meetings)
  event: Event;

  @Column()
  guestName: string;

  @Column()
  guestEmail: string;

  @Column()
  additionalInfo: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  meetLink: Date;

  @Column()
  calendarEventId: string;

  @Column({ type: "enum", enum: MeetingStatus })
  status: MeetingStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
