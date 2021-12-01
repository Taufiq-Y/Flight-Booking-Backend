const app = require('../app');
const request = require('supertest');
const user = require('../models/User');
const mongoose = require('mongoose');

const userNew = {
    _id: mongoose.Types.ObjectId(),
    firstName: "Yusuf",
    lastName: "PJ",
    email: "yusuf@mail.com",
    password: "password"
}

test('should test be sucessful', async () => {
    expect(2 + 2).toBe(4);
})

jest.setTimeout(30000);

beforeEach(async () => {
    await user.deleteMany({});
    await user(userNew).save();
})

test('should create new user', async () => {
    await request(app).post("/users/signup")
        .send({
            _id: mongoose.Types.ObjectId(),
            firstName: "yusuf",
            lastName: "Pj",
            email: "yusuf@mail.com",
            password: "password"
        })
        .expect(201)
})


test('should login in the user', async () => {
    await request(app).post("/users/passenger/login")
        .send({
            email: "omar@mail.com",
            password: "password"
        })
        .expect((resp) => {
            resp.email = "omar@mail.com"
            resp.message = "Auth Succesful"
        })
})

test('should delete the user', async () => {
    await request(app).delete("/users/" + userNew._id)
        .expect(200)
})

