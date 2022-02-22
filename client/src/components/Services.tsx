import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

interface ServiceProps {
  color: string;
  title: string;
  icon: any;
  subtitle: string;
  className: string;
}
const ServiceCard = ({
  color,
  title,
  subtitle,
  icon,
  className,
}: ServiceProps) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1 text-white">
      <h3 className="my-2 text-lg">{title}</h3>
      <p className="text-sm">{subtitle}</p>
    </div>
  </div>
);

export default function Services() {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-column items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services <br /> Continue to improve.
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952e3]"
          title="Security garanteed"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          className="text-white"
          subtitle="Security is guaranteed. We always maintain the quality of our product."
        />

        <ServiceCard
          color="bg-[#8984F8]"
          title="Best exchange rate"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          className="text-white"
          subtitle="Security is guaranteed. We always maintain the quality of our product."
        />

        <ServiceCard
          color="bg-[#F84550]"
          title="Security garanteed"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          className="text-white"
          subtitle="Security is guaranteed. We always maintain the quality of our product."
        />
      </div>
    </div>
  );
}
