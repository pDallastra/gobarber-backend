import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe("CreateAppointment", () => {
  it("Should be able to create a new appointment", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: "123123",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123123");
  });

  it("Should not be able to create two appointments on the same stop", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appoinmentDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appoinmentDate,
      provider_id: "123123",
    });

    expect(
      createAppointment.execute({
        date: appoinmentDate,
        provider_id: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
