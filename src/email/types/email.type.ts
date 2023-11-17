export interface Email {
  to: string;
  data: {
    name: string;
  };
}
export interface ResetPasswordEmail extends Email {
  to: string;
  data: {
    name: string;
    link: string;
    frontUrl: string;
  };
}
