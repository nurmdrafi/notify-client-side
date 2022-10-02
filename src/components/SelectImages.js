import React from "react";
import useNoteContext from "../context/NoteContext";
import Gallery from "./Gallery";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css";

const SelectImages = () => {
  const {
    newImages,
    setNewImages,
    newPreviewImages,
    setNewPreviewImages,
    uploadedPreviewImages,
    setUploadedPreviewImages,
  } = useNoteContext();
  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box h-[80%]">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle fixed right-2 top-2"
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
                <div className="w-full flex justify-center items-center h-[450px]">
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
              </TabPanel>

              {/* upload from gallery */}
              <TabPanel>
                <Gallery />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SelectImages;
