import Address from './address.interface';
import Role from '../enums/role.enum';
import BaseInterface from './base.interface';

interface User extends BaseInterface {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  address: Address;
  role: Role;
}

export default User;
