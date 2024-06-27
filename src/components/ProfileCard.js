import React from 'react';
import "../styles/profilecard.css";
import { useNavigate } from 'react-router-dom';

const ProfileCard = (props) => {
    const navigate = useNavigate();
    const profileUser = props.userId;

    const handleProfileVisit = () => {
        navigate(`/profile/${profileUser}`);
    };

    return (
        <div onClick={handleProfileVisit} className='pcard-container'>
            <div className='flex items-center justify-start gap-2'>
                <img className='w-[50px] h-[50px] rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                <p className='text-[#6636c2] font-semibold text-2xl'>{props.name}</p>
            </div>
            <div className='flex items-center justify-start'>
                <p className='font-semibold'>{props.email}</p>
            </div>
        </div>
    );
};

export default ProfileCard;
