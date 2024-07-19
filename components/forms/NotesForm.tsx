"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { getAppointmentSchema } from "@/lib/validation";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Appointment } from "@/types/appwrite.types";

export const NotesForm = ({
  type,
  appointment,
  setOpen,
}: {
  type: "create" | "cancel" | "schedule" | "notes";
  appointment?: Appointment;
  setOpen: (value: boolean) => void;
}) => {
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment ? appointment.reason : "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex-1 space-y-6">
        {type === "notes" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
              disabled
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name} disabled>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            {/* Date picker */}
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy -  h:mm aa"
              disabled
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                disabled
                label="Reason for appointment"
                placeholder="Select a reason"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                disabled
                label="Additional Notes"
                placeholder="write any additional notes"
              />
            </div>
          </>
        )}
      </form>
      <Button
        onClick={() => setOpen(false)}
        className={`${
          type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
        } w-full`}
      >
        Close Notes
      </Button>
    </Form>
  );
};

export default NotesForm;
