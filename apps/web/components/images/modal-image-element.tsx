"use client"

import React, { Fragment, useRef, useState } from "react"
import Image from "next/image"
import { Dialog, Transition } from "@headlessui/react"

import { cloudinaryLoader } from "@/lib/utils"

import Cn from "./image-utils"

interface ModalImageElementProps {
  isOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  imageSrc: string
  hasBlurImage: boolean
  blurData?: string
}

export default function ModalImageElement({
  setIsModalOpen,
  isOpen,
  imageSrc,
  blurData,
  hasBlurImage,
}: ModalImageElementProps) {
  const [isLoading, setLoading] = useState(true)

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-fit max-w-[50vw] overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
                <Image
                  height={530}
                  width={1879}
                  priority={true}
                  placeholder={hasBlurImage ? "blur" : "empty"}
                  blurDataURL={blurData}
                  loader={cloudinaryLoader}
                  style={{
                    borderRadius: "10px",
                    transform: "translate3d(0, 0, 0)",
                  }}
                  src={imageSrc}
                  alt={"article image"}
                  className={Cn(
                    "duration-700 ease-in-out transition-all brightness-100 hover:brightness-90 cursor-pointer",
                    !hasBlurImage
                      ? isLoading
                        ? "grayscale blur-2xl scale-105"
                        : "grayscale-0 blur-0 scale-100"
                      : ""
                  )}
                  onClick={() => setIsModalOpen(true)}
                  onLoadingComplete={() => setLoading(false)}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
