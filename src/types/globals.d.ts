declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    COMMIT: string
    VERSION: string
  }
}

declare module '*.css' {
  interface Styles {
    [key: string]: string
  }
  const styles: Styles
  export default styles
}

declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const SvgIcon: FC<SVGProps<SVGElement>>
  export default SvgIcon
}

declare module 'react-animate-mount'
