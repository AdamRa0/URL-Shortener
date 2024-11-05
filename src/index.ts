import express, { type Request, type Response, type Express, Router } from "express";

const app: Express = express();
const router: Router = express.Router();

router.post("/", (req: Request, res: Response) => {
    res.json("Create new shortened URL");
    res.statusCode = 201;
})

router.get('/:shortCode', (req: Request, res: Response) => {
    res.json("Get long form of shortened URL");
    res.statusCode = 200;
})

router.patch("/:shortCode", (req: Request, res: Response) => {
    res.json("Update long form of shortened URL");
    res.statusCode = 200;
})

router.delete("/:shortCode", (req: Request, res: Response) => {
    res.json("Deleted long form of shortened URL");
    res.statusCode = 204;
})

router.get("/:shortCode/stats", (req: Request, res: Response) => {
    res.json("Shortcode URL statistics");
    res.statusCode = 200;
})

app.use(express.json());
app.use("/shorten", router)

app.get("/", (req: Request, res: Response) => {
    res.json("Welcome to express");
    res.statusCode = 200;
})

app.post

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port 3000")
});