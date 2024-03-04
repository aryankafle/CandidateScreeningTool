export const CLIENT_HOST = process.env.CLIENT_HOST || "http://localhost"
export const CLIENT_PORT = process.env.CLIENT_PORT || "3000"

export const SERVER_HOST = process.env.SERVER_HOST || "http://localhost"
export const SERVER_PORT = process.env.SERVER_PORT || 3001

export const SERVER_IP = `${SERVER_HOST}:${SERVER_PORT}`
export const CLIENT_IP = `${CLIENT_HOST}:${CLIENT_PORT}`