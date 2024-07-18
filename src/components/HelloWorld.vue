<template>
  <div class="d-flex justify-content-center">
    <form class="row g-3" @submit.prevent="addPost">
      <div class="col-md-6">
        <label class="visually-hidden" for="codeInput">Code</label>
        <input v-model="code_name" type="text" class="form-control" id="codeInput" placeholder="ကုတ်နံပါတ်">
      </div>
      <div class="col-md-6">
        <label class="visually-hidden" for="nameInput">Name</label>
        <input v-model="mm_name" type="text" class="form-control" id="nameInput" placeholder="နာမည်">
      </div>
      <div class="col-12">
        <label for="formFileMultiple" class="form-label">ပစ္စည်းပုံရွေးချယ်ရန်</label>
        <input class="form-control" type="file" id="formFileMultiple" multiple @change="handleFileUpload">
      </div>
      <div class="col-12">
        <label for="infoInput" class="form-label">အချက်အလက်</label>
        <input v-model="product_detail" type="text" class="form-control" id="infoInput" placeholder="အချက်အလက်">
      </div>
      <div class="col-12">
        <label for="sizeInput" class="form-label">အရွယ်အစား</label>
        <input v-model="product_size" type="text" class="form-control" id="sizeInput" placeholder="အရွယ်အစား">
      </div>
      <div class="col-12">
        <label for="exampleTextarea" class="form-label">Example textarea</label>
        <textarea v-model="example_text" class="form-control" id="exampleTextarea" rows="3"></textarea>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">အတည်ပြုရန်</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase/config';

export default {
  name: 'HelloWorld',
  setup() {
    const code_name = ref('');
    const mm_name = ref('');
    const product_size = ref('');
    const product_detail = ref('');
    const example_text = ref('');
    const selectedFiles = ref([]);

    const handleFileUpload = (event) => {
      selectedFiles.value = event.target.files;
    };

    const uploadFiles = async () => {
      const uploadedFiles = [];
      for (const file of selectedFiles.value) {
        const fileRef = storageRef(storage, `images/${file.name}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        uploadedFiles.push(downloadURL);
      }
      return uploadedFiles;
    };

    const addPost = async () => {
      const imageUrls = await uploadFiles();
      const newPost = {
        code_name: code_name.value,
        mm_name: mm_name.value,
        product_size: product_size.value,
        product_detail: product_detail.value,
        example_text: example_text.value,
        images: imageUrls,
      };

      try {
        await addDoc(collection(db, "product_posts"), newPost);
        window.location.reload()
      } catch (error) {
        console.error("Error adding document",error)
      }
    };
    
    return { code_name, mm_name, product_size, product_detail, example_text, addPost, handleFileUpload };
  },
};
</script>

<style scoped>
form {
  width: 100%; /* Full width */
  max-width: 500px; /* Max width */
}
label {
  margin-left: 10px;
}
</style>
