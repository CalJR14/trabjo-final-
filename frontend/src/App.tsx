// App.tsx
import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { Reducer } from 'react';

// Tipos para el estado y las acciones
interface Item {
  _id: string;
  name: string;
  genre: string;
  cost: number;
}

interface Action {
  type: string;
  item?: Item;
  id?: string;
  items?: Item[];
}

// Acciones para el reducer
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const FETCH_ITEMS = 'FETCH_ITEMS';

// Reducer para gestionar el estado de la lista de juegos
const itemsReducer: Reducer<{ items: Item[] }, Action> = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { items: [...state.items, action.item] };
    case UPDATE_ITEM:
      return { items: state.items.map(item => (item._id === action.item?._id ? action.item : item)) };
    case DELETE_ITEM:
      return { items: state.items.filter(item => item._id !== action.id) };
    case FETCH_ITEMS:
      return { items: action.items };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(itemsReducer, { items: [] });
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [cost, setCost] = useState(0);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/games');
      dispatch({ type: FETCH_ITEMS, items: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/games', { name, genre, cost });
      dispatch({ type: ADD_ITEM, item: response.data });
      setName('');
      setGenre('');
      setCost(0);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItem = async () => {
    try {
      if (editId) {
        const response = await axios.put(`http://localhost:5000/games/${editId}`, { name, genre, cost });
        dispatch({ type: UPDATE_ITEM, item: { _id: editId, name, genre, cost } });
        setName('');
        setGenre('');
        setCost(0);
        setEditId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/games/${id}`);
      dispatch({ type: DELETE_ITEM, id });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Pixel Shop inventario</h1>
      <form>
        <label>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Género:
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </label>
        <br />
        <label>
          Costo:
          <input type="number" value={cost} onChange={(e) => setCost(e.target.valueAsNumber)} />
        </label>
        <br />
        <button onClick={editId ? updateItem : addItem}>
          {editId ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
      <ul>
        {state.items.map((item: Item) => (
          <li key={item._id}>
            {item.name} ({item.genre}) - ${item.cost}
            <button onClick={() => { setEditId(item._id); setName(item.name); setGenre(item.genre); setCost(item.cost); }}>
              Editar
            </button>
            <button onClick={() => deleteItem(item._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;