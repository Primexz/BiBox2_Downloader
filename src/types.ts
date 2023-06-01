export interface BIBoxBookData {
    book: Book
    chapters: BookChapter[]
    pages: Page[]
    categories: any[]
    materials: any[]
}

export interface Book {
    id: number
    removed: boolean
    version: number
    title: string
    subtitle: string
    description: string
    pagenum: number
    lastModified: number
    region: string
    isbn: string
    publisher: string
    demo: boolean
    demoMaterials: boolean
    coverUrl: string
    coverHash: string
    searchIndexSize: number
    pageDataSize: number
    searchIndexHash: string
    pageDataHash: string
    chapterVersion: number
    hidePageInput: boolean
    hasZav: boolean
    hasGrusi: boolean
    info: BookInfo[]
    addonmodules: any[]
}

export interface BookInfo {
    id: number
    removed: boolean
    version: number
    bookId: number
    title: string
    content: string
    lastModified: string
    publisherInfo: number
    tab: string
}

export interface BookChapter {
    id: number
    removed: boolean
    version: number
    title: string
    pagenumStart: string
    pagenumEnd: string
    bookId: number | null
    sortCode: number
    demo: boolean
    hasDemoMaterials: boolean
    type: string
    filesize: null
    md5sum: null
    children: BookChapter[]
}

export interface Page {
    id: number
    removed: boolean
    version: number
    name: string
    internalPagenum: number
    bookId: number
    demo: boolean
    type: string
    aemDorisID: null
    images: Image[]
}

export interface Image {
    id: number
    removed: boolean
    version: number
    url: string
    width: number
    height: number
    pageId: number
    md5sum: string
    filesize: number
}
