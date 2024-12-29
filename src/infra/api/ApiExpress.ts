import { Api } from "../../interfaces/routes/api";
import express, { Express } from "express";
import { Route } from "../../interfaces/routes/route";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();
export class ApiExpress implements Api {

  private app: Express

  private constructor(routes: Route[]) {
    this.app = express()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }));

    console.log(process.env.FRONTEND_URL, process.env.FRONTEND_DEV_URL)
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || process.env.FRONTEND_DEV_URL || "http://localhost:5174",  // Verifique se isso está correto
        credentials: true,  // Permite cookies e cabeçalhos de autorização
      })
    );

    this.app.use(cookieParser());

    this.app.use((req, res, next) => {
      console.log("Cookies recebidos:", req.cookies);
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

      this.app[method](path, handler);

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