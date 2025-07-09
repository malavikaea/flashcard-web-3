const admin = require("../firebaseAdmin");

module.exports = async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // ✅ This includes `uid`, `email`, etc.
    console.log("Decoded token:", decodedToken); // ✅ Safe log
    next(); 
  } catch (err) {
    console.error("Token verification failed:", err.message); // ✅ Log only the error
    return res.status(401).send("Unauthorized");
  }
};
