import request from "supertest";
import app from "../src/app";
import { Todo } from "../src/Models/Todo";
import { ITodo } from "../src/Interfaces/ITodo";
import { ObjectID } from "mongodb";

const testObj: Array<ITodo> = [{
  _id: new ObjectID(),
  text: "123"
}, {
  _id: new ObjectID(),
  text: "234"
}];



beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(testObj);
  }).then(() => done()).catch((e) => { console.log(e); });

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
          expect(todos.length).toBe(2);
          // expect(todos[0].text).toBe(testText);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it("should create a new todo", (done) => {
    const text = "Test todo";
    request(app).post("/todos")
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it("should return 2 todos", (done) => {
    request(app).get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.doc.length).toBe(2);
      }).end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
});

describe("GET /todos/:id", () => {
  it("should return doc", (done) => {
    console.log(testObj[0]._id.toHexString());
    request(app).get(`/todos/${testObj[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.doc.text).toBe(testObj[0].text);
      })
      .end(done);
    // done();

  });

  it("should return 404 for not found", (done) => {
    request(app).get("/todos/5bcc97c061ef6e04dce5a040")
      .expect(404)
      .end(done);
  });

  it("should return 404 for non ObjectID", (done) => {
    request(app).get("/todos/5bcc97c0343441ef6e04dce5a040")
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should remove a todo", (done) => {
    const id = testObj[0]._id.toHexString();

    request(app).delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.doc.text).toBe(testObj[0].text);
      }).end((err, res) => {
        if (err) {
          done(err);
        }
        else {
          Todo.findById(id).then((todo) => {
            expect(todo).toBeNull();
            done();
          }).catch((e) => {
            done(e);
          });
        }
      });
  });

  it("should return 404 if not found a todo", (done) => {
    request(app).get("/todos/5bcc97c061ef6e04dce5a040")
      .expect(404)
      .end(done);
  });
  it("should return 404 if not valid ObjectId", (done) => {
    request(app).get("/todos/5bcc97c0343441ef6e04dce5a040")
      .expect(404)
      .end(done);
  });


});