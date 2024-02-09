'use client'
import { useState } from "react";
import ITryButton from "../Button";
import ITryDropDown from "../DropDown";
import ITryModal from "../Modal";
import useSignInController from "./useSignInController";
import ITryInput from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF } from "@fortawesome/free-brands-svg-icons/faFacebookF";
import useUserController from "./useUserController";
import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function ITryUserName() {

  const seachParams = useSearchParams();

  // Get search parameters from the URL
  const signInParam = seachParams.get("signIn") === "true";
  const callbackUrl = seachParams.get("callbackUrl") || undefined;

  const dropDownData = [
    {
      name: "กิจกรรมที่กำลังติดตาม",
      function: () => { }
    },
    {
      name: "ออกจากระบบ",
      function: () => { signOut() },
      customClassName: "text-red-500"
    }
  ]

  const [openSignInModal, setOpenSignInModal] = useState<boolean>(signInParam);
  const {
    errors,
    handleSubmit,
    handleFacebookLogin,
    handleGoogleLogin,
    onSubmit,
    register
  } = useSignInController({ callbackUrl });

  const { isLogin, userData } = useUserController();

  const alertHeader = signInParam && (
    <div className="alert alert-error">
      <span>คุณจำเป็นต้องเข้าสู่ระบบ</span>
    </div>
  )

  const contentModal = (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ITryInput register={register('email')} type="text" label="Email" showError={!!errors.email} errorMessage={errors.email?.message} />
        <ITryInput register={register('password')} type="password" label="Password" showError={!!errors.password} errorMessage={errors.password?.message} />
        <ITryButton type="submit" fullWidth customClassName="mt-4">SIGN IN</ITryButton>
      </form>

      <p className="text-center text-xs">Or Signn In With</p>
      <div className="flex gap-4 justify-center">
        <button className="btn btn-ghost btn-circle bg-gray-700 hover:bg-gray-600" onClick={handleGoogleLogin}>
          <div className="indicator">
            <FontAwesomeIcon icon={faGoogle} />
          </div>
        </button>
        <button className="btn btn-ghost btn-circle bg-blue-600 hover:bg-blue-700" onClick={handleFacebookLogin}>
          <div className="indicator">
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {isLogin ? (
        <ITryDropDown data={dropDownData} position="bottom-left" dropdownSize="small" customClassNameMain="bg-white hover:bg-white bg-opacity-20 hover:bg-opacity-30">
          <span className="md:block hidden">{userData.name}</span>
          <span className="md:hidden block">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </ITryDropDown>
      ) : (
        <ITryButton onClick={() => setOpenSignInModal(true)}>
          เข้าสู่ระบบ
        </ITryButton>
      )}
      <ITryModal isOpen={openSignInModal} onClose={() => setOpenSignInModal(false)} title="SIGN IN" content={contentModal} alertHeader={alertHeader} />
    </>
  )
}