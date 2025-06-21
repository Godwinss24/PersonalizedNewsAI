import jsonwebtoken from 'jsonwebtoken';

export class JwtService {
    private secretKey: string;
    private expiresIn: string;

    constructor(secretKey?: string, expiresIn = "1h") {
        if (!secretKey) {
            throw new Error("JwtService initialization failed: secretKey is required.");
        }

        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
    }

    async generateJWT(payload: any) {
        return jsonwebtoken.sign(payload, this.secretKey);
    }

    async verifyJWT(token: string): Promise<any> {
        return jsonwebtoken.verify(token, this.secretKey);
    }
}
