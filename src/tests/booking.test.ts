import Request from 'supertest';
import {describe, expect, it} from '@jest/globals';
import app from '../app';

describe("Testing booking", () => {
    it("Without login", async () => {
        const res = (await Request(app).get('/bookings'));

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

        const res = await Request(app).get("/bookings").set('Authorization', token);

        const aux = res.body.bookings[0];
        expect(res.statusCode).toEqual(200);
        expect(aux).toHaveProperty("id");
        expect(aux).toHaveProperty("name");
        expect(aux).toHaveProperty("order");
        expect(aux).toHaveProperty("in");
        expect(aux).toHaveProperty("out");
        expect(aux).toHaveProperty("request");
        expect(aux).toHaveProperty("status");
    });

});