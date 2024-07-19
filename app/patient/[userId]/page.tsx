import React from "react";
import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentsByUser } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable";
import { getPatient } from "@/lib/actions/patient.actions";
import { patientColumns } from "@/components/table/patientColumns";
import { Button } from "@/components/ui/button";
import ButtonCard from "@/components/ButtonCard";

const PatientAppointments = async ({
  params: { userId },
}: SearchParamProps) => {
  const appointmentsByUser = await getRecentAppointmentsByUser(userId);
  const user = await getPatient(userId);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={150}
            width={150}
            alt="logo"
            className="h-8 w=fit"
          />
        </Link>

        <p className="text-16-semibold">User Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome {user.name} 👋</h1>
          <p className="text-dark-700">
            start the day with managing your current appointments.
          </p>
        </section>

        <section className="admin-stat">
          <ButtonCard
            type="cancelled"
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
            link={"/"}
          />
          <ButtonCard
            type="cancelled"
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
            link={"/"}
          />
          <ButtonCard
            type="cancelled"
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
            link={"/"}
          />
          <ButtonCard
            type="cancelled"
            label="Cancelled Appointments"
            icon="/assets/icons/cancelled.svg"
            link={"/"}
          />

          <ButtonCard
            type="cancelled"
            label="Create New Appointment"
            icon="/assets/icons/appointments.svg"
            link={`/patients/${userId}/new-appointment`}
          />
        </section>
        <DataTable
          columns={patientColumns}
          data={appointmentsByUser.documents}
        />
      </main>
    </div>
  );
};

export default PatientAppointments;
