

const axios = require('axios');

const api = axios.create({
  validateStatus: function (status) {
    return status < 500; //config axios to ignore errors till 499
  },
});

const url = 'http://localhost:5000/api'; //backend url

describe('User tests block', () =>
{
  
  let userObject = {
    name: 'basil' + Math.floor(Math.random() * 100),
    email: 'basil' + Math.floor(Math.random() * 100) + '@gmail.com',
    password: 'basil@123',
  };

  test('user resgistration test', async () => {
    const response = await api.post(`${url}/auth/register`, userObject);
    console.log(response.status);
    expect(response.status).toBe(201);
  });
  test("user exists test", async () =>
  {
    const response=await api.post(`${url}/auth/register`,userObject);
    console.log(response.status);
    expect(response.status).toBe(400);
  }
    
  )
  test("user invalid detailed regsiteration", async () =>
  {
    const response=await api.post(`${url}/auth/register`,{name:""});
    console.log(response.status);
    expect(response.status).toBe(400);
  })

  test('user login test', async () => {
    const response = await api.post(`${url}/auth/login`, {
      email: userObject.email,
      password: userObject.password,
    });
    console.log(response.status);
    expect(response.status).toBe(200);
  });
  test("test not valid email", async () => {
    const response=await api.post(`${url}/auth/login`,{
      email:"invalid email",
      password:userObject.password
    
    })
    console.log(response.status);
    expect(response.status).toBe(400);
  })
  test("test invalid password", async () => {
    const response=await api.post(`${url}/auth/login`,{
      email:userObject.email,
      password:"invalid password"
    
    })

    console.log(response.status);
    expect(response.status).toBe(400);
  })
  test("test incomplete login details", async () => {
    const response=await api.post(`${url}/auth/login`,{
      
      password: "invalid password"
    
    })
    console.log(response.status);
    expect(response.status).toBe(400);
  })



});



