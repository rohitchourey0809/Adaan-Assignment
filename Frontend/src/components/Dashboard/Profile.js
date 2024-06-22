import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { getProfile, updateProfile } from "../../api/userApi";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      try {
        const userData = await getProfile(userInfo.token);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const updatedUser = await updateProfile(user, userInfo.token);
      console.log("updatedUser", updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePhoto", file);
    setUploading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "https://backend-adaani-digital.vercel.app/api/users/upload",
        formData,
        config
      );

      console.log("Uploaded file:", data);
      setProfilePhoto(data);
      setUser({ ...user, profilePhoto: data });
      setUploading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <Box p={4}>
      <Stack spacing={4}>
        <Input
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          placeholder="Profile Photo"
          type="file"
          onChange={uploadFileHandler}
        />
        {uploading ? (
          <Text>Uploading...</Text>
        ) : (
          user.profilePhoto && (
            <Image
              src={`https://backend-adaani-digital.vercel.app${user.profilePhoto}`}
              alt="Profile Photo"
            />
          )
        )}
        <Textarea
          placeholder="Past Experience"
          value={user.pastExperience}
          onChange={(e) => setUser({ ...user, pastExperience: e.target.value })}
        />
        <Input
          placeholder="Skill Sets"
          value={user.skillSets}
          onChange={(e) =>
            setUser({ ...user, skillSets: e.target.value.split(", ") })
          }
        />
        <Textarea
          placeholder="Educational Qualification"
          value={user.educationalQualification}
          onChange={(e) =>
            setUser({ ...user, educationalQualification: e.target.value })
          }
        />
        <Button onClick={submitHandler}>Update Profile</Button>
      </Stack>
    </Box>
  );
};

export default Profile;
