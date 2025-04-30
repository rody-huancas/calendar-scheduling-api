import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

export enum IntegrationProviderEnum {
  GOOGLE    = "GOOGLE",
  ZOOM      = "ZOOM",
  MICROSOFT = "MICROSOFT",
}

export enum IntegrationAppTypeEnum {
  GOOGLE_MEET_AND_CALENDAR = "GOOGLE_MEET_AND_CALENDAR",
  ZOOM_MEETING             = "ZOOM_MEETING",
  OUTLOOK_CALENDAR         = "OUTLOOK_CALENDAR",
}

export enum IntegrationCategoryEnum {
  CALENDAR                        = "CALENDAR",
  VIDEO_CONFERENCE                = "VIDEO_CONFERENCE",
  CALENDAR_AND_VIDEO_CONFERENCING = "CALENDAR_AND_VIDEO_CONFERENCING",
}

interface GoogleMeetAndCalendarMetadata {
  scope     : string;
  token_type: string;
}

interface ZoomMetadata {}

type IntegrationMetadata = GoogleMeetAndCalendarMetadata | ZoomMetadata;

@Entity("integrations")
export class Integration {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: IntegrationProviderEnum })
  provider: IntegrationProviderEnum;

  @Column({ type: "enum", enum: IntegrationCategoryEnum })
  category: IntegrationCategoryEnum;

  @Column({ type: "enum", enum: IntegrationAppTypeEnum })
  app_type: IntegrationAppTypeEnum;

  @Column()
  access_token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ type: "bigint", nullable: true })
  expires_date: number | null;

  @Column({ type: "json" })
  metadata: IntegrationMetadata;

  @Column({ default: true })
  isConnected: boolean;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.integrations)
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
