import React, { useEffect } from 'react';
import { Descriptions } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../redux/auth.slice';

const ProfilePage = () => {
   const dispatch=useDispatch()
   const {data}=useSelector(store=>(store?.user?.profileData));

   useEffect(()=>{
     dispatch(getProfile());
   }, [])

  return (
     <div>
        <Descriptions title="User Info">
  <Descriptions.Item label="Full Name">{data?.firstName} {data?.lastName}</Descriptions.Item>
  <Descriptions.Item label="email">{data?.email}</Descriptions.Item>
  <Descriptions.Item label="Address">
      "Rohini sec 15 New Delhi"
  </Descriptions.Item>
</Descriptions>
     </div>
  )
}
export default ProfilePage;