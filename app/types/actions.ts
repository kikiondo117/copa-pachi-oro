export type ActionDataRegister =
  | {
      email: null | string;
      password: null | string;
      confirm_password: null | string;
      team: null | string;
      region: null | string;
      plataforma: null | string;
    }
  | undefined
  | null;

export type ActionDataLogin =
  | {
      email: null | string;
      password: null | string;
    }
  | undefined
  | null;
