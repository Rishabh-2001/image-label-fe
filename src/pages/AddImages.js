import React, {useState} from 'react'
import PicturePreviewCard from '../components/admin/PicturePreviewCard'
import {
  Radio,
  Tabs,
  Upload,
  Spin,
  Space,
  Modal,
  Input,
  Image,
  Typography,
  Form,
  Select,
  Dragger,
  message,
  Button,
  Progress,
  Tag,
} from "antd";
import storage from "../firebase/firebase.config.mjs";
import { useDispatch } from "react-redux";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  PlusOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { addTagsPost } from '../redux/admin.images.slice';
// import { isNestedFrozen } from '@reduxjs/toolkit/dist/serializableStateInvariantMiddleware';

const { Option } = Select;
const { Title } = Typography;

const AddImages = () => {
    const [labels, setLabels] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [payload, setPayload] = useState();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [uploadDisabled, setUploadDisabled] = useState(false);
    const [selectedLabels, setSelectedLabels] = useState([]);
  
    const handleOk = async () => {
      setLoading(true);
      await dispatch(addTagsPost(payload))
        .then((ress) => {
          message.success("Added Image");
          setLabels([]);
          setSelectedCategory("");
          setImageUrl([]);
          form.resetFields();
        })
        .catch((err) => {
          console.log("RERE", err);
        });
      setLoading(false);
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const handleLabelChange = (e) => {
      const newLabels = e.target.value.split(",").map((label) => label.trim());
      setLabels(newLabels);
    };
  
    const handleCategoryChange = (value) => {
      setSelectedCategory(value);
    };
  
    const handleChange = (info) => {
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      }
    };
  
    const handleFirebaseUpload = async (options) => {
      // console.log("OP:", options, imageUrl);
      const { file } = options;
  
      try {
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // console.log("$%", percent);
          },
          (err) => {
            message.error("Error: ", err);
          },
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              setImageUrl((prevImages) => [...prevImages, downloadURL]);
  
              // Check if the maximum number of uploads (4) is reached
              if (imageUrl.length >= 4) {
                setUploadDisabled(true);
              }
  
              // Inform Ant Design's Upload component that the upload is complete
              options.onSuccess();
            });
          }
        );
      } catch (error) {
        console.error("Firebase upload error:", error);
        message.error("Firebase upload failed");
        // setLoading(false); // Make sure to handle errors appropriately
      }
    };
  
    const handleDelete = async (index) => {
      const ff = imageUrl.filter((url) => {
        const urlParts = url.split("/");
        const filename = decodeURIComponent(
          urlParts[urlParts.length - 1].split("?")[0]
        ).split("/")[1];
  
        // Return true only for matching case
        return filename === index.name;
      });
      try {
        // Get the reference to the storage object
        // Get the reference to the storage object
        const storageRef = ref(storage, `/files/${index.name}`);
  
        // Delete the object from storage
        await deleteObject(storageRef);
  
        // Remove the corresponding image from the state
        setImageUrl((prevImages) => prevImages.filter((_, idx) => _ !== ff[0]));
  
        // Enable the upload button after deletion
        setUploadDisabled(false);
  
        message.success("Image deleted successfully");
        console.log("MY IGS ARE", imageUrl);
      } catch (error) {
        console.error("Firebase delete error:", error);
        message.error("Image delete failed");
      }
    };
  
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const handleBeforeUpload = (file, fileList) => {
      // Check if the total number of uploaded pictures (including the current upload) is less than 4
      if (imageUrl.length + fileList.length <= 4) {
        // Allow the upload
        return true;
      } else {
        message.error("You can upload up to 4 pictures.");
        return false;
      }
    };
  
    const categories = [
      { id: 1, name: "study" },
      { id: 2, name: "Fashion" },
      { id: 3, name: "Technology" },
      { id: 4, name: "Health and Fitness" },
      { id: 5, name: "Food and Cooking" },
      { id: 6, name: "Travel" },
      { id: 7, name: "Home Decor" },
      { id: 8, name: "Sports" },
      { id: 9, name: "Business" },
      { id: 10, name: "Entertainment" },
      { id: 11, name: "Nature and Environment" },
      { id: 12, name: "Art and Design" },
      { id: 13, name: "Music" },
      { id: 14, name: "Pets" },
      { id: 15, name: "Science" },
    ];
  
    const handleLabelClose = (label) => {
      setSelectedLabels((prevLabels) =>
        prevLabels.filter((item) => item !== label)
      );
    };
  
    async function handleFinish() {
      const data = {
        images: imageUrl,
        labels: labels,
        category: selectedCategory,
      };
      setPayload(data);
  
      setIsModalOpen(true);
    }
    const images = [];
    const filterImages = () => {
      let filteredImages = images;
  
      if (selectedCategory) {
        filteredImages = filteredImages.filter(
          (image) => image.category === selectedCategory
        );
      }
  
      if (selectedLabels.length > 0) {
        filteredImages = filteredImages.filter((image) =>
          image.labels.some((label) => selectedLabels.includes(label))
        );
      }
  
      return filteredImages;
    };
  
  return (
    <div>
         <Spin spinning={loading}>
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
          <Form form={form}>
            <Form.Item name="images">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                maxCount={4}
                onChange={handleChange}
                customRequest={handleFirebaseUpload}
                disabled={uploadDisabled}
                onRemove={handleDelete}
                beforeUpload={handleBeforeUpload}
                multiple
              >
                {imageUrl?.length < 4 ? uploadButton : ""}
              </Upload>
            </Form.Item>
          </Form>

          <Input
            placeholder="Enter labels (comma-separated)"
            value={labels.join(", ")}
            onChange={handleLabelChange}
            style={{ margin: "10px 0" }}
          />

          <Select
            placeholder="Select category"
            onChange={handleCategoryChange}
            value={selectedCategory}
            style={{ width: "100%", margin: "10px 0" }}
          >
            {categories?.map((category, idx) => (
              <Option key={idx} value={category?.name}>
                {category?.name}
              </Option>
            ))}
          </Select>

          <div style={{ marginTop: "10px" }}>
            <Button className="bg-blue-600 text-white" onClick={handleFinish}>
              Upload & Categorize
            </Button>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p>Labels:</p>
            {labels.map((label) => (
              <Tag key={label}>{label}</Tag>
            ))}
          </div>
          <div className="mt-12 bg-white px-8 py-4">
            <h2>Preview: </h2>
            <div className="flex justify-between items-center gap-2 flex-wrap mt-6">
              {imageUrl?.length > 0 &&
                imageUrl?.map((image, idx) => (
                  <PicturePreviewCard
                    key={idx}
                    image={image}
                    labels={labels}
                    selectedCategory={selectedCategory}
                    setLabels={setLabels}
                  />
                ))}
            </div>
          </div>
        </div>
        <Modal
          title="Sure To Add Tags"
          open={isModalOpen}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              className="bg-blue-600 text-white"
              onClick={handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <p>Are You Sure to Complete this action? </p>
        </Modal>
      </Spin>
    </div>
  )
}

export default AddImages