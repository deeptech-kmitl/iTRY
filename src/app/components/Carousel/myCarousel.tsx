"use client"

import Carousel from "react-material-ui-carousel";

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
      <Carousel className="border">
        {
          items.map((item, i) => <Item key={i} name={item.name} description={item.description} />)
        }
      </Carousel>
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