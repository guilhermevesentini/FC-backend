import { Api } from "../../interfaces/routes/api";
import express, { Express } from "express";
import { Route } from "../../interfaces/routes/route";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

export class ApiExpress implements Api {

  private app: Express

  private constructor(routes: Route[]) {
    this.app = express()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }));

    const urls = process.env.FRONTEND_URL || "https://fc-control.netlify.app";

    this.app.use(
      cors({
        origin: urls,
        credentials: true,
      })
    );

    this.app.use(cookieParser());

    this.app.use((req, res, next) => {
      next();
    });
    
    this.addRoutes(routes)
  }
  
  public static create(routes: Route[]){
    return new ApiExpress(routes)
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();
      this.app[method](
        path, 
        ...handler
      );
  });
  }

  start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      this.listRoutes();
  });
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => {
        const route = layer.route;
        return {
          path: route.path,
          method: route.stack[0].method,
        };
      });
  
    const uniqueRoutes = Array.from(
      new Map(routes.map((r: any) => [`${r.method}:${r.path}`, r])).values()
    );
  
    console.log(uniqueRoutes);
  }
}