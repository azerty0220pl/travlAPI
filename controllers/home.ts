import { Request, Response } from "express";

const homeController = (_req: Request, res: Response) => {
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

export default homeController;