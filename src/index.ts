import { PDFWriter } from "./pdf_writer"
import fsProm from "fs/promises"
import fs from "fs"
import { BiboxFetcher } from "./bibox_fetcher"
import chalk from "chalk"
import figlet from "figlet"
import inquirer from "inquirer"

const bearer = ""

;(async () => {
    console.log(
        chalk.yellow(
            figlet.textSync("BiBox2_Download", { horizontalLayout: "full" })
        )
    )

    const results = await inquirer.prompt([
        {
            name: "book_id",
            type: "input",
            message:
                "Please enter your Book Id. You can find it in the URL at BiBox2: https://bibox2.westermann.de/book/XXXX/page/1",
            validate: (value) =>
                Number.isNaN(parseInt(value))
                    ? "invalid input. enter a valid number"
                    : true,
        },
        {
            name: "bearer_token",
            type: "password",
            message: "Please enter your bearer token.",
        },
        {
            name: "remove_introduction",
            type: "confirm",
            message:
                "Do you want to remove the introductory pages to get the correct number of pages?",
        },
    ])

    const biBoxFetcher = new BiboxFetcher(results.book_id, results.bearer_token)
    const bookData = await biBoxFetcher.fetchBookData()

    const pages: {
        id: number
        buf: Buffer
    }[] = []

    //remove useless introduction pages to keep the correct page cnt
    if (results.remove_introduction) {
        delete bookData.pages[1]
        delete bookData.pages[2]
    }

    await Promise.all(
        bookData.pages.map(async (page, i) => {
            console.log("fetching book page", page.name)

            //this is a hack to keep the correct page order
            pages.push({
                id: i,
                buf: await biBoxFetcher.fetchBookPage(page.images[0].url),
            })
        })
    )

    const writer = new PDFWriter()
    const bookTitle = `out/${bookData.book.title.replaceAll(
        " ",
        "-"
    )}_${bookData.book.subtitle.replaceAll(" ", "-")}.pdf`
    const pageBufs = pages.sort((a, b) => a.id - b.id).map((data) => data.buf)

    if (!fs.existsSync("out")) await fsProm.mkdir("out")
    writer.craftBookPdf(pageBufs).pipe(fs.createWriteStream(bookTitle))
})()
