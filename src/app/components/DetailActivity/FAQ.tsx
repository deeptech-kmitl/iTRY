export default function FAQ() {
    const dummyFAQ = [
        {
            questions: 'IT Ladkrabang Open House 2023 คืออะไร?',
            answer: 'ค่ายที่จะทำให้น้อง ๆ ได้มารู้จักกับคณะไอทีลาดกระบัง เรียนรู้เนื้อหาพื้นฐานของไอที และที่สำคัญน้อง ๆ จะได้มาลองสัมผัสการใช้ชีวิตที่คณะ และมีกิจกรรมมากมายให้น้อง ๆ ได้เข้าร่วมแบบใกล้ชิดกับพี่ ๆ จากคณะไอทีลาดกระบัง'
        },
        {
            questions: 'IT Ladkrabang Open House 2023 จัดขึ้นที่ไหน?',
            answer: 'ค่าย ITCAMP ครั้งที่ 19 จัดขึ้นที่คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง'
        },
        {
            questions: 'IT Ladkrabang Open House 2023 ต้องค้างคืนมั้ย?',
            answer: 'ค่าย ITCAMP ครั้งที่ 19 เป็นค่ายค้างคืน 4 วัน 3 คืน ตั้งแต่วันที่ 1 - 4 มิถุนายน 2566'
        },
        {
            questions: 'IT Ladkrabang Open House 2023 เปิดรับสมัครเมื่อไหร่?',
            answer: 'ค่าย ITCAMP ครั้งที่ 19 จัดขึ้นที่คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง'
        },
        {
            questions: 'IT Ladkrabang Open House 2023 ต้องมีคุณสมบัติอะไร?',
            answer: 'ค่าย ITCAMP ครั้งที่ 19 เป็นค่ายค้างคืน 4 วัน 3 คืน ตั้งแต่วันที่ 1 - 4 มิถุนายน 2566'
        },
    ]
    return (
        <>
        {
            dummyFAQ.map((faq, key) => <div>
                <div className="collapse collapse-arrow bg-base-200 border rounded-md border-neonBlue">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        {faq.questions}
                    </div>
                    <div className="collapse-content">
                        <p>{faq.answer}</p>
                    </div>
                </div>
            </div> )}</>
    )
} 