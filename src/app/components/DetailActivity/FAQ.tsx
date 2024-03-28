import { FAQActivity } from "@/app/utils/ManageActivityPage/activity"
import { Fragment } from "react"

interface FAQProps {
    faq: FAQActivity[]
}

export default function FAQ({ faq }: FAQProps) {
    return (
        <>
            {
                faq?.map((faq, index) =>
                (
                    <Fragment key={index}>
                        <div className="collapse collapse-arrow bg-base-200 border rounded-md border-neonBlue mb-5">
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title text-sm md:text-xl font-medium flex flex-col justify-center">
                                {faq.question}
                            </div>
                            <div className="collapse-content text-stone-400 text-sm md:text-xl">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    </Fragment>
                ))}</>
    )
} 