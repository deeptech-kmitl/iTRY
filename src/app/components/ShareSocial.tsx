"use client"

import { 
    FacebookShareButton, 
    FacebookIcon, 
    TwitterShareButton,
    TwitterIcon, 
    LineShareButton,
    LineIcon,
} from 'next-share';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { TypeActivity } from './ManageActivityPage/activity';

interface ShareSocialProps {
    activityId: string;
    typeActivity: TypeActivity;
    activityName: string;
}

export default function ShareSocial(props: ShareSocialProps) {

    const [isModalOpen, setModalOpen] = useState(false)
    const openModal = () => {
        setModalOpen(!isModalOpen)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className='relative w-[180%]'>
            <button className="relative btn btn-sm bg-transparent border-none p-0 w-10" onClick={openModal}>
                <FontAwesomeIcon className="fa-thin h-8 text-lightBlue" icon={faShareFromSquare} />
            </button>
            {isModalOpen && (
                <div className="modal-overlay w-[180%] h-[100%] z-10 absolute top-15 right-[120px]">
                    <div className="modal-box w-[180%]">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        ✕
                        </button>
                        <h3 className='text-base'>Share</h3>
                        <div className='flex gap-6 pr-12 pt-4 items-center'>
                            <FacebookShareButton url={`http://52.87.75.229:3000/${props.typeActivity}/activity-details/${props.activityId}`} > 
                                <FacebookIcon size={36} round /> 
                            </FacebookShareButton>
                            <LineShareButton
                                url={`http://52.87.75.229:3000/${props.typeActivity}/activity-details/${props.activityId}`} 
                                title={`กิจกรรมจากคณะ IT: ${props.activityName}`}
                            > 
                                <LineIcon size={36} round />
                            </LineShareButton> 
                            <TwitterShareButton url={`http://52.87.75.229:3000/${props.typeActivity}/activity-details/${props.activityId}`} > 
                                <TwitterIcon size={36} round /> 
                            </TwitterShareButton>
                        </div>
                    </div>
                </div>
            )} 
        </div>
    )
}