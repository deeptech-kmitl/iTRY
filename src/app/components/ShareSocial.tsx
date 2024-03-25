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
import ITryDropDown from './DropDown';

interface ShareSocialProps {
    activityId: string;
    typeActivity: TypeActivity;
    activityName: string;
}

export default function ShareSocial(props: ShareSocialProps) {

    const getCustomDataDropDown = () => {
        return (
            <>
                <div className='flex gap-2 justify-center items-center'>
                    <FacebookShareButton url={`https://itryweb.com/${props.typeActivity}/activity-details/${props.activityId}`} >
                        <FacebookIcon size={36} round />
                    </FacebookShareButton>
                    <LineShareButton
                        url={`https://itryweb.com/${props.typeActivity}/activity-details/${props.activityId}`}
                        title={`กิจกรรมจากคณะ IT: ${props.activityName}`}
                    >
                        <LineIcon size={36} round />
                    </LineShareButton>
                    <TwitterShareButton url={`https://itryweb.com/${props.typeActivity}/activity-details/${props.activityId}`} >
                        <TwitterIcon size={36} round />
                    </TwitterShareButton>
                </div>
            </>
        )
    }

    return (

        <div className='relative w-8 aspect-square flex items-center justify-center'>
            <ITryDropDown customClassNameDropDownContent="overflow-x-hidden	flex-nowrap	max-h-80" customData={getCustomDataDropDown()} position="bottom-left" removeBg>
                <FontAwesomeIcon className="fa-thin h-8 text-lightBlue" icon={faShareFromSquare} />
            </ITryDropDown>
        </div>
    )
}