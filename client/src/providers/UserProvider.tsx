import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
};

type Props = {
  children: ReactNode;
};

type UserContextProps = {
  contextUser: User;
  setContextUser: Dispatch<SetStateAction<User>>;
};

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export default function UserProvider({ children }: Props) {
  const [contextUser, setContextUser] = useState<User>({ firstName: '', lastName: '', email: '', avatarUrl: '' });

  return <UserContext.Provider value={{ contextUser, setContextUser }}>{children}</UserContext.Provider>;
}
