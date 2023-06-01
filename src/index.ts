import { PDFWriter } from "./pdf_writer"
import fsProm from "fs/promises"
import fs from "fs"
import { BiboxFetcher } from "./bibox_fetcher"

const bookId = 0
const bearer = ""

;(async () => {
    const biBoxFetcher = new BiboxFetcher(bookId, bearer)
    const bookData = await biBoxFetcher.fetchBookData()

    const pages: {
        id: number
        buf: Buffer
    }[] = []

    //remove useless introduction pages to keep the correct page cnt
    delete bookData.pages[1]
    delete bookData.pages[2]

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
