"use client";
import { useState } from "react";
import ITryButton from "../Button";
import ITryDropDown from "../DropDown";
import ITryModal from "../Modal";
import useSignInController from "./useSignInController";
import useRegisterController from "./useRegisterController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons/faFacebookF";
import Image from "next/image";
import useUserController from "./useUserController";
import { signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ITryInput from "@/app/components/Input";
import { updateReceiveEmail } from "@/app/api/receiveEmail/route";

export default function ITryUserName() {
  const seachParams = useSearchParams();
  const router = useRouter();

  // Get search parameters from the URL
  const signInParam = seachParams.get("signIn") === "true";
  const errorParam = seachParams.get("error");
  const callbackUrl = seachParams.get("callbackUrl") || undefined;

  const [openSignInModal, setOpenSignInModal] = useState<boolean>(signInParam);
  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);


  const signInSuccess = () => {
    setOpenRegisterModal(false);
    setOpenSignInModal(false);
  }

  const {
    errors,
    handleSubmit,
    handleFacebookLogin,
    handleGoogleLogin,
    onSubmit,
    register,
  } = useSignInController({ callbackUrl, signInSuccess });

  const registerSuccess = () => {
    setOpenRegisterModal(false);
    setOpenSignInModal(true);
  }

  const {
    errors: errorsRegister,
    handleSubmit: handleSubmitRegister,
    onSubmit: onSubmitRegister,
    register: registerRegister,
  } = useRegisterController({registerSuccess});

  const { isLogin, userData, session, update } = useUserController();

  const toggleReceiveEmail = async () => {
    await updateReceiveEmail(
      userData.id,
      userData.email,
      !userData.receiveEmail
    );

    await update({
      ...session,
      user: {
        ...userData,
        receiveEmail: !userData.receiveEmail,
      },
    });
  };

  const getAlertHeader = () => {
    if (errorParam && signInParam) {
      return (
        <div className="alert alert-error">
          <span>มีข้อผิดพลาดเกิดขึ้น กรุณาเข้าสู่ระบบอีกครั้ง</span>
        </div>
      );
    } else if (!errorParam && signInParam) {
      return (
        <div className="alert alert-error">
          <span>คุณจำเป็นต้องเข้าสู่ระบบ</span>
        </div>
      );
    }
  };

  const dropDownData = [
    {
      name: (
        <ITryInput
          type="checkbox"
          label="รับการแจ้งเตือน"
          checkFunction={toggleReceiveEmail}
          checked={userData.receiveEmail}
        />
      ),
      function: () => {},
    },
    {
      name: "กิจกรรมที่กำลังติดตาม",
      function: () => {
        router.push("/myActivities");
      },
    },
    {
      name: "ออกจากระบบ",
      function: () => {
        signOut();
      },
      customClassName: "text-red-500",
    },
  ];

  const contentRegisterModal = (
    (
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
          <ITryInput
            register={registerRegister("username")}
            type="text"
            label="Username"
            showError={!!errorsRegister.username}
            errorMessage={errorsRegister.username?.message}
          />
          <ITryInput
            register={registerRegister("email")}
            type="text"
            label="Email"
            showError={!!errorsRegister.email}
            errorMessage={errorsRegister.email?.message}
          />
          <ITryInput
            register={registerRegister("password")}
            type="password"
            label="Password"
            showError={!!errorsRegister.password}
            errorMessage={errorsRegister.password?.message}
          />
          <ITryInput
            register={registerRegister("confirmPassword")}
            type="password"
            label="Confirm Password"
            showError={!!errorsRegister.confirmPassword}
            errorMessage={errorsRegister.confirmPassword?.message}
          />
          <ITryButton type="submit" fullWidth customClassName="mt-4">
            REGISTER
          </ITryButton>
        </form>

        <p className="text-center text-xs">Or Sign Up With</p>
        <div className="flex gap-4 justify-center">
          <button
            className="btn btn-ghost btn-circle bg-gray-600 hover:bg-gray-600"
            onClick={handleGoogleLogin}
          >
            <div className="indicator">
              <FontAwesomeIcon icon={faGoogle} />
            </div>
          </button>
        </div>
      </div>
    )
  )

  const contentSignInModal = (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ITryInput
          register={register("email")}
          type="text"
          label="Email"
          showError={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <ITryInput
          register={register("password")}
          type="password"
          label="Password"
          showError={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <ITryButton type="submit" fullWidth customClassName="mt-4">
          SIGN IN
        </ITryButton>
      </form>

      <p className="text-center text-xs">Or Sign In With</p>
      <div className="flex gap-4 justify-center">
        <button
          className="btn btn-ghost btn-circle bg-gray-600 hover:bg-gray-600"
          onClick={handleGoogleLogin}
        >
          <div className="indicator">
            <FontAwesomeIcon icon={faGoogle} />
            {/* <Image
priority
              src="/public/icons8-google-96.png"
              alt="Picture of the author"
              width={50}
              height={50}
            /> */}
          </div>
        </button>
        {/* <button
          className="btn btn-ghost btn-circle bg-blue-600 hover:bg-blue-700"
          onClick={handleFacebookLogin}
        >
          <div className="indicator">
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
        </button> */}
      </div>
      <p className="flex self-center">No Account ? Sign Up <span className="underline text-blue-500 cursor-pointer ml-2" onClick={() => {
        setOpenRegisterModal(true)
        setOpenSignInModal(false)
      }}>here</span></p>
    </div>
  )

  return (
    <>
      {isLogin ? (
        <ITryDropDown
          data={dropDownData}
          position="bottom-left"
          dropdownSize="small"
          customClassNameMain="bg-transparent md:bg-white md:hover:bg-white bg-opacity-100 md:bg-opacity-20 md:hover:bg-opacity-30 md:p-4 md:border border-none md:pl-4 md:pr-4 pl-2 pr-2"
        >
          <span className="md:block hidden">{userData.name}</span>
          <span className="md:hidden block">
            <FontAwesomeIcon className="h-4 md:h-6" icon={faUser} />
          </span>
        </ITryDropDown>
      ) : (
        <ITryButton
          customClassName="rounded-full w-12 h-2 px-8 md:px-12"
          onClick={() => setOpenSignInModal(true)}
        >
          Login
        </ITryButton>
      )}
      <ITryModal
        isOpen={openSignInModal}
        onClose={() => setOpenSignInModal(false)}
        title="SIGN IN"
        content={contentSignInModal}
        alertHeader={getAlertHeader()}
      />
      <ITryModal
        isOpen={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        title="SIGN UP"
        content={contentRegisterModal}
      />
    </>
  );
}
