import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
    accent: string;
    borderColor: string;
  }
}
