<template>
    <div>
        <div class="button-container">
        <!-- <router-link to="/profile"> -->
            <button class="button">View Profile</button>
        <!-- </router-link> -->

        <!-- <router-link to="/listings"> -->
            <button class="button">View Listings</button>
        <!-- </router-link> -->
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center; /* Center buttons horizontally */
    align-items: center; /* Center buttons vertically */
    gap: 20px; /* Add spacing between buttons */
    height: 20vh; /* Adjust the height to center buttons vertically */
}

.button {
    background-color: #007BFF; /* Set your desired button color */
    color: #fff;
    border: none;
    padding: 20px 40px; /* Increase padding for larger buttons */
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #0056b3; /* Change the color on hover */
}
</style>
