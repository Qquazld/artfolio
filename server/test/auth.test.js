import { test, expect, vi } from "vitest";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

// Helper to simulate express /res/next requests
const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

test("rejects a request without a token", () => {
  const req = { header: () => null };
  const res = mockRes();
  const next = vi.fn();

  auth(req, res, next);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(next).not.toHaveBeenCalled();
});

test("accept a valid token", () => {
  const token = jwt.sign({ id: "123", role: "admin" }, "secret");
  const req = { header: () => `Bearer ${token}` };
  const res = mockRes();
  const next = vi.fn();

  process.env.JWT_SECRET = "secret";
  auth(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(req.user.role).toBe("admin");
});
