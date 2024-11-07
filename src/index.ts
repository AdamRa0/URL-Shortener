import express, { type Request, type Response, type Express, Router } from "express";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
const router: Router = express.Router();

const prisma = new PrismaClient();

type Payload = {
    url: string;
}

type Res = {
    message: string,
    shortCode?: string,
}

function generateRandomString(length: number = 8): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
}

router.post("/", async (req: Request, res: Response) => {
    const { url }: Payload = req.body;
    const generatedShortCode: string = generateRandomString();

    const data = {
        url: url,
        shortCode: generatedShortCode,
    };

    const shortCode = await prisma.shortLink.create({ data: data });  

    const response: Res = {
        message: "Shortcode created successfully",
        shortCode: shortCode.shortCode,
    }

    res.json(response);
    res.statusCode = 201;
})

router.get('/:shortCode', async (req: Request, res: Response) => {
    const shortCode = req.params.shortCode;
    const shortLink = await prisma.shortLink.findFirst({
        where: {
            shortCode: shortCode
        }
    });

    if (shortLink !== null) {
        return res.redirect(shortLink.url);
    }

    const response: Res = {
        message: "Shortlink not found"
    }
    res.json(response);
    res.statusCode = 404;
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