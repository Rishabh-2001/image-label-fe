import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getAllImagesTagsCus } from "../../redux/customer.images.slice";
import { Link } from "react-router-dom";
import PictureCard from "../admin/PictureCard";
import PictureCardCustomer from "./PictureCardCustomer";

const { Option } = Select;
const { Title } = Typography;
const CustomerDashboard = () => {
  const [labels, setLabels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const dispatch=useDispatch();
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(9);
  const {data,error,isLoading}=useSelector(ss=>(ss?.customerImages?.imagesData))
  if(error)
  {
    message.error(error);
  }
  // console.log(">>>", data?.data?.count);
  useEffect(()=>{
  const response= dispatch(getAllImagesTagsCus({page,limit, selectedCategory, labels:selectedLabels}))
  }, [page,limit, selectedCategory,selectedLabels])




  const handleLabelChange = (e) => {
    const newLabels = e.target.value.split(",").map((label) => label.trim());
    setLabels(newLabels);
    
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const categories = [
    { id: 0, name: "All" },
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
  const productsData = [];
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && labels.length > 0) {
      // Handle backspace when search text is empty (clear the last label)
      const updatedLabels = [...labels];
      updatedLabels.pop(); // Remove the last label
      setLabels(updatedLabels);
      setSelectedLabels(updatedLabels)
    }
    if(e.key==="," && labels.length>0)
    {
      setSelectedLabels(labels);
    }
    
  };


  return (
    <div>
      <div className="">
        <Title level={3}>Your Gallery</Title>
        <Title level={5}>Explore Categories</Title>
      
            <div className="mb-4 flex justify-between ">
              <div className="flex gap-6">
                <Select
                  placeholder="Select Category"
                  onChange={handleCategoryChange}
                  style={{ width: 200, marginRight: 16 }}
                >
                  {categories.map((category) => (
                    <Option key={category.id} value={category.name==="All"? "": category?.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
                <div className="w-full max-w-[60%]">
                  <Input
                    placeholder="Search labels (comma-separated)"
                    value={labels.join(", ")}
                    onChange={handleLabelChange}
                    onKeyDown={handleKeyDown}

                  />
                  <div style={{ marginTop: "10px" }}>
                    <p>Labels:</p>
                    {labels.map((label) => (
                      <Tag key={label}>{label}</Tag>
                    ))}
                  </div>
                </div>
                <Button className="bg-blue-600 text-white">Search</Button>
              
              </div>
         
          
            </div>
         
                 
              <Spin spinning={isLoading}>
            <div className="flex gap-4 justify-between flex-wrap h-fit">
              {data && data?.data?.data?.length>0 ? data?.data?.data?.map((image, idx ) => 
              (
                
                  <div className="w-[30%] ">
                     <PictureCardCustomer key={image?.id} id={image?.id} image={image?.data?.images} labels={image?.data?.labels} selectedCategory={image?.data?.category} page={page} limit={limit}   />
                  </div>
              )) : <div className="text-center font-medium text-xl my-4">No Data To Show</div>}
            </div>
            </Spin>
     
      

     
      </div>
      <div className='flex gap-4 justify-end'>
      {page>1 &&   <Button onClick={()=>setPage(prev=>prev-1)}>
            Previous
        </Button>}
     {(page+1)*limit <= data?.data?.count &&    <Button className="bg-blue-500 text-white" onClick={()=>setPage(prev=>prev+1)}>
            Next
        </Button>}
    </div>

   
    </div>
  );
};

export default CustomerDashboard;


  // FILTER WITH TAGS
  // CHAGE SIDE NAV AND NAMES
  // OPTIMISE ADMIN CODE 

  // CUSTOMER LISTING 
  // FILTER 
  // ADDING TAGS 

  // OPTIMISE CARDS 
  // ALL CODE OPTMISE 


// label filters

// click on edit list

// add image tag--redirect
// add image left aside redirect

// customer
// -- show lists
// --edit lists



