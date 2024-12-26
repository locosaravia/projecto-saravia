import { collection, doc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase'; // Asegúrate de que la ruta sea correcta

// Referencias a las colecciones
const usersCollection = collection(db, 'users');
const seriesCollection = collection(db, 'series');

// Función para registrar un nuevo usuario
export const registerUser = async (username: string, password: string) => {
  try {
    await addDoc(usersCollection, { username, password });
    return { success: true, message: 'Usuario registrado exitosamente.' };
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    return { success: false, message: error.message };
  }
};

// Función para verificar credenciales de usuario
export const loginUser = async (username: string, password: string) => {
  try {
    const q = query(usersCollection, where('username', '==', username), where('password', '==', password));
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0
      ? { success: true, message: 'Credenciales válidas.' }
      : { success: false, message: 'Usuario o contraseña incorrectos.' };
  } catch (error) {
    console.error('Error en login:', error.message);
    return { success: false, message: error.message };
  }
};

// Función para agregar una nueva serie
export const addSerie = async (nombre: string, capitulos: number, fechaEstreno: string, director: string) => {
  try {
    await addDoc(seriesCollection, { nombre, capitulos, fechaEstreno, director });
    return { success: true, message: 'Serie agregada exitosamente.' };
  } catch (error) {
    console.error('Error al agregar serie:', error.message);
    return { success: false, message: error.message };
  }
};

// Función para obtener todas las series
export const fetchSeries = async () => {
  try {
    const snapshot = await getDocs(seriesCollection);
    const series = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: series };
  } catch (error) {
    console.error('Error al obtener series:', error.message);
    return { success: false, message: error.message };
  }
};

// Función para eliminar una serie
export const deleteSerie = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'series', id));
    return { success: true, message: 'Serie eliminada exitosamente.' };
  } catch (error) {
    console.error('Error al eliminar serie:', error.message);
    return { success: false, message: error.message };
  }
};

// Función para actualizar una serie
export const updateSerie = async (id: string, data: { nombre?: string; capitulos?: number; fechaEstreno?: string; director?: string }) => {
  try {
    const docRef = doc(db, 'series', id);
    await updateDoc(docRef, data);
    return { success: true, message: 'Serie actualizada exitosamente.' };
  } catch (error) {
    console.error('Error al actualizar serie:', error.message);
    return { success: false, message: error.message };
  }
};
