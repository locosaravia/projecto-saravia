import { db } from './firebase';
import { setDoc, doc, getDoc, collection, addDoc, query, getDocs, where } from 'firebase/firestore';

// Usar setDoc con username como ID (opción antigua)
export const registerUser = async (username: string, password: string) => {
  try {
    // Verificar si el nombre de usuario ya existe en la base de datos
    const userRef = doc(db, "users", username); // Referencia al documento usando el nombre de usuario
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      throw new Error("El nombre de usuario ya existe.");
    }

    // Almacenar el usuario con su contraseña en Firestore
    await setDoc(userRef, {
      username: username,
      password: password,  // Almacena la contraseña como texto sin cifrar
    });

    alert("Usuario registrado con éxito");
  } catch (err: any) {
    console.error("Error registrando usuario:", err);
    throw new Error(err.message || "Ha ocurrido un error al registrar el usuario.");
  }
};

// Usar addDoc para crear un documento con un ID automático (opción nueva)
export const registerUserWithAutoID = async (username: string, password: string) => {
  try {
    // Obtener la referencia a la colección de usuarios
    const usersCollectionRef = collection(db, "users");

    // Agregar un nuevo documento con los datos del usuario
    await addDoc(usersCollectionRef, {
      username: username,
      password: password,  // Almacena la contraseña como texto sin cifrar
    });

    alert("Usuario registrado con éxito");
  } catch (err: any) {
    console.error("Error registrando usuario:", err);
    throw new Error(err.message || "Ha ocurrido un error al registrar el usuario.");
  }
};

// Función para hacer login de un usuario
export const loginUser = async (username: string, password: string) => {
  try {
    // Obtener la referencia al documento del usuario usando el nombre de usuario
    const userRef = doc(db, "users", username);
    const userDoc = await getDoc(userRef);

    // Si el documento no existe, el usuario no está registrado
    if (!userDoc.exists()) {
      throw new Error("El nombre de usuario no existe.");
    }

    // Obtener los datos del documento
    const userData = userDoc.data();
    
    // Verificar si la contraseña coincide
    if (userData?.password !== password) {
      throw new Error("Contraseña incorrecta.");
    }

    alert("Usuario autenticado con éxito");
    return true; // Se retorna true si el login es exitoso

  } catch (err: any) {
    console.error("Error al iniciar sesión:", err);
    throw new Error(err.message || "Ha ocurrido un error al iniciar sesión.");
  }
};
export const addSeries = async (nombre: string, capitulos: number | string, fechaEstreno: string, director: string) => {
    try {
      // Obtener la referencia a la colección de series
      const seriesCollectionRef = collection(db, "series");
  
      // Agregar un nuevo documento con los datos de la serie
      await addDoc(seriesCollectionRef, {
        nombre: nombre,
        capitulos: capitulos,
        fechaEstreno: fechaEstreno,
        director: director,
      });
  
      console.log("Serie agregada exitosamente");
    } catch (err: any) {
      console.error("Error al agregar la serie:", err);
      throw new Error(err.message || "Ha ocurrido un error al agregar la serie.");
    }
  };

  export const checkUserExists = async (username: string) => {
    const usersCollection = collection(db, 'usuarios'); // Suponiendo que los usuarios están en una colección llamada 'usuarios'
    const q = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(q);
  
    return !querySnapshot.empty; // Si la consulta devuelve algún documento, significa que el usuario existe
  };