# react-fastapi-todo

To run the TODO you will need 2 terminals. In the first run:

```console
virtualenv env
. env/bin/activate
pip install fastapi
pip install "uvicorn[standard]"
uvicorn main:app --reload
```

... in second run:

```console
npm install react react-dom react-router-dom
npm install axios
npm start
```

... thats it.

