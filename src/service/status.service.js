import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { docRef, storage } from "./firebase.config";

export const statusServ = {
  getStt: () => {
    let q = query(docRef, orderBy("createdAt", "desc"));
    return getDocs(q);
  },
  post: (status, upload, calbackSuccess) => {
    const postStt = () => {
      addDoc(docRef, {
        ...status,
        createdAt: Timestamp.now(),
      })
        .then((res) => {
          calbackSuccess();
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    };
    if (upload) {
      upload.forEach(async (file, index) => {
        await uploadBytes(
          ref(storage, `${upload[0].uid}/${file.uid}`),
          file.originFileObj
        );
        if (index == upload.length - 1) {
          postStt();
        }
      });
    } else {
      postStt();
    }
  },
  update: (status, id) => {
    return updateDoc(doc(docRef, id), { ...status });
  },
  delete: (id) => {
    return deleteDoc(doc(docRef, id));
  },
  getPath: async (path) => {
    let folderRef = ref(storage, path);
    let listPath = [];
    try {
      let res = await listAll(folderRef);
      res.items.forEach((item) => {
        listPath.push(item.fullPath);
      });
    } catch (error) {
      console.log("error: ", error);
    }
    return listPath;
  },
  getImg: (path) => {
    return getDownloadURL(ref(storage, path));
  },
};
