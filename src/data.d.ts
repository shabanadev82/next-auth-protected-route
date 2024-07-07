export interface RegisterProps {
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
    role?: string;
}
export interface LoginProps {
    email: string;
    password: string;
}

export interface ForgotPasswordType {
    email:string;
}
export interface ResetPasswordType {
    password: string;
    password_confirmation: string;
  }
  export interface ResetPasswordPayload {
    email: string;
    signature: string;
    password: string;
    password_confirmation: string;
  }
  
export interface ErrorProps {
    children?: React.ReactNode;
}
export interface FieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?:string;
  }