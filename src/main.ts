
import { ApiExpress } from "./infra/api/ApiExpress";
import { mainRoutes } from "./interfaces/routes/mainRoutes";
import dotenv from "dotenv";
import * as Sentry from '@sentry/node';

dotenv.config();

Sentry.init({
  dsn: 'https://5bce16ec607f22dd8c4706eba92875a6@o4508582223740928.ingest.us.sentry.io/4508582225707008',
  tracesSampleRate: 1.0,
});

const api = ApiExpress.create(mainRoutes);

const port = process.env.PORT || 8080;

api.start(Number(port));