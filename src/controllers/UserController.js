const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    // console.log(request.query);
    const { order } = request.query;
    const sortdUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(sortdUsers));
  }
}