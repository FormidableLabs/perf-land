/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.main = (req, res) => {
  const knex = require("knex")({
    client: "mysql",
    connection: {
      [process.env.DB_CONNECTION_TYPE_KEY]:
        process.env.DB_CONNECTION_TYPE_VALUE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "data",
    },
  });

  knex
    .select("*")
    .from("page_runs")
    .limit(1)
    .then((results) => {
      const payload = JSON.stringify(results, null, 2);
      res.status(200).send(payload);
    })
    .then(() => knex.destroy());
};
