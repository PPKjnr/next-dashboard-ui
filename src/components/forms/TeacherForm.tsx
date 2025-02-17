"use client";

import React from "react";
import { date, object, string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";

const schema = object({
  username: string()
    .min(3, {
      message: "Username must be at least 3 characters long!",
    })
    .max(20, {
      message: "Username must be at most 20 characters long!",
    }),
  email: string().email({ message: "Invalid email address" }),
  password: string().min(8, {
    message: "Password must be at least 8 characters long!",
  }),
  firstName: string().min(1, {
    message: "First name is required",
  }),
  lastName: string().min(1, {
    message: "Last name is required",
  }),
  phone: string().min(1, {
    message: "Phone is required",
  }),
  address: string().min(1, {
    message: "Address is required",
  }),
  birthday: date({
    message: "Birthday is required",
  }),
  sex: z.enum(["male", "female", "other"], { message: "Sex is required" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <form action="" className={"flex flex-col gap-8"} onSubmit={onSubmit}>
      <h1 className={"text-xl font-semibold"}> Authentication information</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <InputField
        label={"Username"}
        register={register}
        name={"username"}
        defaultValue={data?.username}
        error={errors?.username}
      />
      <InputField
        label={"Email"}
        type={"email"}
        register={register}
        name={"email"}
        defaultValue={data?.email}
        error={errors?.email}
      />
      <InputField
        label={"Password"}
        type={"password"}
        register={register}
        name={"password"}
        defaultValue={data?.password}
        error={errors?.password}
      />
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <button className={"bg-blue-400 text-white p-2 rounded-md"}>
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
