import JokeApiJob from "../../src/cron-jobs/JokeApiJob";
import request from "supertest";
import express from "express";
import Eris from "eris";

let instance, app;

beforeEach(() => {
 app = express();

 jest.spyOn(app, "get");

 instance = new JokeApiJob(new Eris(), app);

 jest.spyOn(instance, "subscribe");
});

test("GET /subscribe-joke-api and subscribe to schedule", (done) => {
 // TODO: Implementación
});
