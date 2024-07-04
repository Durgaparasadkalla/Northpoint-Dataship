module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Post@12",
  DB: "Jira Application",
  dialect: "postgres",   //Specifies the database dialect to use. In this case, it's PostgreSQL. Sequelize supports multiple dialects such as 'mysql', 'sqlite', 'mssql', and 'postgres'.
  pool: {   //Configures the connection pool, which is a collection of database connections maintained for reuse. This can improve performance by reducing the overhead of establishing a new connection for each query.
    max: 5,   //The maximum number of connections in the pool. This sets the upper limit of how many connections Sequelize can open to the database simultaneously.
    min: 0,   //The minimum number of connections in the pool.
    acquire: 30000,   //The maximum time (in milliseconds) that pool will try to get a connection before throwing an error.
    idle: 10000   //The maximum time (in milliseconds) that a connection can be idle before being released.
  }
};
