import PDFKit from "pdfkit"

export class PDFWriter {
    private a4Page = [595.28, 841.89] as [number, number]

    craftBookPdf(pages: string[] | Buffer[]) {
        const s = Date.now()
        const doc = new PDFKit({ margin: 0, size: this.a4Page })

        pages.forEach((page, index) => {
            doc.image(page, 0, 0, {
                fit: this.a4Page,
                align: "center",
                valign: "center",
            })
            if (pages.length != index + 1) doc.addPage()
        })

        doc.end()
        console.log(`finished pdf creation after ${Date.now() - s}ms`)
        return doc
    }
}
