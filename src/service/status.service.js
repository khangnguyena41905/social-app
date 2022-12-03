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
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { docRef, storage } from "./firebase.config";

export const statusServ = {
  getStt: () => {
    let q = query(docRef, orderBy("createdAt", "desc"));
    return getDocs(q);
  },
  post: (status, upload, calbackSuccess, onLoading, offLoading) => {
    onLoading();
    const postStt = (status) => {
      addDoc(docRef, {
        ...status,
        createdAt: Timestamp.now(),
      })
        .then((res) => {
          calbackSuccess();
          offLoading();
        })
        .catch((err) => {
          console.log("err: ", err);
          offLoading();
        });
    };
    if (upload) {
      let imgList = [];
      upload.forEach(async (file, index) => {
        try {
          await uploadBytes(
            ref(storage, `${status.uid}/${file.uid}`),
            file.originFileObj
          );
          let url = await getDownloadURL(
            ref(storage, `${status.uid}/${file.uid}`)
          );
          imgList = [...imgList, { name: file.uid, url }];
          if (index == upload.length - 1) {
            postStt({ ...status, imgList });
          }
        } catch (error) {
          offLoading();
        }
      });
    } else {
      postStt(status);
    }
  },
  update: (status, id) => {
    return updateDoc(doc(docRef, id), { ...status });
  },
  delete: (id, uid, imgList, onSuccess, onFalse) => {
    // delete img on storage
    if (imgList) {
      imgList.forEach((item) => {
        deleteObject(ref(storage, `${uid}/${item.name}`));
      });
    }
    // delete post on firebase document
    deleteDoc(doc(docRef, id))
      .then((res) => {
        onSuccess();
      })
      .catch((err) => {
        onFalse();
      });
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
