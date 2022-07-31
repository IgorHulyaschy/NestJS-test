## Migration automatically will create ADMIN with credentials: 

`{ email: "email@gmail.com", password: "password" }`
********

## API:

1. POST/auth/sign-up :

```
body: {
    "fname": string,
    "lname": string,
    "email": string,
    "password": string,
    "bossId"?: string
}
```

2. POST/auth/sign-in :

```
body: { "email": string, "password": string }
```

3. GET/users/me

4. PUT/users/boss :

```
body: { "bossId": string }
```