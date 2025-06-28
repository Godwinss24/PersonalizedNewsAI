var fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
require('dotenv').config();
import { AppError } from "../interfaces/appError";

import { Sender, SendinBlueEmailModel, To } from '../interfaces/emailService';

export class EmailService {
    private Domain: string;
    private ApiKey: string;
    private SenderEmail: string;
    private SenderName: string;
    // private contactEmail: string;

    private recipient: string;
    private name: string;
    private templateVariables: Record<string, any>;
    private subject: string;
    private templateFileName: string;

    /**
     * 
     * @param recipient the user who you are sending the email to.
     * @param name the user's name.
     * @param templateVariables the content that should be inserted into the email.
     * @param subject the subject of the email.
     * @param templateFileName the template file name.
     */
    constructor(recipient: string, name: string, templateVariables: Record<string, any>, subject: string, templateFileName: string) {

        if (!process.env.BrevoDomain || !process.env.BrevoApiKey || !process.env.BrevoSenderEmail || !process.env.BrevoSenderName) {
            throw new Error("Email credentials missing");
        }

        this.Domain = process.env.BrevoDomain;
        this.ApiKey = process.env.BrevoApiKey;
        this.SenderEmail = process.env.BrevoSenderEmail;
        this.SenderName = process.env.BrevoSenderName;
        // this.contactEmail = process.env.CONTACT_EMAIL;

        this.recipient = recipient;
        this.name = name;
        this.templateVariables = templateVariables;
        this.subject = subject;
        this.templateFileName = templateFileName;

    }

    /**
     * 
     * @returns The email template.
     */
    private getRawEmailTemplate() {
        return path.join(__dirname, '../emailTemplate', this.templateFileName);
    }

    /**
     * 
     * @param emailTemplate the email template.
     * @param templateVariables the fields to insert into the email.
     * @returns the email template, but with the user's details inserted into it.
     */
    private insertContentIntoEmail(emailTemplate: string, templateVariables: Record<string, any>) {
        const compiledEmailTemplate = Handlebars.compile(fs.readFileSync(emailTemplate, 'utf8'));

        return compiledEmailTemplate({
            ...templateVariables,
            // contactEmail: this.contactEmail
        });
    }

    /**
     * 
     * @returns request headers for brevo
     */
    private createRequestHeaders() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("api-key", this.ApiKey ?? '');
        return myHeaders;
    }

    /**
     * 
     * @returns the sender of this mail which is newdevz
     */
    private createSender(): Sender {
        return {
            email: this.SenderEmail,
            name: this.SenderName,
        };
    }

    /**
     * 
     * @param name the user's name 
     * @param email the user's email.
     * @returns an array of people who will recieve this email.
     */
    private createReceiver(name: string, email: string): To[] {
        return [
            { name, email },
        ];
    }

    /**
     * 
     * @param sender the user sending the email, which is newdevz.
     * @param Subject the subject of the email.
     * @param toWho an array of user's who this email is being sent to.
     * @param htmlToSend the email to send to the user.
     * @returns the request body for brevo.
     */
    private createBrevoRequestBody(sender: Sender, Subject: string, toWho: To[], htmlToSend: string): SendinBlueEmailModel {
        return {
            sender,
            subject: Subject,
            to: toWho,
            htmlContent: htmlToSend,
        };
    }

    /**
     * 
     * @param headers the request headers for brevo
     * @param requestBody the request body for brevo
     * @returns request options.
     */
    private createRequestOptions(headers: Headers, requestBody: SendinBlueEmailModel): RequestInit {
        return {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody)
        }
    }


    /**
     * Sends the email to the user.
     */
    async sendEmailToUser() {

        /**
         * Create the sender.
         * This is newdevz.
         */
        const sender = this.createSender();

        /**
         * Creates an array of users who this email is to being sent to.
         */
        const receiver = this.createReceiver(this.name, this.recipient);

        /**
         * Get raw email template.
         * At this stage the user's details have not been inserted into the email.
         */
        const rawTemplate = this.getRawEmailTemplate();

        /**
         * Insert the user's details into the email.
         */
        const emailWithUsersDetails = this.insertContentIntoEmail(rawTemplate, this.templateVariables);

        /**
         * Create request body.
         */
        const body = this.createBrevoRequestBody(sender, this.subject, receiver, emailWithUsersDetails);

        /**
         * Create request headers.
         */
        const headers = this.createRequestHeaders();

        /**
         * Create request options.
         */
        const requestOptions = this.createRequestOptions(headers, body);

        /**
         * Make a request to brevo. 
         * This is where the email is being sent.
         */
        const response = await fetch(this.Domain ?? '', requestOptions);

        if (!response.ok) {
            throw new AppError('Failed to send email')
        }

    }
}

export class NewsAlert extends EmailService {

    constructor(recipient: string, name: string, templateVariables: Record<string, any>) {
        const subject = 'Your AI-Powered News Summary';
        const templateFileName = 'news.html';
        super(recipient, name, templateVariables, subject, templateFileName);
    }
}


