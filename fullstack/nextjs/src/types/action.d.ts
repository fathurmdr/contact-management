declare type ActionResult<T = any> = {
  data?: T;
  message?: string;
  errorMsg?: string;
  errors?: any;
  redirectUrl?: string;
};
