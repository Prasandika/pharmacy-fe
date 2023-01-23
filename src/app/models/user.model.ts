import { UserRole } from 'src/app/enums/user-role.enum';

export class User {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  address!: string;
  password!: string;
  role!: UserRole;
}
