import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "651eff50b8c635b80588364f",
      user: "651ea237800d25aaa0949c70",
      title: "Chemistry",
      description: "asdfawrfw sffv xc ",
      tag: "Studies",
      date: "2023-10-05T18:24:16.540Z",
      __v: 0,
    },
    {
      _id: "651eff50b8c635b80588364x",
      user: "651ea237800d25aaa0949c70",
      title: "Chemistry",
      description: "asdfawrfw sffv xc ",
      tag: "Studies",
      date: "2023-10-05T18:24:16.540Z",
      __v: 0,
    },
    {
      _id: "651eff50b8c635b80588364y",
      user: "651ea237800d25aaa0949c70",
      title: "Chemistry",
      description: "asdfawrfw sffv xc ",
      tag: "Studies",
      date: "2023-10-05T18:24:16.540Z",
      __v: 0,
    },
    {
      _id: "651eff50b8c635b80588364z",
      user: "651ea237800d25aaa0949c70",
      title: "Chemistry",
      description: "asdfawrfw sffv xc ",
      tag: "Studies",
      date: "2023-10-05T18:24:16.540Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  // get items
  const getItems = async () => {
    const url = host + "/notes/fetchAllNotes/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // add item
  const addItem = async (title, description, tag) => {
    const url = host + "/notes/addnote/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    const note = {
      title: json.title,
      tag: json.tag,
      description: json.description,
      _id: json._id,
    };
    setNotes(notes.concat(note));
  };

  // delete item
  const deleteItem = async (id) => {
    const url = host + "/notes/deleteNotes/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // update item
  const updateItem = async (id, title, description, tag) => {
    const url = host + "/notes/updateNotes/" + id;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let updatedNotes = [];
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
      updatedNotes.push(element);
    }
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addItem, deleteItem, updateItem, getItems }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
