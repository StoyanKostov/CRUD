# CRUD
Proof of Concept

## End points
```
{   
    "home": {
        "url": "/user/",
        "method": "GET"
    },
    "create": {
        "url": "/user/create",
        "method": "POST",
        "params": {
            "email": "some-email@gmail.com",
            "forename": "firstName",
            "surname": "lastName"
        }
    },
    "read": {
        "url": "/user/read?id=3",
        "method": "GET"
    },
    "update": {
        "url": "/user/update",
        "method": "PUT",
        "params": {
            "id": 3,
            "user": {
                "email": "some-email@gmail.com",
                "forename": "firstName",
                "surname": "lastName"
            }
        }
    },
    "delete": {
        "url": "/user/read?id=3",
        "method": "DELETE"
    }
}
```
