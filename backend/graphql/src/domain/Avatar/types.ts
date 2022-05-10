import type { Avatar } from './graph';

export type ISetAvatarOutput = ISetAvatarFail | ISetAvatarSuccess;

export type ISetAvatarSuccess = {
  type: 'SetAvatarSuccess';
  data: Avatar;
};
export type ISetAvatarFail = { type: 'SetAvatarFail' };
