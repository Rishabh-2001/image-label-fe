import React, { useEffect, useRef, useState } from 'react'
import {  Divider, Input,Image,  Tag } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
const PicturePreviewCard = ({image,selectedCategory,labels, setLabels}) => {

console.log("sss", image,selectedCategory,labels);

// const { token } = theme.useToken();
// const [tags, setTags] = useState(['Unremovable', 'Tag 2', 'Tag 3']);
const [inputVisible, setInputVisible] = useState(false);
const [inputValue, setInputValue] = useState('');

const [editInputValue, setEditInputValue] = useState('');
const inputRef = useRef(null);
const editInputRef = useRef(null);
useEffect(() => {
  if (inputVisible) {
    inputRef.current?.focus();
  }
}, [inputVisible]);
useEffect(() => {
  editInputRef.current?.focus();
}, [editInputValue]);

const showInput = () => {
  setInputVisible(true);
};
const handleInputChange = (e) => {
  setInputValue(e.target.value);
};
const handleInputConfirm = () => {
  if (inputValue && !labels.includes(inputValue)) {
    setLabels([...labels, inputValue]);
  }
  setInputVisible(false);
  setInputValue('');
};
const tagPlusStyle = {
    height: 22,
    background: "white",
    borderStyle: 'dashed',
  };
  const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
  };
  const handleRemoveTag = (e) => {
    const newLabel=labels.filter(l=> l!==e)
    console.log("GGFGF", newLabel);
    setLabels(newLabel)

  };
      
  return (
    <div className='w-full md:min-h-[450px] lg:min-h-[450px] max-h-[450px] '>
    <span className='bg-[#ba53f2] text-white rounded-t-md text-sm px-4 py-1 block w-full'>{selectedCategory}</span>
    <div className='flex flex-col mx-auto border shadow-md mb-4 bg-white justify-between'>
      <div className='h-300 overflow-hidden'>
        <Image
          width={"100%"}
          height={300}  // Set a fixed height for the image
          className='object-contain'
          src={image}
        />
      </div>
      <div className='w-full p-4'>
        {/* Your existing code for tags and input */}
        {labels?.length > 0 && labels?.map((l, idx) => (
        <Tag key={idx} closeIcon onClose={() => handleRemoveTag(l)} color='blue' className='m-1'>
          {l}
        </Tag>
      ))}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className='w-full mb-2'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag className='cursor-pointer mb-2' icon={<PlusOutlined />} onClick={showInput}>
          New Tag
        </Tag>
      )}

      </div>
    </div>
 
  
  </div>
  
  
  
  )
}

export default PicturePreviewCard