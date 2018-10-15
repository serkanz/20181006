import request from "supertest";
import app from "../src/app";
import { Todo } from "../src/Models/Todo";

beforeEach((done) => {
  Todo.remove({}).then(() => done());
  // jest.setTimeout(100000);
});

describe("GET /random-url", () => {
  it("should return 404", (done) => {
    request(app).get("/reset")
      .expect(404, done);

  });

  it("shouldn't create a todo", (done) => {
    request(app).post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          // expect(todos[0].text).toBe(testText);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it("should create a new todo", (done) => {
    const testText = "Test todo";
    request(app).post("/todos")
      .send({ text: testText })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(testText);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(testText);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
});
