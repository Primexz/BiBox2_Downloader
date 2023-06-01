import { QuestionCollection } from "inquirer"

export const prompts: QuestionCollection<any> = [
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
        default: true,
        message:
            "Do you want to remove the introductory pages to get the correct number of pages?",
    },
]
