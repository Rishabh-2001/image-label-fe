import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  Spin,
  message,
  Divider,
  Button,
  Modal,
  Input,
  Image,
  Tag,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";


import { getAllImagesTagsCus,  } from "../../redux/customer.images.slice";
import { addTagsPost } from "../../redux/customer.images.slice";
// import {addTagsPostCust} from "../../redux/customer.images.slice"
import useUserDetails from "../../customHook/useUserDetails";
const PictureCardCustomer = ({ id, image, selectedCategory, labels, page, limit }) => {
//   console.log("sss", image, selectedCategory, labels);

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [myLabels, setMyLabels] = useState(labels || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mySelectedCategory, setMySelectedCAtegory] = useState(
    selectedCategory || []
  );
  const dispatch = useDispatch();

  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const { userType } = useUserDetails();

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const showInput = () => {
    if (userType === "ADMIN" || userType === "CUSTOMER") {
      setInputVisible(true);
    } else {
      message.error("Please Log in to add/delete Tags.");
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  async function editTagsBackend(tagsss) {
    const payload = {
      id: id,
      labels: tagsss,
      categories: mySelectedCategory,
      images: image,
      customerTags: userType === "CUSTOMER" ? tagsss : undefined,
    };
    setLoading(true);
  
      await dispatch(addTagsPost(payload))
        .then((ress) => {
        //   console.log(">>", ress);
          if (ress?.error) {
            console.log("REturning forom here", ress);
            message.error(ress?.payload);
            return;
          }
           dispatch(getAllImagesTagsCus({ page, limit }));
          message.success("Added Tag");
        })
        .catch((err) => {
          //  console.log("RERE", err);
          message.error(err);
        });
      setLoading(false);
    
  }


  const handleInputConfirm = async () => {
    if (inputValue && !myLabels.includes(inputValue)) {
      setMyLabels([...labels, inputValue]);
      editTagsBackend([...labels, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const tagPlusStyle = {
    height: 22,
    background: "white",
    borderStyle: "dashed",
  };
  const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };
  const handleRemoveTag = (e) => {
    const newLabel = myLabels.filter((l) => l !== e);
    setMyLabels(newLabel);
    editTagsBackend(newLabel);
  };

  async function handleDeleteImg() {
    setIsModalOpen(true);
  }

  return (
    <div className="my-4 w-fit  ">
    <Spin spinning={loading}>
      <span className="bg-[#ba53f2] text-white rounded-t-md text-sm px-4 py-1 block w-full">
        {selectedCategory}
      </span>
      <div className="flex flex-col mx-auto border shadow-md mb-4 bg-white  h-full">
        <Carousel
          arrows={true}
          dots
          slidesToShow={1}
          className="h-[350px]" // Set a fixed height for the Carousel
        >
          {image?.map((img, id) => (
            <div key={id} className="h-[350px] overflow-hidden">
              <Image
                width={400}
                height={300} // Set a fixed height for the image
                className="object-contain mx-auto h-full"
                src={img}
              />
            </div>
          ))}
        </Carousel>
  
        <div className="w-full p-4">
        {myLabels?.length > 0 &&
              myLabels?.map((l, idx) =>
                userType === "ADMIN" || userType === "CUSTOMER" ? (
                  <Tag
                    key={idx}
                    closeIcon
                    onClose={() => handleRemoveTag(l)}
                    color="blue"
                    className="m-1"
                  >
                    {l}
                  </Tag>
                ) : (
                  <Tag key={idx} color="blue" className="m-1">
                    {l}
                  </Tag>
                )
              )}
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                className="w-full mb-2"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : userType === "ADMIN" || userType === "CUSTOMER" ? (
              <Tag
                className="cursor-pointer mb-2"
                icon={<PlusOutlined />}
                onClick={showInput}
              >
                New Tag
              </Tag>
            ) : (
              <Tag className="cursor-pointer mb-2" icon={<PlusOutlined />}>
                New Tag
              </Tag>
            )}
        </div>
        
        {userType === "ADMIN" && (
          <div className="flex gap-2 px-2 py-4">
            {/* Your existing code for admin actions */}
            <Button
                className="flex flex-[1] items-center"
                icon={<EyeInvisibleOutlined />}
              >
                Disable
              </Button>
              <Button
                className="bg-red-500 text-white flex flex-[1] items-center "
                icon={<DeleteOutlined />}
                onClick={handleDeleteImg}
              >
                Delete
              </Button>
          </div>
        )}
      </div>
    </Spin>
  
  </div>
  
  );
};

export default PictureCardCustomer;
