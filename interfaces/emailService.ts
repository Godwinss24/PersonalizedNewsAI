export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

export interface Sender {
    email: string | undefined;
    name: string | undefined;
}

export interface To {
    name: string;
    email: string;
}

export interface SendinBlueEmailModel {
    sender: Sender;
    subject: string;
    to: To[];
    htmlContent: string;
}