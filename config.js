let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = process.env.TEST_DATABASE_URL || "postgresql://localhost:5432/books-test";
} else {
  DB_URI = process.env.DATABASE_URL || "postgresql://localhost:5432/books";
}

module.exports = { DB_URI };
