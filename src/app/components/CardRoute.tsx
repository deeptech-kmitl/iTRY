"use client";

import Image from 'next/image'
import { useState, useEffect } from 'react';

export default function CardRoutes() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedTitle, setSelectedTitle] = useState("")
    const [selectedDetail, setSelectedDetail] = useState("")
    const [selectedImage, setSelectedImage] = useState("")

    const openModal = (cardTitle: string, cardDetail: string, cardImage: string) => {
        setSelectedTitle(cardTitle)
        setSelectedDetail(cardDetail)
        setSelectedImage(cardImage)
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }
    const dummyRouteOption = [
        {
            optionTitle: 'แอร์พอร์ตลิ้งค์',
            detail: `Air link Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quo explicabo fugiat doloribus ipsam pariatur aliquid vel dolore aliquam 
                    praesentium autem quasi deleniti architecto modi incidunt voluptatum officia, 
                    minima voluptate blanditiis? link Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quo explicabo fugiat doloribus ipsam pariatur aliquid vel dolore aliquam`,
            image: '/station.png',
        },
        {
            optionTitle: 'รถโดยสารประจำทาง',
            detail: `Bus Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quo explicabo fugiat doloribus ipsam pariatur aliquid vel dolore aliquam 
                    praesentium autem quasi deleniti architecto modi incidunt voluptatum officia, 
                    minima voluptate blanditiis? link Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quo explicabo fugiat doloribus ipsam pariatur aliquid vel dolore aliquam`,
            image: '/bus.png',
        },
        {
            optionTitle: 'รถตู้',
            detail: `Van Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quo explicabo fugiat doloribus ipsam pariatur aliquid vel dolore aliquam 
                    praesentium autem quasi deleniti architecto modi incidunt voluptatum officia, 
                    minima voluptate blanditiis? link Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quo explicabo fugiat doloribus ipsam pariatur aliquid vel dolore aliquam`,
            image: '/van.png',
        },
        {
            optionTitle: 'รถไฟ',
            detail: `Train Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quo explicabo fugiat doloribus ipsam pariatur aliquid vel dolore aliquam 
                    praesentium autem quasi deleniti architecto modi incidunt voluptatum officia, 
                    minima voluptate blanditiis?`,
            image: '/train.png',
        }
    ]

    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 place-items-center gap-4'>
    {
        dummyRouteOption.map((route, key) => 
            <div 
                key={key} 
                className="card w-full md:w-44 bg-base-100 border-solid border-2 border-neonBlue pt-3 rounded-md 
                            transform transition-transform duration-300 hover:scale-110 hover:bg-stone-900" 
                onClick={() => openModal(route.optionTitle, route.detail, route.image)}>
                <div className="px-3">
                    <figure className="border-[1px] border-white py-8 rounded-3xl">
                        <Image src={route.image} alt={route.optionTitle} width="100" height="100"/>
                    </figure>
                </div>
                <div className="py-2">
                    <h5 className="card-title justify-center text-sm text-center">{route.optionTitle}</h5>
                </div>
            </div>
        )
    }
</div>


{isModalOpen && (
    <div className="modal-overlay fixed top-0 left-0 flex justify-center items-center w-full h-full z-10 bg-navyBlue/50 backdrop-blur-[5px]">
        <div className="modal-box border-2 border-neonBlue w-full max-w-lg">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                ✕
            </button>
            <div className='card'>
                <div className="p-2 flex flex-col md:flex-row h-full">
                    <figure className="border-[1px] border-white rounded-3xl w-full md:w-2/5">
                        <Image src={selectedImage} alt={selectedTitle} width="100" height="100"/>
                    </figure>
                    <div className='w-full md:w-3/5 pl-5'>
                        <div className="card-title">{selectedTitle}</div>
                        <div className='card-normal pt-3 h-full overflow-y-scroll scrollbar-hide' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>{selectedDetail}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

        </>
    )
}

