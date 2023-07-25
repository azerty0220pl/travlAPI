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

        expect(res.statusCode).toEqual(200);
        expect("id" in res.body.messages[0]).toEqual(true);
        expect("name" in res.body.messages[0]).toEqual(true);
        expect("email" in res.body.messages[0]).toEqual(true);
        expect("phone" in res.body.messages[0]).toEqual(true);
        expect("subject" in res.body.messages[0]).toEqual(true);
        expect("message" in res.body.messages[0]).toEqual(true);
        expect("archived" in res.body.messages[0]).toEqual(true);
        expect("read" in res.body.messages[0]).toEqual(true);
        expect("date" in res.body.messages[0]).toEqual(true);
    });

});