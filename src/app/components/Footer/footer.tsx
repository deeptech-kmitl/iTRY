import Image from "next/image";
export default function footer() {
    return (
        <>
            <footer className="footer p-10 bg-[#08152D] ">
                <div className="flex items-center">
                    <img src="/logoIT.png" alt="imagelogoIT" width="120" height="100" />
                    <nav>
                        <h6 className="footer-title">IT Ladkrabang</h6>
                        <a className="link link-hover">Information Technology <br></br></a>
                        <a className="link link-hover">King Mongkut's Institute of Technology Ladkrabang</a>
                    </nav>
                </div>
                
                <nav className="flex pt-6">
                    <nav className="mr-2"> 
                        <img width="20" height="20" className="mb-2" src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/phone.png" alt="phone" />
                        <img width="24" height="24" className="mb-2" src="https://img.icons8.com/sf-regular/48/FFFFFF/facebook.png" alt="facebook" />
                        <img width="16" height="16" className="mx-1" src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/FFFFFF/external-gmail-is-a-free-email-service-developed-by-google-logo-bold-tal-revivo.png" alt="external-gmail-is-a-free-email-service-developed-by-google-logo-bold-tal-revivo" />
                    </nav>
                    <nav>
                        <a className="link link-hover flex mb-2">02 723 4900</a>
                        <a className="link link-hover flex mb-2">School of Information Technology, KMITL</a>
                        <a className="link link-hover">undergrad@it.kmitl.ac.th</a>
                    </nav>
                </nav>

            </footer>
        </>
    )
}