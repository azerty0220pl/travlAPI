import { Request, Response } from "express";

const infoController = (_req: Request, res: Response) => {
    res.json({
        name: "Hotel Miranda",
        endpoints: {
            private: {
                get: [
                    "/bookings",
                    "/messages",
                    "/rooms",
                    "/users"
                ]
            },
            public: {
                get: [
                    "/"
                ],
                post: [
                    "/login"
                ]
            }
        }
    })
}

export default infoController;