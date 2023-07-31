import Request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import app from '../app';

describe("Testing login", () => {
    it("Wrong credentials", async () => {
        const res = await Request(app)
            .post('/login')
            .send({
                username: "wrong",
                password: "credentials"
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual(true);
        expect(res.body.message).toEqual("Not Authorized");
    });

    it("Incomplete credentials", async () => {
        const res = await Request(app)
            .post('/login')
            .send({
                username: "wrong"
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual(true);
        expect(res.body.message).toEqual("Not Authorized");
    });

    it("Incomplete credentials", async () => {
        const res = await Request(app)
            .post('/login')
            .send({
                password: 'credentials'
            });

        expect(res.statusCode).toEqual(401);
        expect(res.body.error).toEqual(true);
        expect(res.body.message).toEqual("Not Authorized");
    });

    it("Correct credentials", async () => {
        const res = await Request(app)
            .post('/login')
            .send({
                username: "admin",
                password: "password"
            });

        const aux = res.body.user;
        expect(res.statusCode).toEqual(202);
        expect(aux).toHaveProperty("id");
        expect(aux).toHaveProperty("name");
        expect(aux).toHaveProperty("email");
        expect(aux).toHaveProperty("phone");
        expect(aux).toHaveProperty("joined");
        expect(aux).toHaveProperty("description");
        expect(aux).toHaveProperty("status");
        expect(typeof res.body.token).toEqual("string");
    });
});