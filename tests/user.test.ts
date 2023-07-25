import Request from 'supertest';
import {describe, expect, it} from '@jest/globals';
import app from '../app';

describe("Testing booking", () => {
    it("Without login", async () => {
        const res = (await Request(app).get('/users'));

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

        const res = await Request(app).get("/users").set('Authorization', token);

        expect(res.statusCode).toEqual(200);
        expect("id" in res.body.users[0]).toEqual(true);
        expect("name" in res.body.users[0]).toEqual(true);
        expect("email" in res.body.users[0]).toEqual(true);
        expect("joined" in res.body.users[0]).toEqual(true);
        expect("description" in res.body.users[0]).toEqual(true);
        expect("phone" in res.body.users[0]).toEqual(true);
        expect("status" in res.body.users[0]).toEqual(true);
    });

});