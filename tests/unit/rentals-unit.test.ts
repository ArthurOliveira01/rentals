import { createRental } from "../../src/controllers/rentals-controller";
import { Request, Response } from "express";
import rentalsService from "../../src/services/rentals-service";

describe("Test", () => {
  describe("createRental", () => {
    it("should allow user to rent when choosing between 1 to 4 movies", async () => {
      const req = {
        body: {
          movies: [1, 2],
        },
      } as Request;
      const sendStatus = jest.fn();
      const res = {
        sendStatus,
      } as unknown as Response;
      (rentalsService.createRental as jest.Mock).mockResolvedValue(undefined);
      await createRental(req, res, jest.fn());
      expect(sendStatus).toHaveBeenCalledWith(201);
    });

    it("should prevent user from renting when choosing less than 1 movie", async () => {
      const req = {
        body: {
          movies: [],
        },
      } as Request;
      const sendStatus = jest.fn();
      const res = {
        sendStatus,
      } as unknown as Response;
      await createRental(req, res, jest.fn());
      expect(sendStatus).toHaveBeenCalledWith(400);
    });

    it("should prevent user from renting when choosing more than 4 movies", async () => {
      const req = {
        body: {
          movies: [1, 2, 3, 4, 5],
        },
      } as Request;
      const sendStatus = jest.fn();
      const res = {
        sendStatus,
      } as unknown as Response;
      await createRental(req, res, jest.fn());
      expect(sendStatus).toHaveBeenCalledWith(400);
    });
  });
});
