# JBSYSTEM

## Installation

> yarn install
> touch .env

## This is the API endpoints that are available

### 1. Get 10 job applications sorted by first name: GET Request

Endpoint

```text
/api/apply
```

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body: `None`

Response:

```json
[
  {
    "id": "7d7ba627-6077-448a-bdef-c176031c36d6",
    "firstName": "Olivier",
    "lastName": "walter",
    "email": "walterolivier4@gmail.com",
    "location": "sdsfdfsdf",
    "cvFile": "application/file-1647380401306.pdf",
    "status": "pending",
    "createdOn": "2022-03-15T21:43:42.125Z",
    "modifiedDate": "2022-03-15T21:43:42.126Z"
  },
  {
    "id": "a0070a52-11c9-43e7-9c93-ecd03b86e6a2",
    "firstName": "Olivier",
    "lastName": "walter",
    "email": "walterolivier4@gmail.com",
    "location": "sdsfdfsdf",
    "cvFile": "application/file-1647380401306.pdf",
    "status": "pending",
    "createdOn": "2022-03-15T21:43:42.327Z",
    "modifiedDate": "2022-03-15T21:43:42.327Z"
  },
  {
    "id": "ea8e5015-9904-47c6-8da6-4d69ed86e13b",
    "firstName": "Olivier",
    "lastName": "walter",
    "email": "walterolivier4@gmail.com",
    "location": "sdsfdfsdf",
    "cvFile": "application/file-1647380401306.pdf",
    "status": "pending",
    "createdOn": "2022-03-15T21:43:42.579Z",
    "modifiedDate": "2022-03-15T21:43:42.579Z"
  }
]
```

### 2. Send Your Application: POST Request

Endpoint

```text
/api/apply
```

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body:

```json
{
  "firstName": "olivier",
  "lastName": "habimana",
  "email": "walterolivier@gmail.com",
  "location": "kigali",
  "cvFile": "application/Olivier.pdf"
}
```

Response:

```json
{
  "status": 201,
  "message": "successfully Applied",
  "data": {
    "id": "5ddd78d7-435d-462e-953c-93f5440b79c3",
    "firstName": "olivier",
    "lastName": "habimana",
    "email": "walterolivier@gmail.com",
    "location": "kigali",
    "cvFile": "application/Olivier.pdf",
    "status": "pending",
    "createdOn": "2022-03-15T21:50:17.697Z",
    "modifiedDate": "2022-03-15T21:50:17.697Z"
  }
}
```

### 3. Get Application by ID: GET Request

Endpoint

```text
/api/apply/be1a70ad-288c-4ac5-994e-e2111db03885
```

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body: None

Response:

```json
{
  "status": 200,
  "applicant": {
    "id": "be1a70ad-288c-4ac5-994e-e2111db03885",
    "firstName": "olivier",
    "lastName": "habimana",
    "email": "walterolivier@gmail.com",
    "location": "kigali",
    "cvFile": "application/Olivier.pdf",
    "status": "pending",
    "createdOn": "2022-03-15T21:53:31.251Z",
    "modifiedDate": "2022-03-15T21:53:31.251Z"
  }
}
```

### 4. Get Update application status by ID: GET Request

Endpoint

```text
/api/apply/62e8d3e5-01eb-46a8-81d1-e0e905ea5e7d
```

Headers:

```json
{
  "Content-Type": "application/json"
}
```

Body: None

Response:

```json
{
  "status": 200,
  "message": "Application status successfully updated",
  "data": {
    "id": "62e8d3e5-01eb-46a8-81d1-e0e905ea5e7d",
    "firstName": "olivier",
    "lastName": "habimana",
    "email": "walterolivier@gmail.com",
    "location": "kigali",
    "cvFile": "application/Olivier.pdf",
    "status": "Dropped",
    "createdOn": "2022-03-15T21:57:19.786Z",
    "modifiedDate": "2022-03-15T21:57:34.615Z"
  }
}
```
