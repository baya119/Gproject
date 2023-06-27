const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { PrismaClient } = require("@prisma/client");


const app = express();
const prisma = new PrismaClient();

async function connectDB(){
    try {
        await prisma.$connect();
        console.log('? Database connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("<h1>Welcome to encharet backend</h1>")
})

app.use("/api", routes);

app.listen(3000);
