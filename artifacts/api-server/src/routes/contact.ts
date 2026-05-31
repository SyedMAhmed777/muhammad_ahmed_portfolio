import { Router } from "express";

const router = Router();

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  req.log.info({ name, email }, "Contact form submission received");

  return res.status(200).json({ success: true });
});

export default router;
