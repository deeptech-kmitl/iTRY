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

export default function ShareSocial() {

    const [isModalOpen, setModalOpen] = useState(false)
    const openModal = () => {
        setModalOpen(!isModalOpen)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className='relative w-[55%]'>
            <button className="relative btn btn-sm bg-transparent border-none p-0 w-10" onClick={openModal}>
                <FontAwesomeIcon className="fa-thin h-8 text-lightBlue" icon={faShareFromSquare} />
            </button>
            {isModalOpen && (
                <div className="modal-overlay w-[100%] h-[100%] z-10 relative top-10 right-44">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        ✕
                        </button>
                        <h3 className='text-base'>Share</h3>
                        <div className='flex gap-6 pr-12 pt-4 items-center'>
                            <FacebookShareButton url={'http://localhost:3000/staff/detail-activity'} > 
                                <FacebookIcon size={36} round /> 
                            </FacebookShareButton>
                            <LineShareButton url={'http://localhost:3000/staff/detail-activity'} > 
                                <LineIcon size={36} round /> 
                            </LineShareButton> 
                            <TwitterShareButton url={'http://localhost:3000/staff/detail-activity'} > 
                                <TwitterIcon size={36} round /> 
                            </TwitterShareButton>
                        </div>
                    </div>
                </div>
            )} 
        </div>
    )
}