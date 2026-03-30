function generateMeetingLink(appointmentId, doctorId, patientId) {
  // Combine IDs + timestamp for a collision-proof room name
  const uid = `${appointmentId}-${doctorId}-${patientId}-${Date.now().toString(36)}`;

  // Jitsi room names must be URL-safe — no spaces, slashes, or special chars
  const roomName = `CURELEX-${uid}`;

  // Standard Jitsi Meet public server — free, no account
  return `https://meet.jit.si/${roomName}`;
}

module.exports = { generateMeetingLink };