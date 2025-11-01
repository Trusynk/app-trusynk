declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleSignInConfig) => void
          renderButton: (element: HTMLElement, options: GoogleButtonOptions) => void
          prompt: () => void
        }
      }
    }
  }
}

interface GoogleSignInConfig {
  client_id: string
  callback?: (response: GoogleSignInResponse) => void
  auto_select?: boolean
}

interface GoogleSignInResponse {
  credential: string
  clientId?: string
}

interface GoogleButtonOptions {
  type?: 'standard' | 'icon'
  size?: 'large' | 'medium' | 'small'
  theme?: 'outline' | 'filled_blue' | 'filled_black'
  text?: 'signin_with' | 'signup_with' | 'continue_with'
  shape?: 'rectangular' | 'pill' | 'circle' | 'square'
  logo_alignment?: 'left' | 'center'
  width?: number | string
  locale?: string
  click_listener?: () => void
  ux_mode?: 'popup' | 'redirect'
}

export {}
