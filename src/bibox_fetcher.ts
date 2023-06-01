import axios from "axios"
import { BIBoxBookData as BiBoxBookData } from "./types"

export class BiboxFetcher {
    constructor(readonly bookId: number, readonly bearerToken: string) {}

    async fetchBookData() {
        return (
            await axios.get(
                `
        https://backend.bibox2.westermann.de/v1/api/sync/${this.bookId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.bearerToken}`,
                    },
                }
            )
        ).data as BiBoxBookData
    }

    async fetchBookPage(pageUrl: string): Promise<Buffer> {
        return (
            await axios({
                method: "GET",
                url: pageUrl,
                responseType: "arraybuffer",
            })
        ).data
    }
}
