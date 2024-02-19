import CardSponsor from "../CardSponsor";

export default function SponsorContainer() {
  return (
    <div className="py-12 md:py-16">
          <div className="text-center pb-16">
            <h1 className="text-base md:text-2xl">ขอบคุณผู้สนับสนุน</h1>
          </div>
          <CardSponsor />
        </div>
  )
}