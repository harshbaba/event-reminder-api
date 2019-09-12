1.Register Request Data (POST)
URL:
https://event-reminder-app.herokuapp.com/register

firstName       : String,
lastName        : String,
emailId         : String,
mobileNo        : Number, 
password        : String

=========Response========
1.Pass Case
{
    "success": true,
    "message": "User saved successfully"
}

2.Fail Case
{
    "success": false,
    "message": "Email Id Already Registered"
}

3.Fail Case
{
    "success": false,
    "message": "Something went wrong"
}

====================Login=============
URL:
https://event-reminder-app.herokuapp.com/login

1.Login Request Data (POST)

emailId         : String,
password        : String 

===Response===
1.Pass Case
{
    "success": true,
    "message": "Enjoy your token!",
    "userDetails": {
        "firstName": "Harsh",
        "lastName": "Yadav",
        "emailId": "harsh@gmail.com",
        "mobileNo": 9971980456,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNWQ3NDJhYWQ4M2UwM2YwNGUwYmI2OTdkIiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX192IjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsIm1vYmlsZU5vIjoiaW5pdCIsImVtYWlsSWQiOiJpbml0IiwibGFzdE5hbWUiOiJpbml0IiwiZmlyc3ROYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsIm1vYmlsZU5vIjp0cnVlLCJlbWFpbElkIjp0cnVlLCJsYXN0TmFtZSI6dHJ1ZSwiZmlyc3ROYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJwYXRoc1RvU2NvcGVzIjp7fSwiZW1pdHRlciI6eyJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfSwiJG9wdGlvbnMiOnRydWV9LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJwYXNzd29yZCI6IjEyMzQ1NiIsIm1vYmlsZU5vIjo5OTcxOTgwNDU2LCJlbWFpbElkIjoiaGFyc2hiYWJhMDA3QGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiWWFkYXYiLCJmaXJzdE5hbWUiOiJIYXJzaCIsIl9pZCI6IjVkNzQyYWFkODNlMDNmMDRlMGJiNjk3ZCJ9LCIkaW5pdCI6dHJ1ZSwiaWF0IjoxNTY3ODk0MzMwLCJleHAiOjE1Njc5ODE5MzB9.pMwWJboZxA8w2m-ZvtwYDnVtF4lerXT0f6MzZ5N_nN8"
    }
}

2.Fail Case
{
    "success": false,
    "message": "user id 0r password did not match"
}
3.Fail Case
{
    "success": false,
    "message": "Something went wrong"
}

3.Events Api URL (Post)
https://event-reminder-app.herokuapp.com/allEvents
1.All Events Request Data (POST)

emailId         : String,

===Response===
1.Pass Case
{
    "success": true,
    "data": [
        {
            "_id": "5d7aa7f53c10ee2cfc9627e7",
            "eventType": "Birthday",
            "eventName": "Jack's Birthday",
            "eventDate": "2019-12-02",
            "emailId": "harshbaba007@gmail.com",
            "mobileNo": 9999222200,
            "isRepeatAnnually": true,
            "__v": 0
        },
        {
            "_id": "5d7aa8811a55c93024ab91f9",
            "eventType": "Birthday",
            "eventName": "Ipsita's Birthday",
            "eventDate": "2019-12-22",
            "emailId": "harshbaba007@gmail.com",
            "mobileNo": 9999333300,
            "isRepeatAnnually": true,
            "__v": 0
        },
    ]
}

4.Create Event Url (Post)
https://event-reminder-app.herokuapp.com/createEvent

1.Request
eventType       : Birthday, Anniversary, Other,
eventName       : Rahul Semwal's Birthday,
eventDate       : 2019-12-02,
emailId         : Your Email Id (User Email Id),
mobileNo        : event person mobile no, 
isRepeatAnnually: true or false,

5.Delete Event Url (Post)
https://event-reminder-app.herokuapp.com/deleteEvent

1.Request
emailId: harshbaba007@gmail.com
_id:     Event id ex: 5d7aa7f53c10ee2cfc9627e7

6.Edit an Event Url (Post)
https://event-reminder-app.herokuapp.com/editEvent

1.Request
_id             : Event id ex: 5d7aa7f53c10ee2cfc9627e7
eventType       : Birthday, Anniversary, Other,
eventName       : Rahul Semwal's Birthday,
eventDate       : 2019-12-02,
emailId         : Your Email Id (User Email Id),
mobileNo        : event person mobile no, 
isRepeatAnnually: true or false,
