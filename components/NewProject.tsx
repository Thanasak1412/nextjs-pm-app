"use client";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import Modal from "react-modal";

import { createNewProject } from "@/lib/api";

import Button from "./Button";
import Input from "./Input";

Modal.setAppElement("#modal");

export default function NewProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await createNewProject(name);

    closeModal();
    setName("");
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={openModal}>+ New Project</Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form className="flex items-center gap-3" onSubmit={handleSubmit}>
          <Input
            placeholder="project name"
            value={name}
            onChange={handleChange}
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
}
