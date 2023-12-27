process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Adjust the path based on your project structure
const { expect } = chai;

chai.use(chaiHttp);

describe("Books API", () => {
  // Test GET /books route
  describe("GET /books", () => {
    it("should get a list of books", async () => {
      const res = await chai.request(app).get("/books");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
    });
  });

  // Test GET /books/:id route
  describe("GET /books/:id", () => {
    it("should get a single book by ID", async () => {
      // Add logic to create a book and get its ID
      const bookId = 1; // Replace with actual book ID
      const res = await chai.request(app).get(`/books/${bookId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
    });

    it("should return 404 for invalid book ID", async () => {
      const invalidId = 999; // Replace with an ID that doesn't exist
      const res = await chai.request(app).get(`/books/${invalidId}`);
      expect(res).to.have.status(404);
    });
  });

  // Test POST /books route
  describe("POST /books", () => {
    it("should create a new book", async () => {
      const newBook = {
        title: "New Book",
        author: "John Doe",
        // Add other required fields as per your schema
      };

      const res = await chai.request(app).post("/books").send(newBook);
      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      // Add more assertions based on your expectations
    });

    it("should return 400 for invalid input", async () => {
      const invalidBook = {
        // Missing required fields
      };

      const res = await chai.request(app).post("/books").send(invalidBook);
      expect(res).to.have.status(400);
    });
  });

  
