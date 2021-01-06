/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../app.js');

const request = supertest(app);

describe('Эндпоинты откликаются на запросы', () => {
  it('Возвращает данные и 200-й ответ по запросу к "/users"', () => request.get('/users').then((response) => {
    expect(response.status).toBe(200);
    expect(response.body.data.isDeveloper).toBeTruthy();
  }));
}, 10);
