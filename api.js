import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyAoo5AiaFrv_NQtev9ww8hFBrN5v6z6ZO8",
  authDomain: "van-life-28f3d.firebaseapp.com",
  projectId: "van-life-28f3d",
  storageBucket: "van-life-28f3d.appspot.com",
  messagingSenderId: "321177953567",
  appId: "1:321177953567:web:5ae5b15143cae409d5fc2a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRefs = collection(db, "vans");
export async function getVans(id) {
  const snapshot = await getDocs(vansCollectionRefs);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans
}

// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans() {
    const q = query(vansCollectionRefs, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
