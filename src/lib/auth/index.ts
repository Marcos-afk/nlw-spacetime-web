import { cookies } from "next/headers";
import decode from "jwt-decode";

interface UserProps {
  name: string;
  avatar_url: string;
  sub: string;
}

export const getUser = (): UserProps => {
  const token = cookies().get("nlw-spacetime-token")?.value;

  if (!token) {
    throw new Error("Token not found");
  }

  const user = decode(token) as UserProps;

  return user;
};
