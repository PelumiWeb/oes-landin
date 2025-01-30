import { Button, ConfigProvider, Spin } from "antd";
import React, { MouseEvent, ReactNode, CSSProperties } from "react";
import { Loading3QuartersOutlined, SearchOutlined } from "@ant-design/icons";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { ExpandIconPosition } from "antd/es/collapse/Collapse";
import { OrbitProgress } from "react-loading-indicators";
import ScaleLoader from "react-spinners/ScaleLoader";

type Props = {
  title: string | undefined;
  loading?: boolean;
  IconLeft?: string;
  textColor?: string;
  backgrounColor?: string;
  borderColor?: string;
  width?: string;
  height?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  radius?: string;
  iconRight?: string;
  padding?: string;
  borderWidth?: string;
  textStyle?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

const CustomButton = ({
  title,
  loading,
  IconLeft,
  textColor = "text-white",
  backgrounColor = "bg-buttonPrimary",
  borderColor = "border-none",
  width = "w-[640px]",
  height = "h-full",
  onClick,
  radius = "rounded-[10px]",
  iconRight,
  padding = "p-4",
  borderWidth = "border",
  textStyle = `${textColor}`,
  disabled,
  type = "button",
}: Props) => {
  // bg-gradient-to-b from-[#FD32B2] to-[#F2D4E7]
  // bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${backgrounColor} 
         ${width} ${height} ${borderWidth} ${borderColor}  flex items-center justify-between ${padding} ${radius}   text-center text-white font-mono cursor-pointer 
           `}>
      {loading ? (
        <ScaleLoader cssOverride={override} color="white" />
      ) : (
        <>
          {IconLeft && <img src={IconLeft} className="mr-2" />}
          <p className={`${textStyle}`}>{title}</p>
          {iconRight && <img src={iconRight} className="ml-2" />}
        </>
      )}
    </button>
  );
};

export default CustomButton;
