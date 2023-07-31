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

        let aux = res.body.rooms[0];
        expect(res.statusCode).toEqual(200);
        expect(aux).toHaveProperty("id");
        expect(aux).toHaveProperty("name");
        expect(aux).toHaveProperty("type");
        expect(aux).toHaveProperty("ammenities");
        expect(aux).toHaveProperty("price");
        expect(aux).toHaveProperty("offer");
        expect(aux).toHaveProperty("status");
    });

});