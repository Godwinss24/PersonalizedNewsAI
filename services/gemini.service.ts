import * as dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiAI {
    private apiKey: string;
    private model: string = 'gemini-1.5-flash'; // use the latest stable version
    private genAI: GoogleGenerativeAI;

    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("Gemini API key missing.");
        }

        this.apiKey = process.env.GEMINI_API_KEY;
        this.genAI = new GoogleGenerativeAI(this.apiKey);
    }

    async summarize(text: string | null): Promise<string | undefined> {
        const model = this.genAI.getGenerativeModel({ model: this.model });

        const result = await model.generateContent([
            { text: `I don't understand this. explain in simple terms?:\n\n${text}` }
        ]);

        const response = result.response;
        return response.text();
    }
}
