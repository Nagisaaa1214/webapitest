const Koa = require("koa");
import { RouterContext } from "koa-router";
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const json = require("koa-json");
const app = new Koa();
const router = new Router();

let films: string[] = [
    "Titanic",
    "House of Murdeur",
    "Man in Wilds",
    "Super 1",
];

router.get("/film", async (ctx: RouterContext, next: any) => {
    ctx.body = { films: films };
    await next();
});

router.post("/film", async (ctx: RouterContext, next: any) => {
    // Get the film title from the request body
    let film : string [];
    const title:any = ctx.request.body;

    // Add the new film to the array
    film =[...films, title.title];

    // Return success response with the updated list
    ctx.status = 201; // Created
    ctx.body = {
        message: "Film added successfully",
        film,
    };

    await next();
});


app.use(bodyParser()); 
app.use(json());
app.use(logger());
app.use(router.routes()).use(router.allowedMethods());
app.listen(10888, () => {
    console.log("Koa Started on port 10888");
});
