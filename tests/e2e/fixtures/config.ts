type UserCookies = {
  name: string;
  value: string;
  domain: string;
  path: string;
};

export const userCookies: UserCookies[] = [
  {
    name: "next-auth.session-token",
    value: process.env.USER_COOKIE || "",
    domain: "localhost",
    path: "/",
  },
];
