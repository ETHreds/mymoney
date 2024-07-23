import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import bcrypt from 'bcrypt'

// export const generateToken = () => {

// }


export const bcryptCompare = promisify(bcrypt.compare);