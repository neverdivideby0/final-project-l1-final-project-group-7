<template>
  <div class="main-container">

    <header class="header">

      <nav class="navbar">
        <a href="#" class="logo">
          <img loading="lazy" srcSet="https://c.io/api/v/9dee-4ff7-95f1-87d4ee79a778?apiKey=b1390de48d6247c499e829392e14f6a0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c66e0b60-9dee-4ff7-95f1-87d4ee79a778?apiKey=b1390de48d6247c499e829392e14f6a0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c66e0b60-9dee-4ff7-95f1-87d4ee79a778?apiKey=b1390de48d6247c499e829392e14f6a0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c66e0b60-9dee-4ff7-95f1-87d4ee79a778?apiKey=b1390de48d6247c499e829392e14f6a0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c66e0b60-9dee-4ff7-95f1-87d4ee79a778?apiKey=b1390de48d6247c499e829392e14f6a0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c66e0b60-9dee-4ff7-95f1-87d4ee79a778?apiKey=b1390de48d6247c499e829392e14f6a0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c66e0b60-9dee-4ff7-95f1-87d4ee79a778?apiKey=b1390de48d6247c499e829392e14f6a0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c66e0b60-9dee-4ff7-95f1-87d4ee79a77" alt="Logo" class="logo-img" />
        </a>

        <div class="navbar-links">
          <a href="#" class="navbar-link">Sign Out</a>
          <a href="#" class="navbar-link">Back to Home</a>

        </div>
      </nav>
    </header>

    <main class="content">

      <h1 class="title">Edit Company Details</h1>

      <div class="image-container">
        <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3c066d5f-5979-4d3d-b6bc-f69dcecf03ef?apiKey=b1390de48d6247c499e829392e14f6a0&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c066d5f-5979-4d3d-b6bc-f69dcecf03ef?apiKey=b1390de48d6247c499e829392e14f6a0&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c066d5f-5979-4d3d-b6bc-f69dcecf03ef?apiKey=b1390de48d6247c499e829392e14f6a0&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c066d5f-5979-4d3d-b6bc-f69dcecf03ef?apiKey=b1390de48d6247c499e829392e14f6a0&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c066d5f-5979-4d3d-b6bc-f69dcecf03ef?apiKey=b1390de48d6247c499e829392e14f6a0&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c066d5f-5979-4d3d-b6bc-f69dcecf03ef?apiKey=b1390de48d6247c499e829392e14f6a0&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c066d5f-5979-4d3d-b6bc-f69dcecf03ef?apiKey=b1390de48d6247c499e829392e14f6a0&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3c066d5f-5979-4d3d-b6bc-f69dcecf03ef?apiKey=b1390de48d6247c499e829392e14f6a0&" alt="Company Image" class="image" />
        <div class="image-text">Upload Your Image Here</div>]

        <label for="companyImage">Company Image:</label>

        <input type="file" id="companyImage" ref="companyImage" @change="handleImageUpload" />

      </div>
      <form class="form">

        <div class="form-group">
          <label for="website" class="form-label">Company Website</label>
          <input type="text" id="website" class="form-input" v-model="formData.companyWebsite" />
        </div>

        <div class="form-group">
          <label for="name" class="form-label">Company Name</label>
          <input type="text" id="name" class="form-input" v-model="formData.name"/>
        </div>

        <div class="form-group">
          <label for="about" class="form-label"> About Us</label>
          <textarea id="about" class="form-textarea" v-model="formData.aboutUs"></textarea>
        </div>

        <div class="form-group">
          <label for="contact" class="form-label">Company Contact Number</label>
          <input type="tel" id="contact" class="form-input" v-model="formData.contactNumber" />
        </div>

        <button type="submit" class="save-button">SAVE</button>

      </form>

    </main>

  </div>

</template>
  
  <script>

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import auth and createUserWithEmailAndPassword from Firebase
  export default {
    data() {
      return {
        formData: {
          companyWebsite: "",
          name: "",
          aboutUs: "",
          contactNumber: ""
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          await db.collection("companies").add(this.formData);
          alert("Data successfully stored!");
        } catch (error) {
          alert("Error storing data: " + error);
        }
      },

      handleImageUpload() {
            const file = this.$refs.companyImage.files[0];
            // Now you can handle the uploaded file, for example sending it to a server or processing it.
        }
    }
  };
  </script>
  
  <style>
    html, body {
        margin: 0;
        padding: 0;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 10px solid orange;
        background-color: #006CE4;
        opacity: 0.9;
        padding: 40px;
        height: 100vh; /* Set the container to occupy the full viewport height */
        overflow: auto;
        margin: 0; /* Remove margin */
        display: flex;
        flex-direction: column; /* Stack child elements vertically */
        align-items: center; /* Center child elements horizontally */
    }

    .header {
        padding-bottom: 40px; /* Increased padding */
        text-align: center; /* Centered the content */
    }

    .content {
        padding: 40px;
        width: 100%; /* Make content take full width of container */
        max-width: 600px; /* Optionally, set a maximum width for content */
    }

    h2 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 30px; /* Spacing after the title */
    }

    .input-group {
        margin-bottom: 20px;
    }

    input, textarea {
        width: 100%;
        padding: 12px; /* Increased padding for better touch feel */
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); /* subtle shadow for depth */
        font-size: 16px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }

    label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
    }

    button {
        padding: 10px 20px;
        border: none;
        background-color: #000;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
    }

    button:hover {
        background-color: #444;
    }

    .logo {
    width: 100%;
    height: auto;
    background-color: #FF5733
    }
</style>


