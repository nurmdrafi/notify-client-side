import React from "react";
import useNoteContext from "../context/NoteContext";
import Gallery from "./Gallery";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css";
import { AiOutlineClose } from "react-icons/ai";

const SelectImages = () => {
  const {
    setNewImages,
    newPreviewImages,
    setStatus,
  } = useNoteContext();
  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box overflow-hidden">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle fixed right-5 top-3"
          >
            ✕
          </label>
          {/* Tabs */}
          <Tabs className="mt-6">
            <TabList>
              <Tab className="w-[50%]" style={{ color: "black" }}>
                From Device
              </Tab>
              <Tab className="w-[50%]" style={{ color: "black" }}>
                From Gallery
              </Tab>
            </TabList>

            {/* TabPanels */}
            <TabPanels>
              {/* upload from device */}
              <TabPanel>
                <div className="w-full h-[450px]">
                  {newPreviewImages.length > 0 ? (
                    <>
                      {newPreviewImages.map((image, index) => {
                        return (
                          <div key={index} className="inline-block relative">
                            <img
                              src={image.url}
                              alt=""
                              className="w-16 h-16 object-cover border mt-2"
                            />
                            <AiOutlineClose
                              className="text-red-600 text-2xl cursor-pointer absolute top-0 right-0"
                              onClick={() =>
                                setNewImages((prev) =>
                                  prev.filter((img) => img.name !== image.name)
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="flex justify-center items-center h-[450px]">
                      <label
                        htmlFor="img"
                        className="custom-file-input"
                        onChange={(e) =>
                          setNewImages((prev) => [...prev, ...e.target.files])
                        }
                      >
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          multiple
                          placeholder="New Upload"
                          className="hidden"
                          id="img"
                        />
                      </label>
                    </div>
                  )}
                </div>
                <label
                  htmlFor="my-modal"
                  className="btn btn-sm fixed right-5 bottom-3"
                  onClick={() => setStatus(true)}
                >
                  Next
                </label>
              </TabPanel>

              {/* upload from gallery */}
              <TabPanel className="h-[450px] outline-none">
                <Gallery />
                <label
                  htmlFor="my-modal"
                  className="btn  btn-sm fixed right-5 bottom-3"
                  onClick={() => setStatus(true)}
                >
                  Next
                </label>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SelectImages;
