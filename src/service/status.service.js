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
  post: (status, upload, onSuccess, onLoading, offLoading) => {
    onLoading();
    const postStt = (status) => {
      addDoc(docRef, {
        ...status,
        createdAt: Timestamp.now(),
      })
        .then((res) => {
          onSuccess();
          offLoading();
        })
        .catch((err) => {
          console.log("err: ", err);
          offLoading();
        });
    };
    if (upload.length > 0) {
      let imgList = [];
      const postImg = async () => {
        for (const file of upload) {
          await uploadBytes(
            ref(storage, `${status.uid}/${file.uid}`),
            file.originFileObj
          );
          let url = await getDownloadURL(
            ref(storage, `${status.uid}/${file.uid}`)
          );
          imgList = [...imgList, { name: file.uid, url }];
        }
        postStt({ ...status, imgList });
      };
      postImg();
    } else {
      postStt(status);
    }
  },
  update: ({ content, upload, imgList }, id, uid, onSuccess, onLoading) => {
    let i = 0;
    onLoading();
    let imgDeletedList = [...imgList];
    upload.forEach((item) => {
      imgDeletedList = imgDeletedList.filter((itemDeleted) => {
        return itemDeleted.name != item.name;
      });
    });
    let imgNewList = [...upload];
    imgList.forEach((item) => {
      imgNewList = imgNewList.filter((newItem) => {
        return newItem.name != item.name;
      });
    });
    // Delete progress
    if (imgDeletedList) {
      imgDeletedList.forEach((itemDeleted) => {
        deleteObject(ref(storage, `${uid}/${itemDeleted.name}`));
        imgList = imgList.filter((item) => item.uid != itemDeleted.uid);
        updateDoc(doc(docRef, id), { content, imgList }).then(() => {
          onSuccess();
        });
      });
      i++;
    }
    // Add new img progress and update
    if (imgNewList) {
      imgNewList.forEach(async (file, index) => {
        await uploadBytes(
          ref(storage, `${uid}/${file.uid}`),
          file.originFileObj
        );
        let url = await getDownloadURL(ref(storage, `${uid}/${file.uid}`));
        imgList = [...imgList, { name: file.uid, url }];
        if (index == imgNewList.length - 1) {
          updateDoc(doc(docRef, id), { content, imgList }).then(() => {
            onSuccess();
          });
        }
      });
      i++;
    }
    if (i != 0) {
      updateDoc(doc(docRef, id), { content }).then(() => {
        onSuccess();
      });
    }
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
