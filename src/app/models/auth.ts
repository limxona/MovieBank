export interface GuestSession {
  expires_at: string;
  guest_session_id: string;
  success: boolean;
}

export interface UserSession {
  expires_at?: string;
  session_id: string;
  success: boolean;
}

export interface RequestToken {
  expires_at: string;
  request_token: string;
  success: boolean;
}
