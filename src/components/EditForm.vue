<template>
    <div class="profile min-h-screen flex justify-center bg-gray-100 md:p-6">
        <div
            class="profile__container w-full max-w-md bg-white rounded-xl shadow-lg"
        >
            <!-- Profile Picture -->
            <div
                class="profile__avatar flex flex-col items-center relative after:absolute after:inset-0 after:rounded-t-xl after:bg-[conic-gradient(at_50%_65.3%,#F5FBFF_0.235turn,transparent_0.235turn_0.765turn,#F5FBFF_0.765turn)]"
            >
                <div class="flex justify-between w-full z-10 p-8">
                    <!-- Back Button -->
                    <button
                        @click="goBack"
                        class="text-gray-700 cursor-pointer"
                    >
                        ❮
                    </button>
                    <div class="w-64 flex-auto">
                        <h1
                            class="profile-form__title text-2xl font-bold text-center"
                        >
                            Edit Profile
                        </h1>
                    </div>
                </div>
                <div class="profile__avatar-wrapper relative z-10">
                    <label class="profile-form__avatar relative cursor-pointer">
                        <img
                            :src="profileImage"
                            alt="Profile"
                            class="profile__avatar-img w-24 h-24 rounded-full border-4 border-white shadow-lg"
                        />
                        <input
                            type="file"
                            class="hidden"
                            @change="uploadImage"
                        />
                        <span
                            class="profile__edit-btn absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
                        >
                            <img
                                :src="editIco"
                                alt="Edit Icon"
                                class="w-8 h-8 bg-[#f5f5f5] rounded-full p-1 cursor-pointer"
                            />
                        </span>
                    </label>
                </div>
                <h2 class="profile__name text-lg font-bold mt-2">
                    {{ form.fullName }}
                </h2>
                <p class="profile__info text-gray-500">
                    {{ form.email }} | {{ form.phone }}
                </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="profile__form mt-6 p-6">
                <div class="profile__form-group relative">
                    <input
                        :disabled="!isEditing"
                        v-model="form.fullName"
                        type="text"
                        id="fullName"
                        class="profile__input peer"
                        required
                    />
                    <label for="fullName" class="profile__label"
                        >Full Name</label
                    >
                    <p v-if="errors.fullName" class="profile__error">
                        {{ errors.fullName }}
                    </p>
                </div>

                <div class="profile__form-group relative">
                    <input
                        :disabled="!isEditing"
                        v-model="form.email"
                        type="email"
                        id="email"
                        class="profile__input peer"
                        required
                    />
                    <label for="email" class="profile__label">Email</label>
                    <p v-if="errors.email" class="profile__error">
                        {{ errors.email }}
                    </p>
                </div>

                <div class="profile__form-group relative">
                    <input
                        :disabled="!isEditing"
                        v-model="form.phone"
                        type="text"
                        id="phone"
                        class="profile__input peer"
                        required
                    />
                    <label for="phone" class="profile__label"
                        >Phone Number</label
                    >
                    <p v-if="errors.phone" class="profile__error">
                        {{ errors.phone }}
                    </p>
                </div>

                <button
                    v-if="!isEditing"
                    type="button"
                    @click="isEditing = true"
                    class="profile__submit"
                >
                    Edit
                </button>
                <button v-else type="submit" class="profile__submit">
                    SUBMIT
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as yup from "yup";

import avatarIco from "@/assets/icon/avatar.svg";
import editIco from "@/assets/icon/edit-line.svg";

// Form state
const form = ref({
    fullName: "",
    email: "",
    phone: "",
});

// Validation errors
const errors = ref({});
const profileImage = ref(avatarIco);
const isEditing = ref(false);

// Yup schema
const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    phone: yup
        .string()
        .matches(
            /^\d{3} - \d{3} - \d{4}$/,
            "Phone number must be in format 123 - 456 - 7890"
        )
        .required("Phone is required"),
});

// Load from localStorage
onMounted(() => {
    const getProfileImage = localStorage.getItem("profileImage");
    profileImage.value = getProfileImage !== "" ? getProfileImage : avatarIco;

    const storedData = JSON.parse(localStorage.getItem("profileData"));
    if (storedData) {
        form.value = storedData;
    }
});

const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) profileImage.value = URL.createObjectURL(file);
    localStorage.setItem("profileImage", profileImage.value);
};

// Submit handler
const handleSubmit = async () => {
    try {
        await schema.validate(form.value, { abortEarly: false });
        errors.value = {};
        localStorage.setItem("profileData", JSON.stringify(form.value));
        alert("Profile saved successfully!");
        isEditing.value = false;
    } catch (err) {
        const errorMessages = {};
        err.inner.forEach((e) => {
            errorMessages[e.path] = e.message;
        });
        errors.value = errorMessages;
    }
};

const goBack = () => {
    window.history.back();
};
</script>

<style scoped>
/* BEM Styling */

/* Container */
.profile__container {
    position: relative;
    background: white;
}

/* Floating Labels */
.profile__form-group {
    position: relative;
    margin-bottom: 1.5rem;
}

.profile__input {
    width: 100%;
    padding: 12px;
    border: 1px solid #f5f5f5;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    background: transparent;
    padding-top: 22px;
}

/* Disabled Input */
.profile__input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
}

.profile__label {
    position: absolute;
    top: 14px;
    left: 12px;
    color: #aaa;
    transition: all 0.3s ease;
    font-size: 16px;
}

.profile__input:focus ~ .profile__label,
.profile__input:not(:placeholder-shown) ~ .profile__label {
    top: 7px;
    left: 10px;
    font-size: 12px;
    color: #757575;
    background: transparent;
    padding: 0 5px;
}

/* Error Message */
.profile__error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

/* Submit Button */
.profile__submit {
    width: 100%;
    padding: 12px;
    background-color: #2e3a5a;
    color: white;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.3s;
}

.profile__submit:hover {
    background-color: #131c33;
}
</style>
