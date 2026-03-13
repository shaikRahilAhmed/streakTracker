export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    '/',
    '/history',
    '/stats',
    '/api/study',
    '/api/streak',
    '/api/history',
  ],
};
