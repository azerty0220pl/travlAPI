import Request from 'supertest';
import {describe, expect, it} from '@jest/globals';
import app from '../app';

describe("Testing message", () => {
    it("Without login", async () => {
        const res = (await Request(app).get('/messages'));

        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual(true);
        expect(res.body.message).toEqual("Not Authorized");
    });
    
    it("With login", async () => {
        const tokenRes = await Request(app)
            .post('/login')
            .send({
                username: "admin",
                password: "password"
            });

        const token = tokenRes.body.token;

        const res = await Request(app).get("/messages").set('Authorization', token);

        const aux = res.body.messages[0];
        expect(res.statusCode).toEqual(200);
        expect(aux).toHaveProperty("id");
        expect(aux).toHaveProperty("name");
        expect(aux).toHaveProperty("email");
        expect(aux).toHaveProperty("phone");
        expect(aux).toHaveProperty("subject");
        expect(aux).toHaveProperty("message");
        expect(aux).toHaveProperty("archived");
        expect(aux).toHaveProperty("read");
        expect(aux).toHaveProperty("date");
    });

});