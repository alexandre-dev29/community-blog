"use client"

import React, { useState } from "react"
import Image from "next/image"

import { cloudinaryLoader } from "@/lib/utils"

import Cn from "./image-utils"
import ModalImageElement from "./modal-image-element"

export default function BlurImage({
  src,
  ...props
}: {
  src: string
  props: any
}) {
  const [isLoading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ModalImageElement
        isOpen={isOpen}
        setIsModalOpen={setIsOpen}
        imageSrc={src}
        hasBlurImage={false}
      />
      <Image
        {...props}
        height={530}
        width={1879}
        priority={true}
        style={{ borderRadius: "10px", transform: "translate3d(0, 0, 0)" }}
        src={src}
        loader={cloudinaryLoader}
        alt={"article image"}
        className={Cn(
          "duration-700 ease-in-out transition-all brightness-100 hover:brightness-90 cursor-pointer",
          isLoading
            ? "grayscale blur-2xl scale-105"
            : "grayscale-0 blur-0 scale-100"
        )}
        onClick={() => {
          setIsOpen(true)
        }}
        onLoadingComplete={() => setLoading(false)}
      />
    </>
  )
}
