export interface messageInterface {
  user: string;
  message: string | { option: string; link: string }[];
}