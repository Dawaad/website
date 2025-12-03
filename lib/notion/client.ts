import { Client } from "@notionhq/client";

// Singleton pattern for Notion client
let notionClient: Client | null = null;

export function getNotionClient(): Client {
    if (!notionClient) {
        if (!process.env.NOTION_API_KEY) {
            throw new Error(
                "NOTION_API_KEY is not defined in environment variables. " +
                    "Please add it to your .env.local file."
            );
        }

        notionClient = new Client({
            auth: process.env.NOTION_API_KEY,
        });
    }

    return notionClient;
}

export function getNotionDatabaseId(): string {
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
        throw new Error(
            "NOTION_DATABASE_ID is not defined in environment variables. " +
                "Please add it to your .env.local file."
        );
    }

    return databaseId;
}
