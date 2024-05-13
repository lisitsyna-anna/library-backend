# REST API - Backend Application

This is a backend application for a RESTful API built using Node.js, Express, Mongoose, Multer, and
SendGrid. The API allows users to register, log in, log out, perform file uploading with Multer,
send emails with SendGrid, and operate with book collections.

## Getting Started

To get started with the backend application, follow these steps:

1. Clone the repository: `git clone https://github.com/lisitsyna-anna/library-backend`
2. Install the dependencies: `npm install`
3. Set up the necessary environment variables in the .env file. Example you can find in .env.example
   file.
4. Start the server: `npm run start:dev`

## API Endpoints

The following endpoints are available:

### Authentication

1. `POST /api/auth/register` - register a new user.

Request Body:

```
  {
     "email": string
     "password": string
  }
```

Response:

```
 {
     "email": string
     "name": string
     "avatarURL": string
 }

```

2. `POST /api/auth/login` - log in with existing credentials.

Request Body:

```
   {
      "email": string,
      "password": string
   }
```

Response:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODgxZjcxYzY2YmE1YzFjMDY5NWMwOCIsImlhdCI6MTY4NjY1MDMzOCwiZXhwIjoxNjg2NjUzOTM4fQ.3QrCNr3hQBBtOOIm0wN-th-ShD44bMp3iwAbLwDWn_E",
}

```

3. `GET /api/auth/logout` - log out the authenticated user.

Request Headers:

- Authorization (string, required): Bearer token received upon login.

Response:

```
    {
        "message": "Logout success"
    }
```

4. `GET /api/auth/current` - get the details of the currently authenticated user.

Request Headers:

- Authorization (string, required): Bearer token received upon login.

Response:

```
  {
      email: string
      name: string
  },

```

5. `PATCH /api/auth/avatars` - upload a new avatar for the currently authenticated user.

Request Headers:

- Authorization (string, required): Bearer token received upon login.

Request Body (Content-Type: multipart/form-data):

```
  {
      "avatar": "file.jpeg"
  }
```

Response:

```
    {
        "avatarURL": "avatars/64881f71c66ba5c1c0695c08_cat.jpeg"
    }
```

### Email Verification:

1.  `GET /api/auth/verify/:verificationCode` - verify the user's email address using the provided
    verification token.

Request Parameters: verificationToken (string, required): Verification code received during sign-up.

Response:

```
    {
      "message": 'Verification successful',
    }
```

2.  `POST /api/auth/verify` - resend a verification email to the user's email address.

Request Body:

```
    {
        "email": string
    }

```

Response:

```
    {
        "message": 'The verification email has been sent successfully',
    }
```

### Book's Operations

1.  `GET /api/books/` - get all books (requires authentication).

Request Headers:

- Authorization (string, required): Bearer token received upon login.

Response:

```
    {
         [
              {
                  "_id": string,
                  "title": string,
                  "author": string,
                  "favorite": boolean,
                  "genre": enum ['fantastic', 'love', 'comedy'],
                  "date": string,
                  "owner": {
                      "_id": string,
                      "email": string,
                      "name": string
                  },
              }
          ]
    }

```

2.  `GET /api/books/:bookId` - get a specific book by ID (requires authentication).

Request Headers:

- Authorization (string, required): Bearer token received upon login.

Request Parameters: bookId (string, required)

- Response:

```
    {
        "_id": string,
        "title": string,
        "author": string,
        "favorite": boolean,
        "genre": enum ['fantastic', 'love', 'comedy'],
        "date": string,
        "owner": string
    }
```

3.  `POST /api/books` - add a new book (requires authentication).

Request Headers:

- Authorization (string, required): Bearer token received upon login.

Request Body:

```
    {
      "title": string
      "author": string
      "favorite": boolean
      "genre": enum ['fantastic', 'love', 'comedy']
      "date": string,
    }
```

Response:

```
    {
      "_id": string
      "title": string
      "author": string
      "favorite": boolean
      "genre": enum ['fantastic', 'love', 'comedy']
      "date": string,
      "owner": "user's id from DB"
    }
```

4.  `PUT /api/books/:bookId` - update a book by ID (requires authentication).

Request Headers:

- Authorization (string, required): Bearer token received upon login.

Request Parameters: bookId (string, required)

Request Body:

```
      {
        "title": string
        "author": string
        "favorite": boolean
        "genre": enum ['fantastic', 'love', 'comedy']
        "date": string,
      }
```

Response:

```
       {
        "_id": string
        "title": string
        "author": string
        "favorite": boolean
        "genre": enum ['fantastic', 'love', 'comedy']
        "date": string,
        "owner": "user's id from DB"
      }
```

5.  `PATCH /api/books/:bookId/favorite` - update the favorite status of the book by ID (requires
    authentication).

Request Headers:

- Authorization (string, required): Bearer token received upon login.

Request Parameters: bookId (string, required)

Request Body:

```
    {
         "favorite": true or false
    }
```

Response:

```
    {
        "_id": string
        "title": string
        "author": string
        "favorite": boolean
        "genre": enum ['fantastic', 'love', 'comedy']
        "date": string,
        "owner": string
    }
```

6.  `DELETE /api/books/:bookId` - delete a book by ID (requires authentication).

Request Headers:

- Authorization (string, required): Bearer token received upon login.

Request Parameters: bookId (string, required)

Response:

```
    {
        "message": "Delete success",
    }
```

## Dependencies

The backend application uses the following dependencies:

- Express: Fast, unopinionated, minimalist web framework for Node.js.
- Mongoose: Elegant MongoDB object modeling for Node.js.
- Multer: Middleware for handling multipart/form-data, used for file uploads.
- SendGrid: Email sending service for transactional and marketing emails.
- Joi: Schema description language and data validator for JavaScript.
- bcryptjs: Library for hashing passwords.
- jsonwebtoken: JSON Web Token implementation for Node.js.
- dotenv: Loads environment variables from a .env file.

## Development Dependencies

- Nodemon: Development tool that automatically restarts the node application when file changes in
  the directory are detected.

## Contact Information

If you have any questions or feedback, please feel free to contact me:

- Email: [anna.lisicina9309@gmail.com](mailto:anna.lisicina9309@gmail.com)
- GitHub: [lisitsyna-anna](https://github.com/lisitsyna-anna)
