const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Todo API Tests', () => {
  let token;
  let itemId;

  it('POST /login - should login with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'password' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token', 'mock-token');
    token = res.body.token;
  });

  it('POST /login - should fail with invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'wrong', password: 'wrong' });
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error', 'Invalid credentials');
  });

  it('GET /todos - should retrieve todo items', async () => {
    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('POST /todos - should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: `New Todo ${Date.now()}`, description: 'Test todo' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('title');
    expect(res.body).to.have.property('id');
    itemId = res.body.id;
  });

  it('POST /todos - should fail with missing title', async () => {
    const res = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'No title' });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Title is required');
  });

  it('PUT /todos/:id - should update a todo', async () => {
    const res = await request(app)
      .put(`/todos/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Todo', description: 'Updated description' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('title', 'Updated Todo');
  });

  it('PUT /todos/:id - should fail for non-existent ID', async () => {
    const res = await request(app)
      .put('/todos/9999')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Invalid Update' });
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error', 'Item not found');
  });

  it('DELETE /todos/:id - should delete a todo', async () => {
    const res = await request(app)
      .delete(`/todos/${itemId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(204);
  });

  it('DELETE /todos/:id - should fail for non-existent ID', async () => {
    const res = await request(app)
      .delete('/todos/9999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error', 'Item not found');
  });
});