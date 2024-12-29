
import { ApiExpress } from "./infra/api/ApiExpress";
import { mainRoutes } from "./interfaces/routes/mainRoutes";
import dotenv from "dotenv";
dotenv.config();

const api = ApiExpress.create(mainRoutes);

const port = process.env.PORT || 3001;

api.start(Number(port));