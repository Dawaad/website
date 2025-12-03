import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string | null;
    publishedDate: string;
    updatedDate: string;
    tags: string[];
    author: string;
    featured: boolean;
    readingTime: number;
    status: "Draft" | "Published" | "Archived";
}

export interface BlogPostWithContent extends BlogPost {
    blocks: BlockObjectResponse[];
}

export interface NotionDatabaseProperties {
    Title: {
        type: "title";
        title: Array<{ plain_text: string }>;
    };
    Slug: {
        type: "rich_text";
        rich_text: Array<{ plain_text: string }>;
    };
    Status: {
        type: "select";
        select: { name: "Draft" | "Published" | "Archived" } | null;
    };
    "Published Date": {
        type: "date";
        date: { start: string } | null;
    };
    "Updated Date": {
        type: "date";
        date: { start: string } | null;
    };
    "Cover Image": {
        type: "files";
        files: Array<{ type: "external" | "file"; external?: { url: string }; file?: { url: string } }>;
    };
    Excerpt: {
        type: "rich_text";
        rich_text: Array<{ plain_text: string }>;
    };
    Tags: {
        type: "multi_select";
        multi_select: Array<{ name: string }>;
    };
    Author: {
        type: "people";
        people: Array<{ name?: string }>;
    };
    Featured: {
        type: "checkbox";
        checkbox: boolean;
    };
    "Reading Time": {
        type: "number";
        number: number | null;
    };
}

export type NotionPage = PageObjectResponse & {
    properties: NotionDatabaseProperties;
};

export interface Heading {
    text: string;
    slug: string;
    level: 2 | 3;
}

export interface TableOfContents {
    headings: Heading[];
}
