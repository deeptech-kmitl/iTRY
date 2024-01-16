"use client"


export default function MyCarousel() {

  const items = [
    {
      name: "Name #1",
      description: "Probably the most random thing you have ever seen!"
    },
    {
      name: "Name #2",
      description: "Hello World!"
    }
  ]

  return (
    <>

    </>
  )
}

function Item({ name, description }: { name: string, description: string }) {
  return (
    <div className="text-center">
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  )
}