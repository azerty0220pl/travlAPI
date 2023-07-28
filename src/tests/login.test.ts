import Request from 'supertest';
import {describe, expect, it} from '@jest/globals';
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
            
        expect(res.statusCode).toEqual(202);
        expect("id" in res.body.user).toEqual(true);
        expect("name" in res.body.user).toEqual(true);
        expect("email" in res.body.user).toEqual(true);
        expect("phone" in res.body.user).toEqual(true);
        expect("joined" in res.body.user).toEqual(true);
        expect("description" in res.body.user).toEqual(true);
        expect("status" in res.body.user).toEqual(true);
        expect(typeof res.body.token).toEqual("string");
    });
});