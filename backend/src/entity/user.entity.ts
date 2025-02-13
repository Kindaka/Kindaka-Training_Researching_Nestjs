import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

enum ROLES{
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER',
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({})
  fullName: string;

  @Column({})
  @Exclude()
  password: string;

  @Column({default: ROLES.USER})
  @Exclude()
  role: ROLES;
}
