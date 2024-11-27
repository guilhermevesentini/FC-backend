// express-session.d.ts or a similar file where you extend Express types
import * as express from 'express';

declare module 'express-session' {
  interface SessionData {
    customerId?: string; // Or any type you want for customerId
  }
}
