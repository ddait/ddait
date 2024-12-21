import { IsString, IsArray, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  BLOCKED = 'BLOCKED',
}

export enum PostVisibility {
  PUBLIC = 'PUBLIC',
  FRIENDS = 'FRIENDS',
  PRIVATE = 'PRIVATE',
}

export class FriendDto {
  @ApiProperty()
  @IsString()
  friendId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  message?: string;
}

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ enum: PostVisibility, default: PostVisibility.PUBLIC })
  @IsEnum(PostVisibility)
  @IsOptional()
  visibility?: PostVisibility;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  exerciseSessionId?: string;
}

export class UpdatePostDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ enum: PostVisibility, required: false })
  @IsEnum(PostVisibility)
  @IsOptional()
  visibility?: PostVisibility;
}

export class PostResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ enum: PostVisibility })
  visibility: PostVisibility;

  @ApiProperty()
  likesCount: number;

  @ApiProperty()
  commentsCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class FriendResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  friendId: string;

  @ApiProperty({ enum: FriendshipStatus })
  status: FriendshipStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class NotificationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  @IsBoolean()
  read: boolean;

  @ApiProperty()
  createdAt: Date;
} 