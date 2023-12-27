/** Update data with matching ISBN to data, return updated book.
 * {isbn, amazon_url, author, language, pages, publisher, title, year}
 * => {isbn, amazon_url, author, language, pages, publisher, title, year}
 */
static async update(isbn, data) {
  const { rows } = await db.query(
    `UPDATE books SET 
          amazon_url = COALESCE($1, amazon_url),
          author = COALESCE($2, author),
          language = COALESCE($3, language),
          pages = COALESCE($4, pages),
          publisher = COALESCE($5, publisher),
          title = COALESCE($6, title),
          year = COALESCE($7, year)
        WHERE isbn = $8
      RETURNING isbn,
                amazon_url,
                author,
                language,
                pages,
                publisher,
                title,
                year`,
    [
      data.amazon_url,
      data.author,
      data.language,
      data.pages,
      data.publisher,
      data.title,
      data.year,
      isbn
    ]
  );

  if (rows.length === 0) {
    throw { message: `There is no book with an isbn '${isbn}`, status: 404 };
  }

  return rows[0];
}
