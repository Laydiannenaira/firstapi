let users = require('../mocks/users'); //APOS A CRIACAO DO PATCH FOI ALTERADO PARA DE const para let.

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


    response.send(200, sortdUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return response.send(400, {error: 'User not found'});
    } 
    response.send(200, user);
  },

  creatUser(request, response) {
    const { body } = request;

    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(newUser);

    response.send(200, newUser);

  },

  updateUser(request, response) {
    let { id } = request.params;
    const { name } = request.body;

    id = Number(id);

    const userExists = users.find((user) => user.id === id);

    if(!userExists) {
      response.send(400, { error: 'User not found' })
    }

    users = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name,
        };
      }

      return user;
    });

    response.send(200, { id, name });

  },

  deleteUser(request, response) {
    let { id } = request.params;
    id = Number(id);

    users = users.filter((user) => user.id !== id);
    response.send(200, { deleted: true });
  },
  
}