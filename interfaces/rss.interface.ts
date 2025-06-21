import { Response } from "express";
import { UserCategory } from "../enums/categories.enum";

export interface RSSrequest extends Response {
    body: {
        newsType: UserCategory
    }
}