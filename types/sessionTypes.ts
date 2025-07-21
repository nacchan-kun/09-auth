export type SessionResponse = {
  message:
    | 'Session refreshed successfully'
    | 'No active session found'
    | 'Invalid or expired token';
};