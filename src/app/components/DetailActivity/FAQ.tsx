import { FAQActivity } from "@/app/utils/ManageActivityPage/activity"

interface FAQProps {
    faq: FAQActivity[]
}

export default function FAQ({ faq }: FAQProps) {
    return (
        <>
            {
                faq.map((faq, key) => <div>
                    <div className="collapse collapse-arrow bg-base-200 border rounded-md border-neonBlue">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-sm md:text-xl font-medium">
                            {faq.question}
                        </div>
                        <div className="collapse-content text-stone-400 text-sm md:text-xl">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                </div>)}</>
    )
} 