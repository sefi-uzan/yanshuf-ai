type UserCookies = {
  name: string;
  value: string;
  domain: string;
  path: string;
};

export const userCookies: UserCookies[] = [
  {
    name: "next-auth.session-token",
    value:
      process.env.USER_COOKIE ||
      "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Gh7u7j3zk5F-2Zrs.LYoyvudbliMpcIq7nMa3Nmxg86XJjZTgxrVZRUgFVAIUSwjvFTL8mFt688vyc9pycnh--5aSgI9RhKvC2DwSV6uNWrqYQPevUKIEf9GWHtkTtHTHvQ6JzAW04Ul5ZpGl9x85o7pERLA8V_CrYKDAkYy-tUA9k61DYBeOENpuoXxmZue8xMJAapSgicVsyRGrtOypG0-9PJ27ze9QbESz1Is1Lgj2nf6t43gdlWJgyih_QkZoiDmYBexaXhl0bTDBwJugSfvk-Qi7wQ-0lazj-pbGUkpaEFrprS8HBblfSwW7PYkVvoeTivrJsgD-pc9YK3w58B-zGGRWRBDP9-Rm2yg3vxKcuB2G2vjl8gDsK-MI99U5jA0pgeKxF1YEucHaFRNoBSYKryq0aYVq6A.emgIceB5JuEn8gV_oFcq5g",
    domain: "localhost",
    path: "/",
  },
];
