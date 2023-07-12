import React, {useState} from "react"
import {Editor, FloatingMenu} from "@tiptap/react"
import {Frame, ImagePlus, Plus, Youtube} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import HandleImage from "@/components/tiptap/HandleImage"
import HandleYoutube from "@/components/tiptap/HandleYoutube"
import HandleZappEmbed from "@/components/tiptap/HandleZappEmbed"

const FloatingButtonTipTap = ({editor}: { editor: Editor | null }) => {
  const [isModalImageOpen, setIsModalImageOpen] = useState(false)
  const [isModalYoutubeOpen, setIsModalYoutubeOpen] = useState(false)
  const [isModalZappOpen, setIsModalZappOpen] = useState(false)
  return (
    <>
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{duration: 100}}>
          <HandleImage
            editor={editor}
            isOpen={isModalImageOpen}
            setIsOpen={setIsModalImageOpen}
            isEdit={false}
          />
          <HandleYoutube
            editor={editor}
            isOpen={isModalYoutubeOpen}
            setIsOpen={setIsModalYoutubeOpen}
            isEdit={false}
          />
          <HandleZappEmbed
            editor={editor}
            isOpen={isModalZappOpen}
            setIsOpen={setIsModalZappOpen}
          />

          <Popover>
            <PopoverTrigger className={"relative"}>
              <Button
                variant="outline"
                className="absolute -left-14  -top-6 w-10 rounded-full p-0"
              >
                <Plus className="h-4 w-4"/>
                <span className="sr-only">Add</span>
              </Button>{" "}
            </PopoverTrigger>
            <PopoverContent
              className={"absolute -top-8 flex justify-around p-2"}
            >
              <Button
                variant="outline"
                className=" w-10 rounded-full p-0"
                onClick={() => {
                  setIsModalImageOpen(true)
                }}
              >
                <ImagePlus className="h-4 w-4"/>
                <span className="sr-only">Add</span>
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      className=" w-10 rounded-full p-0"
                      onClick={() => {
                        setIsModalYoutubeOpen(true)
                      }}
                    >
                      <Youtube className="h-4 w-4"/>
                      <span className="sr-only">Add youtube</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add youtube video</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={"ghost"}
                      className=" w-6 rounded-full p-0"
                      onClick={() => {
                        setIsModalZappOpen(true)
                      }}
                    >
                      <svg
                        data-hk="0-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 191.04 200"
                      >
                        <g>
                          <polygon
                            fill="#66C8F3"
                            points="153.3,0 77.04,0 0,133.33 76.26,133.33"
                          ></polygon>
                          <linearGradient
                            id="logo-grad1"
                            gradientUnits="userSpaceOnUse"
                            x1="57.3907"
                            y1="39.3963"
                            x2="57.3907"
                            y2="154.1778"
                          >
                            <stop offset="0" stop-color="#50B4E7"></stop>
                            <stop offset="0.9995" stop-color="#4CB4E7"></stop>
                          </linearGradient>
                          <polygon
                            fill="url(#logo-grad1)"
                            points="114.78,66.67 38.52,66.67 0,133.33 76.26,133.33"
                          ></polygon>
                          <polygon
                            fill="#085A9D"
                            points="191.04,66.67 114.78,66.67 37.74,200 114.01,200 "
                          ></polygon>
                          <linearGradient
                            id="logo-grad2"
                            gradientUnits="userSpaceOnUse"
                            x1="90.1002"
                            y1="100"
                            x2="134.7266"
                            y2="100"
                          >
                            <stop offset="0" stop-color="#174E95"></stop>
                            <stop
                              offset="1"
                              stop-color="#164E96"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                          <polygon
                            fill="url(#logo-grad2)"
                            points="152.66,66.67 114.78,66.67 76.26,133.33 152.66,66.67"
                          ></polygon>
                        </g>
                      </svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Add Zapp Embed for dart or flutter project
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </PopoverContent>
          </Popover>
        </FloatingMenu>
      )}
    </>
  )
}

export default FloatingButtonTipTap
