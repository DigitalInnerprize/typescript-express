'use strict';

import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const SALT_ROUNDS_EXPONENT = 10,
  ALGORITHM = `aes-256-ctr`;

/**
 * Encrypt a string
 * @param {string} text
 * @param {string} secret
 * @returns {string}
 */
const encrypt = (text: string, secret: string) => {
  const iv = crypto.randomBytes(16).toString(`hex`).slice(0, 16);
  const key = crypto.createHash(`sha256`).update(String(secret)).digest();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = cipher.update(text, `utf8`, `hex`) + cipher.final(`hex`);

  return iv + encrypted;
};

/**
 * Decrypt an encrypted string
 * @param text
 * @param secret
 * @returns {string}
 */
const decrypt = (text: string, secret: string) => {
  const iv = text.slice(0, 16);
  const key = crypto.createHash(`sha256`).update(String(secret)).digest();
  const encrypted = text.slice(16);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

  return decipher.update(encrypted, `hex`, `utf8`) + decipher.final(`utf8`);
};

/**
 * Create a hash from a provided plaintext password.
 * @param plaintextPassword
 * @param saltRoundsExponent The higher, the more secure and slower.
 * @returns {string}
 */
const makePasswordHash = (plaintextPassword: string, saltRoundsExponent = SALT_ROUNDS_EXPONENT): string => {
  const salt = bcrypt.genSaltSync(saltRoundsExponent || SALT_ROUNDS_EXPONENT);
  return bcrypt.hashSync(plaintextPassword, salt);
};

/**
 * Returns true if a provided password matches the provided hash.
 * @returns {boolean}
 */
const passwordMatchesHash = bcrypt.compareSync;

// Run commands in a Node Terminal

export { makePasswordHash, passwordMatchesHash, encrypt, decrypt };
