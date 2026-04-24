import { useForm } from "react-hook-form";
import { useState } from "react";
import { createUser } from "@/service/users";

type FormData = {
  nome: string;
  idade: number;
  cpf: string;
  rg?: string;
  email: string;
  senha: string;
};

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  return {
    register,
    handleSubmit,
    reset,
    errors,
  };
}