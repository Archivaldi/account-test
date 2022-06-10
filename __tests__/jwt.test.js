const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const data = require("../testData/jwt.data");

describe('Testing the process generating token', () => {
    test("(1) Should return the passed value", () => {
        const refreshToken = generateToken(data.test1, "refresh", true);
        jwt.verify(refreshToken, "TokenSecretTest", async (err, user) => {
            expect(user.id).toBe(data.test1.id);
            expect(user.email).toBe(data.test1.email);
            expect(user.name).toBe(data.test1.name);
            expect(user.picture).toBe(data.test1.picture);
        })
    });

    test("(2) Should return error message", () => {
        const refreshToken = generateToken(data.test1, "refresh", true);
        jwt.verify(refreshToken, "TokenSecret", async (err, user) => {
            expect(err.message).toBe('invalid signature');
        })
    })
});