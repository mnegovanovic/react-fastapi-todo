from typing import Union

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Todo(BaseModel):
    text: str
    is_complete: bool

TODOS = []
TODOS.append(Todo(text="Learn about React", is_complete=False))
TODOS.append(Todo(text="Meet friend for lunch", is_complete=False))
TODOS.append(Todo(text="Build really cool todo app", is_complete=False))


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/todos")
def list_todo():
    return TODOS

@app.post("/todos")
def new_todo(todo: Todo):
    new_todo = Todo(text=todo.text, is_complete=False)
    TODOS.append(new_todo)
    return new_todo

@app.get("/todos/{index}")
def read_todo(index: int):
    if index > (len(TODOS) - 1):
        raise HTTPException(status_code=404, detail="TODO doesnt exist")
    
    todo = TODOS[index]
    return todo

@app.put("/todos/{index}")
def update_todo(index: int, todo: Todo):
    if index > (len(TODOS) - 1):
        raise HTTPException(status_code=404, detail="TODO doesnt exist")
    
    TODOS[index] = todo
    return TODOS[index]

@app.delete("/todos/{index}")
def delete_todo(index: int):
    if index > (len(TODOS) - 1):
        raise HTTPException(status_code=404, detail="TODO doesnt exist")
    
    del TODOS[index]

