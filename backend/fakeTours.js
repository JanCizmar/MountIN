"use strict";

const mongoose = require('mongoose');

const config = require('./src/config');
const TourModel = require('./src/models/tour');
const UserModel = require('./src/models/user');
const faker = require('faker');
const fetch = require('node-fetch');
const USERS_COUNT = 20;
const TOUR_COUNT = 50;

const fakeRoute = () => {
    let route = [];
    let initPiont = [parseFloat(faker.address.latitude()), parseFloat(faker.address.longitude())];
    //Produce some random points around
    for (let i = 0; i < faker.random.number({min: 1, max: 20}); i++) {
        let pointNear = [(initPiont[1] + Math.random() * 0.009).toString(), (initPiont[0] + Math.random() * 0.009).toString()];
        route.push(pointNear)
    }
    return route;
};

const fakeImage = () => fetch('https://source.unsplash.com/random').then(resp => {
    return resp.url;
});

//Connect to the MongoDB database; then start the server
mongoose
    .connect(config.mongoURI)
    .then(() => {
        console.log('connected to db');
        mongoConnected()
    })
    .catch(err => {
        console.log('Error connecting to the database', err.message);
        process.exit(err.statusCode);
    });

async function mongoConnected() {

    await TourModel.remove({});
    await UserModel.remove({});


    let toursCounter = 0;

    function exit() {
        console.log('Created tours' + toursCounter + ' for ' + USERS_COUNT + ' users.');
        process.exit();
    }

    for (let i = 1; i <= USERS_COUNT; i++) {
        let user = {
            "username": faker.internet.userName(),
            "firstName": faker.name.firstName(),
            "surname": faker.name.lastName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "professional": faker.random.boolean(),
        };

        user = await UserModel.create(user);
        console.log('Created user: ' + user.username);
        let tourCount = Math.ceil(Math.random() * (TOUR_COUNT - toursCounter) * 2 / (USERS_COUNT - (i - 1)));

        for (let j = 0; j < tourCount; j++) {
            let fakedImageUrl = await fakeImage();
            let tour = {
                "name": faker.lorem.words(),
                "description": faker.lorem.paragraphs(),
                "image": {
                    "large": fakedImageUrl,
                    "thumbnail": fakedImageUrl
                },
                "date": faker.random.boolean() ? faker.date.past() : faker.date.future(),
                "difficulty": faker.random.number({min: 1, max: 3}),
                "type": faker.random.number({min: 1, max: 4}),
                "cost": faker.random.boolean() ? faker.random.number({min: 1, max: 350}) : 0,
                "route": fakeRoute(),
                "rating": faker.random.number({min: 1, max: 5})
            };
            tour.creator = user.id;
            tour.route = {
                "type": "MultiPoint",
                "coordinates": tour.route
            };
            tour = await TourModel.create(tour);
            console.log('Created: ' + tour.name);
            toursCounter++;
            if (toursCounter === 50) exit();
        }
        console.log('Created ' + tourCount + ' tours for user ' + user.username);
    }
    exit();
}

