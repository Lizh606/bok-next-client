// Simple in-memory state for content version
// This resets on server restart, which is fine since the client will just re-fetch the new "initial" version.

export const contentState = {
  version: Date.now(),
  update() {
    this.version = Date.now()
  }
}
