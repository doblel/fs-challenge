## Flask / PostgresQL RESTful Api

### Getting started

1. (Optional but recommended) Set up a virtual environment `py -m venv venv` and activate it `.\venv\Scripts\activate`.
2. Install dependencies `pip install -r requirements.txt`.
3. Update `config.py` with your database name and credentials.
4. Run application with Flask cli:
   1. Set up flask app environment variable `set FLASK_APP=app.py`.
   2. Run application `flask run`. No need to set `FLASK_APP` again on server restart.
   
#### Note: If you change application's port make or root `/api` endpoint sure to update it on `client/src/api.js`

### Api structure

```
/server
├── README.md
├── /accounts
│   ├── __init__.py
│   ├── models.py
│   └── resources.py
│
├── __init__.py
├── app.py
├── extensions.py
├── requirements.txt
└── config.py
```
* accounts - holds the models and logic related to accounts.
* app.py - main application file.
* extensions.py - instantiate all extensions.
* config.py - holds all configurations.

### To do
* Scripts / Commands to Create, Drop and Migrate database.
* Add the correct HttpCode to Api responses.
* Human friendly error responses
* Handle internal errors
* Validate account email:
  * Valid email direction
  * ~~Unique value in database~~
* ~~More specific configuration objects~~.
* Improve app instantiation:
  * Encapsulate app instantiation within a function.  
  * Change config object dynamically based on environment mode.


### Deploy optimizations
* Load config values within `config.py` from environment variables for security.
