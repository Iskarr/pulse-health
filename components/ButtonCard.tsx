import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface ButtonCardProps {
  type: "appointments" | "pending" | "cancelled";
  label: string;
  icon: string;
  link: string;
}
const StatCard = ({ label, icon, type, link }: ButtonCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <Link href={link}>
        <div className="flex items-center gap-4">
          <Image src={icon} height={70} width={70} alt="icon" />
          <h4 className="text-32-bold text-white">{label}</h4>
        </div>
      </Link>
    </div>
  );
};

export default StatCard;
