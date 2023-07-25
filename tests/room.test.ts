import Request from 'supertest';
import {describe, expect, it} from '@jest/globals';
import app from '../app';

describe("Testing room", () => {
    it("Without login", async () => {
        const res = (await Request(app).get('/rooms'));

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

        const res = await Request(app).get("/rooms").set('Authorization', token);

        expect(res.statusCode).toEqual(200);
        expect("id" in res.body.rooms[0]).toEqual(true);
        expect("name" in res.body.rooms[0]).toEqual(true);
        expect("type" in res.body.rooms[0]).toEqual(true);
        expect("ammenities" in res.body.rooms[0]).toEqual(true);
        expect("price" in res.body.rooms[0]).toEqual(true);
        expect("offer" in res.body.rooms[0]).toEqual(true);
        expect("status" in res.body.rooms[0]).toEqual(true);
    });

});