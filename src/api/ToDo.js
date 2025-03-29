const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

const getTodos = () =>
  new Promise((resolve, reject) => {
    fetch(`${dbUrl}/todos.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data ? Object.values(data) : []))
      .catch(reject);
  });

const createTodo = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${dbUrl}/todos.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateTodo = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${dbUrl}/todos/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteTodo = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${dbUrl}/todos/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getTodos, createTodo, updateTodo, deleteTodo };
